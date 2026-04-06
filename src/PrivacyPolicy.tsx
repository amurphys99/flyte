/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-[#050505] text-white/80 px-6 py-16">
      <div className="max-w-2xl mx-auto">
        <a
          href="/"
          className="text-white/30 text-sm tracking-widest uppercase font-light hover:text-white/60 transition-colors"
        >
          ← Flyte Golf
        </a>

        <h1 className="mt-10 text-3xl font-light tracking-wide text-white">Privacy Policy</h1>
        <p className="mt-2 text-white/40 text-sm">Effective date: April 2026</p>

        <hr className="my-8 border-white/[0.08]" />

        <section className="space-y-10 text-sm leading-relaxed font-light">

          <div>
            <h2 className="text-white text-base font-normal mb-3">1. Who We Are</h2>
            <p>
              Flyte Golf is the data controller responsible for your personal data. We operate a premium
              indoor golf simulator facility in Cork City, Ireland.
            </p>
            <p className="mt-3">
              <span className="text-white/50">Email:</span>{' '}
              <a href="mailto:info@flytegolf.ie" className="text-white/60 hover:text-white/80 transition-colors">
                info@flytegolf.ie
              </a>
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">2. Information We Collect</h2>
            <p>We may collect the following personal data:</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-white/70">
              <li>Full name, email address, and phone number</li>
              <li>Payment details (processed securely by third-party providers)</li>
              <li>IP address and browsing behaviour via cookies and analytics tools</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">3. How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-white/70">
              <li>Manage bookings and customer accounts</li>
              <li>Provide customer support</li>
              <li>Send marketing communications (with your consent)</li>
              <li>Analyse website usage and improve our services</li>
              <li>Comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">4. Data Retention</h2>
            <ul className="space-y-1.5 list-disc list-inside text-white/70">
              <li>Transaction records: 7 years (legal requirement)</li>
              <li>Marketing preferences: until you withdraw consent</li>
              <li>Analytics data: 26 months</li>
            </ul>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your personal data. We may share it with third-party processors such as
              payment providers, email platforms, and hosting services. All processors are contractually
              bound to GDPR-compliant data handling.
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">6. Your Rights</h2>
            <p>Under GDPR, you have the right to:</p>
            <ul className="mt-3 space-y-1.5 list-disc list-inside text-white/70">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your data</li>
              <li>Port your data to another provider</li>
              <li>Withdraw consent at any time</li>
              <li>Object to certain types of processing</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{' '}
              <a href="mailto:info@flytegolf.ie" className="text-white/60 hover:text-white/80 transition-colors">
                info@flytegolf.ie
              </a>.
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">7. Security</h2>
            <p>
              Our website uses HTTPS encryption. We implement appropriate access controls to protect
              your personal data from unauthorised access, disclosure, or loss.
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">8. Cookies</h2>
            <p>
              We use cookies to support website functionality and analytics. You can control cookie
              preferences through your browser settings.
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">9. Children</h2>
            <p>
              Our services are not directed at children under the age of 16. We do not knowingly
              collect personal data from children.
            </p>
          </div>

          <div>
            <h2 className="text-white text-base font-normal mb-3">10. Complaints</h2>
            <p>
              If you have a concern about how we handle your data, you can contact the Irish Data
              Protection Commission at{' '}
              <a
                href="https://www.dataprotection.ie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-white/80 transition-colors"
              >
                www.dataprotection.ie
              </a>.
            </p>
          </div>

        </section>

        <hr className="my-10 border-white/[0.08]" />
        <p className="text-white/20 text-xs tracking-[0.2em] uppercase font-light">© Flyte Golf</p>
      </div>
    </div>
  );
}
