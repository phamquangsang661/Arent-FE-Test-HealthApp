import { ReactNode } from "react"
import Link from 'next/link'

export interface NavItem {
    children?: ReactNode;
    className?: string;
    href: string;
    isActive?: boolean;
}
export const NavItem = ({ children, className = "", isActive = false, href }: NavItem) => {
    return <>
        
        <Link href={href} className={` flex flex-row gap-2 pt-3 justify-center items-center pb-[13px] pl-2 pr-4 
   ${isActive ? "!text-primary-400" : " text-light"} font-light text-[16px] font-hiragino leading-[23px] cursor-pointer hover:opacity-50 link
    ${className}
    `}>
            {children}
        </Link>
    </>
}