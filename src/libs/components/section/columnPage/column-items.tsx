'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs"
import { useState } from "react"
import { RichTextRender } from '../../rich-text/rich-text-render';

const listUrlImage = [
    "/images/column-item-example-1.png",
    "/images/column-item-example-2.png",
    "/images/column-item-example-3.png",
    "/images/column-item-example-4.png",
    "/images/column-item-example-5.png",
    "/images/column-item-example-6.png",
    "/images/column-item-example-7.png",
    "/images/column-item-example-8.png"
]
export interface ColumnItems {

}
export const ColumnItems = ({ }: ColumnItems) => {
    const [data, setData] = useState<{
        url: string,
        id: string,
        date: string,
        content: string,
        tags: string[]
    }[]>(listUrlImage.map((item, index) => {
        return {
            url: item,
            id: index.toString(),
            date: dayjs().toISOString(),
            content: "魚を食べて頭も,カラダも元気に！知っておきたい魚を食べるメリ知っておきたい魚を食べるメリ知っておきたい魚を食べるメリ 知っておきたい魚を食べるメリ",
            tags: ["魚料理", "和食", "DHA"]
        }
    }))


    // Maximum 8 item
    return <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto">
        {data.map(item => <>
            {/* @ts-expect-error motion motion Component */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                key={item.id}
                className="w-[234px] text-dark-500"
            >
                <div className="relative  h-[144px] overflow-hidden column-item">
                    <img className="column-item-image" alt={dayjs(item.date).format("MM.DD")} src={item.url} />
                    <div className="absolute bottom-0 left-0 w-fit h-fit">
                        <div className="pl-2 py-[7px] pr-[10px] bg-primary-300 
                font-secondary text-[15px] leading-[18px] tracking-[0.15px] text-light">
                            {dayjs(item.date).format("YYYY.MM.DD") + "    " + dayjs(item.date).format("HH:mm")}
                        </div>
                    </div>
                </div>


                <RichTextRender
                    className="text-ellipsis  overflow-hidden pt-2 text-[15px] font-hiragino font-light leading-[22px] tracking-[0.075px]"
                    component='p'
                    content={item.content.slice(0, 30) + (item.content.length > 29 ? ` ...` : "")}//max 104 char
                />
                <div className="flex flex-row flex-wrap gap-3 text-[12px] font-hiragino font-light leading-[22px] tracking-[0.06px]">
                    {item.tags.map(tag => <a className="link  !text-primary-400 hover:opacity-70 transition-all hover:scale-[1.2]" href="#">#{tag}</a>)}
                </div>
            </motion.div>
        </>)}
    </div>
}