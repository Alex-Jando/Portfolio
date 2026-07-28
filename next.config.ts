import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
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
