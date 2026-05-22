import type { NextConfig } from "next";

const remotePatterns: NonNullable<NonNullable<NextConfig["images"]>["remotePatterns"]> = [
  {
    protocol: "http" as const,
    hostname: "localhost",
    port: "4000",
    pathname: "/uploads/**",
  },
  {
    protocol: "http" as const,
    hostname: "127.0.0.1",
    port: "4000",
    pathname: "/uploads/**",
  },
];

const backendUrl = process.env.NEXT_PUBLIC_API_URL;

if (backendUrl) {
  const parsedUrl = new URL(backendUrl);
  const existingPattern = remotePatterns.find(
    (pattern) =>
      pattern.protocol === parsedUrl.protocol.replace(":", "") &&
      pattern.hostname === parsedUrl.hostname &&
      pattern.port === (parsedUrl.port || ""),
  );

  if (!existingPattern) {
    remotePatterns.push({
      protocol: parsedUrl.protocol.replace(":", "") as "http" | "https",
      hostname: parsedUrl.hostname,
      port: parsedUrl.port || "",
      pathname: "/uploads/**",
    });
  }
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns,
  },
};

export default nextConfig;
