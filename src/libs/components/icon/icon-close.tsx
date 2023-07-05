export interface IconClose {
    className?: string;
    size?: number
}
export const IconClose = ({ className = "", size = 32 }: IconClose) => {
    return <svg
        width={size}
        height={size}
        viewBox="0 0 32 32"
        className={`fill-primary-400 ${className} `}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <rect opacity="0.01" width="32" height="32" />
        <path d="M7 7L26 26" stroke="#FF963C" stroke-width="3" />
        <path d="M7 26L26 7" stroke="#FF963C" stroke-width="3" />
    </svg>
}