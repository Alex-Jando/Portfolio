import type { NextConfig } from "next";
import createMDX from "@next/mdx";

/**
 * Security headers.
 *
 * The site is fully static with no user input, so these are inexpensive
 * hardening defaults rather than a strict CSP (an inline theme script and
 * JSON-LD blocks are required in <head>).
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
];

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    // Source art tops out near 1280px wide. Without this, Next.js requests
    // w=3840 for the collection grid, which upscales small thumbnails and
    // re-compresses them for no benefit.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [96, 128, 256, 384, 512, 640],
    // Thumbnails are small and detail-dense (screenshots, CAD, text).
    qualities: [75, 90],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        // Generated share cards are content-addressed by the build.
        source: "/og/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=3600, stale-while-revalidate=86400" },
        ],
      },
      {
        source: "/fonts/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/projects/accessible-macro-pad-new",
        destination: "/projects/accessible-macro-pad",
        permanent: true,
      },
    ];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
