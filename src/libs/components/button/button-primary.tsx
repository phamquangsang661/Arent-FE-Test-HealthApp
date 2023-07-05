import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

export interface ButtonPrimary {
    children: string;
    className?: string | JSX.Element;
}
export const ButtonPrimary = ({ children, className = "", ...props }: ButtonPrimary & DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) => {
    return <button
        {...props}
        className={`
        bg-gradient-primary rounded-md py-[14px] px-1 w-full 
        text-[18px] leading-[26px] text-light font-hiragino font-light hover:opacity-80
        ${className}`}
    >
        {children}
    </button>
}