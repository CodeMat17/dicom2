import { ImageResponse } from "next/og";

// The preview card WhatsApp, X and other apps show when the vote link is
// shared. Generated once at build time.
//
// Satori can't read the site's CSS variables, so the dark-theme tokens from
// globals.css are spelled out here: ink-900, ink-700, brand, azure and gold.
const ink900 = "hsl(217, 68%, 6%)";
const ink700 = "hsl(218, 59%, 14%)";
const brand = "hsl(224, 56%, 30%)";
const azure = "hsl(199, 80%, 47%)";
const gold = "hsl(48, 96%, 53%)";

export const alt =
  "Frank Mbanefo Design Competition: Public Choice Vote — view all 10 designs and vote for your favourite";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          color: "white",
          backgroundColor: ink900,
          backgroundImage: `radial-gradient(circle at 85% 10%, ${brand} 0%, transparent 55%), radial-gradient(circle at 0% 100%, ${ink700} 0%, transparent 60%)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ width: 56, height: 4, backgroundColor: gold }} />
          <div
            style={{
              fontSize: 26,
              fontWeight: 700,
              letterSpacing: 6,
              color: gold,
            }}
          >
            PUBLIC CHOICE VOTE
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.05,
              letterSpacing: -2,
            }}
          >
            Frank Mbanefo Design Competition
          </div>
          <div style={{ fontSize: 34, color: "rgba(255,255,255,0.75)" }}>
            View all 10 designs, then vote for your favourite.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ fontSize: 26, fontWeight: 700 }}>
              Directorate of Competitions
            </div>
            <div style={{ fontSize: 20, letterSpacing: 3, color: azure }}>
              GODFREY OKOYE UNIVERSITY
            </div>
          </div>
          <div
            style={{
              display: "flex",
              padding: "16px 32px",
              borderRadius: 999,
              backgroundColor: gold,
              color: ink900,
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            Vote now · closes 10 Nov
          </div>
        </div>
      </div>
    ),
    size
  );
}
