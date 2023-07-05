import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ButtonGraphRecord {
    children: string;
    className?: string | JSX.Element;
    isActive?: boolean;
    onClick?: () => void
}
export const ButtonGraphRecord = ({ children, className = "", isActive = false, onClick, ...props }: ButtonGraphRecord & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return <button
        {...props}
        type="button"
        onClick={onClick}
        className={`pl-[21px] pr-5 pb-[2px] hover:opacity-70 rounded-[11px] ${isActive ? "bg-primary-300 text-light" : "bg-light text-primary-300"} text-[15px] font-hiragino  font-light leading-[22px] tracking-[0.075px]
        ${className}
        `}>
        {children}
    </button>
}