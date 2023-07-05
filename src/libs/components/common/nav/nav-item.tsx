import { ReactNode } from "react"
import Link from 'next/link'

export interface NavItem {
    children?: ReactNode;
    className?: string;
    href: string
}
export const NavItem = ({ children, className = "", href }: NavItem) => {
    return <>
        {/* @ts-expect-error Link Component */}
        <Link  href={href} className={` flex flex-row gap-2 pt-3 justify-center items-center pb-[13px] pl-2 pr-4 
    text-light font-light text-[16px] font-hiragino leading-[23px] cursor-pointer hover:opacity-50 link
    ${className}
    `}>
            {children}
        </Link>
    </>
}