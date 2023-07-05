import Head from "next/head"
import { ReactNode } from "react";
import { Header } from "../common/header";
import { Footer } from "../common/footer";
import setting from "@constants/setting";
import { ButtonBackToTop } from "../common/button-back-to-top";

export interface Layout {
    title?: string;
    content?: string;
    faviconUrl?: string;
    children?: ReactNode;
    mainClassName?: string;
    className?: string;
    activePage?: string
}
export const Layout = ({
    title = "Default",
    content = "Default page",
    faviconUrl = setting.page.faviconUrl,
    children,
    activePage = "",
    mainClassName = "",
    className = ""
}: Layout) => {
    return <>
        <Head>
            <title>{title}</title>
            <meta name="description" content={content} />
            <link rel="icon" href={faviconUrl} />
        </Head>
        <main className={`flex min-h-screen flex-col items-center justify-center ${mainClassName}`}>
            <Header activePage={activePage} />
            <div className={`flex-grow  ${className}`}>
                {children}
                <ButtonBackToTop />
            </div>
            <Footer />
        </main>
    </>
}