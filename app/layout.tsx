import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "localhost:3001";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const image = `${protocol}://${host}/og.png`;
  const title = "TECHCARE | 복합기 기술지원";
  const description = "Samsung MultiXpress 복합기 오류코드 검색과 현장 해결 가이드";
  return {
    title, description,
    openGraph: { title, description, images: [{ url: image, width: 1200, height: 630, alt: "TECHCARE 복합기 기술지원" }] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="ko"><body>{children}</body></html>; }
