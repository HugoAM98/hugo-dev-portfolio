import { ImageResponse } from 'next/og'

export const alt = 'Hugo - Full Stack Developer'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(135deg, #080810 0%, #1a0a2e 50%, #16213e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          position: 'relative',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              fontSize: 72,
              background: 'linear-gradient(135deg, #06b6d4 0%, #a855f7 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 'bold',
            }}
          >
            Hugo
          </div>
          <div
            style={{
              fontSize: 48,
              color: '#e2e8f0',
            }}
          >
            Full Stack Developer
          </div>
          <div
            style={{
              fontSize: 32,
              color: '#94a3b8',
              marginTop: '20px',
            }}
          >
            Laravel • Vue.js • TypeScript
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

