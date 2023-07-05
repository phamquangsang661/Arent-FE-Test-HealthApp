'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs"
import { useMemo, useState } from "react"

const listUrlImage = [
    "/images/meal-history-example-1.png",
    "/images/meal-history-example-2.png",
    "/images/meal-history-example-3.png",
    "/images/meal-history-example-4.png",
    "/images/meal-history-example-5.png",
    "/images/meal-history-example-6.png",
    "/images/meal-history-example-7.png",
    "/images/meal-history-example-8.png"
]
export interface MealHistory {
    filter: "all" | "Morning" | "Lunch" | "Dinner" | "Snack"
}
export const MealHistory = ({ filter }: MealHistory) => {
    const [data, setData] = useState<{
        url: string,
        id: string,
        date: string,
        type: "Morning" | "Lunch" | "Dinner" | "Snack"
    }[]>(listUrlImage.map((item, index) => {
        return {
            url: item,
            id: index.toString(),
            date: dayjs().toISOString(),
            type: index % 3 == 0 ? "Dinner" : index % 2 == 0 ? "Lunch" : "Morning"
        }
    }))

    const filterData = useMemo(() => {
        if (filter == "all")
            return data
        else return data.filter(f => f.type == filter)
    }, [filter, data])
    // Maximum 8 item
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto">
        {filterData.map(item => <>
            {/* @ts-expect-error motion motion Component */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={item.id} className="relative w-[234px] h-[234px] overflow-hidden meal-item">
                <img className="meal-image" alt={dayjs(item.date).format("MM.DD") + "." + item.type} src={item.url} />
                <div className="absolute bottom-0 left-0 w-fit h-fit">
                    <div className="pl-2 py-[7px] pr-[10px] bg-primary-300 
                font-secondary text-[15px] leading-[18px] tracking-[0.15px] text-light">
                        {dayjs(item.date).format("MM.DD") + "." + item.type}
                    </div>
                </div>
            </motion.div>
        </>)}
    </div>
}