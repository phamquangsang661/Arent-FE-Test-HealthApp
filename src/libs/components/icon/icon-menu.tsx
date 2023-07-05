export interface IconMenu {
    className?: string;
    size?: number
}
export const IconMenu = ({ className = "", size = 32 }: IconMenu) => {
    return <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={`fill-primary-400 ${className} `}
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="32" height="32" />
        <path d="M3 8H29" stroke="#FF963C" stroke-width="3" />
        <path d="M3 16H29" stroke="#FF963C" stroke-width="3" />
        <path d="M3 24H29" stroke="#FF963C" stroke-width="3" />
    </svg>


}