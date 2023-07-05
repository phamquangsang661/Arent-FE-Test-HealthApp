import { useRouter } from "next/router";

export interface Logo {
    className?: string;
    size?: number;
    href?: string
}
export const Logo = ({ size = 40, className = "", href = "/" }: Logo) => {
    const router = useRouter()
    const onClick = () => {
        router.push(href)
    }
    return <svg
        onClick={onClick}
        width={(109 - 40) + size}
        height={size}
        className={`fill-primary-400 cursor-pointer ${className} `}
        viewBox="0 0 109 40"
        fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <g id="&#227;&#130;&#176;&#227;&#131;&#171;&#227;&#131;&#188;&#227;&#131;&#151; 138" clipPath="url(#clip0_33451_176)">
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 82" d="M15.8646 11.5166H25.3418V19.3131H28.9509V0.0280762H25.3418V8.15528H15.8646V0.0280762H12.228V19.3131H15.8646V11.5166Z" />
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 83" fillRule="evenodd" clipRule="evenodd" d="M37.6932 19.6437C39.7593 19.6437 42.1011 18.9274 43.5338 17.4396L41.3847 15.3182C40.6133 16.1173 38.988 16.5856 37.7482 16.5856C35.3789 16.5856 33.9188 15.3735 33.6983 13.6929H44.3051C44.8286 8.10022 41.9909 5.29004 37.4451 5.29004C33.0372 5.29004 30.227 8.2655 30.227 12.3979C30.227 16.7509 33.0096 19.6437 37.6932 19.6437ZM37.5552 8.2655C39.4838 8.2655 40.8614 9.14709 41.0816 10.9103H33.7535C34.2493 9.1471 35.7371 8.2655 37.5552 8.2655H37.5552Z" />
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 84" fillRule="evenodd" clipRule="evenodd" d="M52.8958 19.6984C54.4111 19.6709 56.5324 18.8993 57.3039 17.3015L57.4692 19.2852H60.6374V5.70287H57.414L57.3039 7.57628C56.5324 6.2263 54.7968 5.3723 52.9786 5.3723C49.0113 5.34471 45.898 7.79674 45.898 12.4802C45.898 17.2462 48.8736 19.7259 52.8958 19.6984L52.8958 19.6984ZM53.2815 8.37524C58.5711 8.37524 58.5711 16.6125 53.2815 16.6125C51.0499 16.6125 49.2592 15.0699 49.2592 12.4802C49.2592 9.8905 51.0499 8.37524 53.2815 8.37524Z" />
            <rect id="&#233;&#149;&#183;&#230;&#150;&#185;&#229;&#189;&#162; 45" x="63.0323" y="0.0275879" width="3.33355" height="19.2575" />
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 85" d="M82.6182 12.3424C82.6182 10.3037 83.9955 8.62317 85.9792 8.62317C87.7701 8.62317 89.0649 9.67017 89.0649 12.1495V19.285H92.4261V12.1221C92.4261 8.12733 90.718 5.51014 86.8608 5.51014C85.3181 5.51014 83.8304 5.9784 82.6182 7.54871V0H79.257V19.285H82.6182V12.3424Z" />
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 86" d="M70.8417 14.4909C70.8417 17.8797 72.7702 19.5602 75.7179 19.4501C76.7374 19.4225 77.5363 19.2572 78.5006 18.8714L77.5638 16.0062C77.068 16.2543 76.4618 16.4195 75.9384 16.4195C74.8915 16.4195 74.1752 15.7859 74.1752 14.491V8.6228H77.9496V5.7301H74.2028V2.41797H70.8417V5.7301H68.307V8.6228H70.8417L70.8417 14.4909Z" />
            <path id="&#227;&#131;&#145;&#227;&#130;&#185; 87" d="M105.449 5.37207L101.771 13.6346L98.1082 5.37207H94.5596L99.9926 17.6289L92.3602 34.7745L79.0009 23.4341L0 23.4408V26.5778L77.775 26.5792L93.5334 40L109 5.37207H105.449Z" />
        </g>
        <defs>
            <clipPath id="clip0_33451_176">
                <rect width="109" height="39.9999" fill="white" />
            </clipPath>
        </defs>
    </svg>

}