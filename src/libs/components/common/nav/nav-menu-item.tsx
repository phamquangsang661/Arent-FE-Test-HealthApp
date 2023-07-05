'use client';
import { ReactNode, Ref, useRef, useState, useTransition } from "react";
import { IconClose, IconMenu } from "../../icon";
import { motion } from 'framer-motion'
import { useOutsideCheck } from "@hooks";
import { useRouter } from "next/router";

export interface NavMenuItem {
    className?: string;
}


export const NavMenuItem = ({ className }: NavMenuItem) => {
    const [isOpen, setIsOpen] = useState(false);
    const navRef = useRef<HTMLElement>(null)
    useOutsideCheck({
        ref: navRef, callback: () => {
            setIsOpen(false)
        }
    })

    const onOpen = () => {

        setIsOpen(true)

    }
    const onClose = () => {

        setIsOpen(false)

    }

    return <>
        {/* @ts-expect-error motion nav Component */}
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className={`relative ${className}`}
            ref={navRef}
        >
            {/* @ts-expect-error motion nav Component */}
            <motion.div className="absolute top-[47px] right-[-35px] md:top-[32px] md:right-[3px] w-screen md:w-[280px] overflow-hidden bg-gray-400" variants={{
                open: { height: "fit-content" },
                closed: { height: 0 },
            }}>
                <NavMenuItemInside >自分の記録</NavMenuItemInside>
                <NavMenuItemInside >体重グラフ</NavMenuItemInside>
                <NavMenuItemInside >目標</NavMenuItemInside>
                <NavMenuItemInside >選択中のコース</NavMenuItemInside>
                <NavMenuItemInside >コラム一覧</NavMenuItemInside>
                <NavMenuItemInside >設定</NavMenuItemInside>
            </motion.div>
            {!isOpen && <div className="cursor-pointer" onClick={onOpen}>
                <IconMenu />
            </div>}
            {isOpen && <div className="cursor-pointer" onClick={onClose}>
                <IconClose />
            </div>}

        </motion.nav>
    </>
}

interface NavMenuItemInside {
    children: ReactNode,
    href?: string,
}
const NavMenuItemInside = ({ children, href = "/" }: NavMenuItemInside) => {
    const router = useRouter()
    const onClick = () => {
        router.push(href)
    }
    //Can not use link here, Link shouldn't have the children
    return <div className="flex flex-col" onClick={onClick}>
        <div className="opacity-[0.15000000596046448] h-[1px] bg-light"></div>
        <div
            className="pl-8 py-[23px] font-hiragino leading-[26px] font-light text-[18px] text-light hover:bg-dark-500 cursor-pointer">
            {children}
        </div>
        <div className="opacity-[0.25] h-[1px] bg-dark-600"></div>
    </div>
}