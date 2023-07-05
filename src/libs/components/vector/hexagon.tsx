import { ReactNode } from "react";

export interface Hexagon {
    className?: string;
    children?: ReactNode;
    onClick?: () => void
}
export const Hexagon = ({ className = "", children, onClick = () => { } }: Hexagon) => {
    return <div className={`relative w-fit h-fit ${className} px-[10px]`} onClick={onClick}>
        <svg width="116" height="134" viewBox="0 0 116 134" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 48" d="M0 33.5L58 0L116 33.5V100.5L58 134L0 100.5L0 33.5Z" fill="url(#paint0_linear_33451_933)" />
            <defs>
                <linearGradient id="paint0_linear_33451_933" x1="25.9565" y1="165.202" x2="147.019" y2="118.302" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#FFCC21" />
                    <stop offset="1" stop-color="#FF963C" />
                </linearGradient>
            </defs>
        </svg>
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center cursor-pointer hover:opacity-60">{children}</div>
    </div>

}