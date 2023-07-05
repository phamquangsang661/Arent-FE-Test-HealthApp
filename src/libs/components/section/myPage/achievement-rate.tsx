import { useMemo } from "react"
import { CirclePercentage } from "../../graph"

export interface AchievementRate {

}
export const AchievementRate = ({ }: AchievementRate) => {
    const percentage = useMemo(() => { return 75 }, [])
    return <div className="md:w-[990px] h-[312px] achievement-rate bg-no-repeat flex justify-center items-center">
        <CirclePercentage percentage={percentage} circleColor="white">
            <p className="text-[25px] text-light graph-text-color leading-[30px] font-secondary">
                <span className="text-[18px] text-light graph-text-color leading-[22px] font-secondary">21/5 </span>
                {percentage}%
            </p>
        </CirclePercentage>
    </div>
}

//
