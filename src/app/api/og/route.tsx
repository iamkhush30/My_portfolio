import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const title = searchParams.get('title') || 'Khush Makwana';
    const subtitle =
      searchParams.get('subtitle') || 'Cloud & DevOps Engineer · UI/UX Designer';
    const category = searchParams.get('category') || 'Portfolio';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            backgroundColor: '#080B14',
            backgroundImage:
              'radial-gradient(circle at 90% 10%, rgba(37, 99, 235, 0.35) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(37, 99, 235, 0.25) 0%, transparent 50%)',
            padding: '80px 90px',
            fontFamily: 'sans-serif',
            color: '#F8FAFC',
            position: 'relative',
          }}
        >
          {/* Top Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563EB, #1D4ED8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '20px',
                  color: '#FFFFFF',
                  letterSpacing: '1px',
                }}
              >
                KM
              </div>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.8)',
                }}
              >
                Khush Makwana
              </span>
            </div>

            <div
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                border: '1px solid rgba(37, 99, 235, 0.5)',
                background: 'rgba(37, 99, 235, 0.15)',
                fontSize: '15px',
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                color: '#60A5FA',
                fontWeight: 600,
              }}
            >
              {category}
            </div>
          </div>

          {/* Main Title Block */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              maxWidth: '980px',
            }}
          >
            <div
              style={{
                fontSize: title.length > 35 ? '52px' : '64px',
                fontWeight: 800,
                lineHeight: 1.15,
                color: '#FFFFFF',
                letterSpacing: '-1px',
              }}
            >
              {title}
            </div>
            <div
              style={{
                fontSize: '24px',
                lineHeight: 1.4,
                color: 'rgba(203, 213, 225, 0.85)',
              }}
            >
              {subtitle}
            </div>
          </div>

          {/* Bottom Footer Info */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              paddingTop: '24px',
            }}
          >
            <span
              style={{
                fontSize: '17px',
                color: 'rgba(148, 163, 184, 0.9)',
                letterSpacing: '1px',
              }}
            >
              Cloud & DevOps Architecture · UI/UX Design System
            </span>
            <span
              style={{
                fontSize: '17px',
                color: '#3B82F6',
                fontWeight: 600,
                letterSpacing: '1px',
              }}
            >
              khushmakwana.com
            </span>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e: any) {
    return new Response(`Failed to generate image: ${e.message}`, { status: 500 });
  }
}
