import { useMemo } from "react"
import { CirclePercentage } from "../../graph"
import { randomInRange } from "@utils/utils"

export const AchievementRate = () => {
    const percentage = useMemo(() => { return randomInRange(10, 100) }, [])
    return <div className="md:w-[990px] h-[312px] relative achievement-rate flex justify-center items-center">

        <div className="absolute top-0 left-0 w-full h-full z-10 increase-brightness ">
            <img src={"/images/my-page-p1.png"} className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-full z-20 bg-primary-500 opacity-[0.3] blur-md"> </div>
        <div className="absolute  top-0 left-0 w-full h-full z-30">
            <CirclePercentage percentage={percentage} circleColor="white">
                <p className="text-[25px] text-light graph-text-color leading-[30px] font-secondary">
                    <span className="text-[18px] text-light graph-text-color leading-[22px] font-secondary">21/5 </span>
                    {percentage}%
                </p>
            </CirclePercentage>
        </div>
    </div>
}