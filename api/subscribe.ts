export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, lastName } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const privateKey = process.env.KLAVIYO_PRIVATE_KEY;
  const listId = process.env.KLAVIYO_LIST_ID;

  if (!privateKey || !listId) {
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const headers = {
    Authorization: `Klaviyo-API-Key ${privateKey}`,
    revision: '2024-02-15',
    'Content-Type': 'application/json',
  };

  // Step 1: Subscribe the email
  const klaviyoRes = await fetch('https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      data: {
        type: 'profile-subscription-bulk-create-job',
        attributes: {
          profiles: {
            data: [{
              type: 'profile',
              attributes: {
                email,
                subscriptions: {
                  email: { marketing: { consent: 'SUBSCRIBED' } }
                }
              }
            }]
          }
        },
        relationships: {
          list: { data: { type: 'list', id: listId } }
        }
      }
    })
  });

  if (klaviyoRes.status !== 202) {
    const errorText = await klaviyoRes.text();
    console.error('Klaviyo subscribe error:', klaviyoRes.status, errorText);
    return res.status(500).json({ error: 'Failed to subscribe', detail: errorText, status: klaviyoRes.status });
  }

  // Step 2: Update profile with name fields if provided
  if (firstName || lastName) {
    const profileAttrs: Record<string, string> = { email };
    if (firstName) profileAttrs.first_name = firstName;
    if (lastName) profileAttrs.last_name = lastName;

    const upsertRes = await fetch('https://a.klaviyo.com/api/profile-import/', {
      method: 'POST',
      headers,
      body: JSON.stringify({
        data: {
          type: 'profile',
          attributes: profileAttrs
        }
      })
    });

    if (!upsertRes.ok) {
      // Non-fatal: subscription succeeded, just log the name update failure
      const errText = await upsertRes.text();
      console.error('Klaviyo profile update error:', upsertRes.status, errText);
    }
  }

  return res.status(200).json({ success: true });
}
