
import { IconChallenge, IconInfo, IconMemo } from "../icon";
import { Logo } from "../vector/logo"
import { NavItem } from "./nav/nav-item";
import { NavMenuItem } from "./nav/nav-menu-item";

export interface Header {
    className?: string;
    activePage?: string;
}
export const Header = ({ className = "", activePage = "" }: Header) => {
    return <div className={`w-full flex flex-row justify-between px-10 md:px-40 bg-dark-500 shadow-[0px_3px_6px_0px_rgba(0,_0,_0,_0.16)] ${className}`}>
        {/* Logo */}
        <div className="pt-4 pb-2 pl-4 pr-[19px] flex justify-center items-center">
            <Logo href="/" />
        </div>
        <div className="py-4 flex flex-row gap-4 items-center">
            <div className="hidden md:flex flex-row gap-4 items-center w-fit ">
                <NavItem isActive={activePage == "record-page"} href="/me/record" >
                    <IconMemo />
                    自分の記録
                </NavItem>
                <NavItem isActive={activePage == "challenge-page"} href="/" >
                    <IconChallenge />
                    チャレンジ
                </NavItem>
                <NavItem isActive={activePage == "info-page"} href="/" >
                    <IconInfo >
                        <div
                            className="bg-primary-500 absolute top-0 right-[-8px] rounded-[50%] w-4 h-4 leading-3 font-secondary text-[10px] flex items-center justify-center">
                            1
                        </div>
                    </IconInfo>
                    お知らせ
                </NavItem>
            </div>
            <NavMenuItem />
        </div>
    </div>
}