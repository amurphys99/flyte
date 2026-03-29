import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#050505',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Bottom green glow */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '55%',
            background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(22,48,32,0.5) 0%, transparent 70%)',
          }}
        />

        {/* Top dark vignette */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '45%',
            background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(12,18,38,0.4) 0%, transparent 70%)',
          }}
        />

        {/* Wordmark */}
        <div
          style={{
            fontSize: '128px',
            fontWeight: 200,
            letterSpacing: '0.35em',
            color: 'white',
            textTransform: 'uppercase',
            marginBottom: '28px',
            position: 'relative',
            paddingRight: '0.35em', // compensate letter-spacing on last char
          }}
        >
          FLYTE
        </div>

        {/* Divider */}
        <div
          style={{
            width: '80px',
            height: '1px',
            background: 'rgba(255,255,255,0.2)',
            marginBottom: '36px',
            position: 'relative',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: '30px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
            marginBottom: '20px',
            position: 'relative',
          }}
        >
          Cork's Only 5-Bay TrackMan Facility
        </div>

        {/* Location pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px 28px',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '999px',
            fontSize: '15px',
            fontWeight: 300,
            color: 'rgba(255,255,255,0.45)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            position: 'relative',
          }}
        >
          Cork City, Ireland
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
