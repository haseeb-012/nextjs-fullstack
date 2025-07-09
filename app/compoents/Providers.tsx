"use client";
import { ImageKitProvider } from "@imagekit/next";
import { SessionProvider } from "next-auth/react";

const URlEndPoint = process.env.NEXT_PUBLIC_URI_ENDPOINT ;

if(!URlEndPoint) {
  throw new Error("NEXT_PUBLIC_URI_ENDPOINT is not defined in the environment variables.");
}
export default function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider refetchInterval={5*60}>
    <ImageKitProvider urlEndpoint={URlEndPoint}>
        <>{children}</>
    </ImageKitProvider>
    </SessionProvider>;
}