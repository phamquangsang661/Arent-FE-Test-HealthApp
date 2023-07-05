import { ReactNode, useCallback, useMemo } from "react";


export interface CirclePercentage {
    percentage: number,
    circleColor: string,
    children?: ReactNode
}
export const CirclePercentage = ({ percentage, circleColor, children }: CirclePercentage) => {
    const percent = useMemo(() => {
        const isNegativeOrNaN = !Number.isFinite(+percentage) || percentage < 0; // we can set non-numbers to 0 here
        const isTooHigh = percentage > 100;
        return isNegativeOrNaN ? 0 : isTooHigh ? 100 : +percentage;
    }, [percentage])
    return (
        <div className="flex justify-center items-center relative w-full h-full">
            <svg width={200} height={200}>

                <Circle mainCircle color={circleColor} percentage={percent} />
            </svg>
            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center gap-1">
                {children}
            </div>
        </div>
    );
}


const Circle = ({ color, percentage = 0, mainCircle = false }: {
    color: string,
    percentage?: number,
    mainCircle?: boolean;
}) => {
    const r = 90.5;
    const circ = 2 * Math.PI * r;
    const strokePct = ((100 - percentage) * circ) / 100; // where stroke will start, e.g. from 15% to 100%.
    return (
        <>
            <circle
                r={r}
                cx={100}
                cy={100}
                filter="url(#glow)"
                transform={`rotate(-90 ${"100 100"})`}
                stroke={strokePct !== circ ? color : ""} // remove color as 0% sets full circumference
                strokeWidth={"3px"}
                fill="transparent"
                strokeDasharray={circ}
                strokeDashoffset={percentage ? strokePct : 0}
            ></circle>
            <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
                    <feOffset in="blur" dx="0" dy="0" result="offsetBlur" />
                    <feFlood flood-color="#EA6C00" result="glowColor" />
                    <feComposite in="glowColor" in2="offsetBlur" operator="in" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>
            </defs>
        </>
    );
};

const Text = ({ percentage }: {
    percentage: number
}) => {
    return (
        <text
            x="50%"
            y="50%"
            dominantBaseline="central"
            textAnchor="middle"
            fontSize={"1.5em"}

        >
            {percentage.toFixed(0)}%
        </text>
    );
};