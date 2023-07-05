import Head from "next/head"
import { ReactNode } from "react";

export interface AuthLayout {
    title?: string;
    content?: string;
    faviconUrl?: string;
    children?: ReactNode;
    className?: string;
}
export const AuthLayout = ({
    title = "Auth",
    content = "Auth page",
    faviconUrl = "/favicon.ico",
    children,
    className = ""
}: AuthLayout) => {
    return <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={content} />
            <link rel="icon" href={faviconUrl} />
        </Head>
        <main className={`flex min-h-screen flex-col items-center justify-center ${className}`}>
            {children}
        </main>
    </>
}