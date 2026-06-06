import { ImageResponse } from 'next/og';

// Route segment config
export const runtime = 'edge';

// Image metadata
export const size = {
  width: 512,
  height: 512,
};
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #050505 0%, #111111 100%)',
          borderRadius: '25%', // Slight squircle shape if possible
        }}
      >
        {/* Outer Glowing Hexagon */}
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '320px',
            height: '320px',
            border: '8px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '50%',
            boxShadow: '0 0 80px rgba(255, 255, 255, 0.1)',
          }}
        >
          {/* Inner metallic structure */}
          <div
            style={{
              position: 'absolute',
              width: '240px',
              height: '240px',
              border: '6px solid #FFFFFF',
              borderRadius: '20%', // slightly rounded square inside circle
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: '120px',
                height: '120px',
                border: '6px solid rgba(255, 255, 255, 0.5)',
                borderRadius: '50%',
                transform: 'rotate(-45deg)',
              }}
            />
          </div>

          {/* Central Core */}
          <div
            style={{
              position: 'absolute',
              width: '40px',
              height: '40px',
              backgroundColor: '#FFFFFF',
              borderRadius: '50%',
              boxShadow: '0 0 40px 10px rgba(255, 255, 255, 0.8)',
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
