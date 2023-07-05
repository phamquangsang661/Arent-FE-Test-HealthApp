import dayjs from "dayjs"
import { useState } from "react"

export interface MyExerciseRecord {

}
export const MyExerciseRecord = () => {
    const [data, setData] = useState<{
        name: string,
        id: string,
        kcal: number,
        min: number
    }[]>(Array.from(Array(30).keys()).map((item => ({
        id: item.toString(),
        name: "家事全般（立位・軽い)",
        kcal: 26,
        min: 10
    }))))
    return <div id="my-exercise-record" className="h-[264px] pt-4 pl-6 pr-6 md:pr-16 pb-6 bg-dark-500 relative">
        <div className=" flex flex-row pb-1">
            <h1 className="font-secondary text-light text-[15px] tracking-[0.15px] leading-[18px] w-[96px]">
                MY EXERCISE
            </h1>
            <p className="text-white text-[22px] leading-[27px] tracking-[0.11px] font-secondary text-light">{dayjs().format("YYYY.MM.DD")}</p>
        </div>
        <div className="grid grid-cols-2 gap-x-10 gap-y-2 h-[192px] pr-[32px] overflow-y-auto overflow-x-hidden my-exercise-scroll-custom my-exercise-scroll-custom-vertical">
            {data.map(item => (
                <div key={item.id} className="flex flex-row justify-between pr-[13px] pb-[2px] border-b border-gray-400">
                    <div className="flex flex-col ">
                        <p className=" text-[15px] text-light font-hiragino  font-light leading-[22px] tracking-[0.075] flex gap-[11px] items-center">
                            <span className="text-[5px] font-hiragino font-light leading-[7px] tracking-[0.015px] ">●</span> {item.name}
                        </p>
                        <p className="text-primary-300 font-secondary text-[15px] leading-[18px] tracking-[0.075]">
                            {item.kcal}kcal
                        </p>
                    </div>
                    <div></div>
                </div>
            ))}
        </div>
    </div>
}