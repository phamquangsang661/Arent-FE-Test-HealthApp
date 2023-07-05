'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs";
import { useState } from "react"
import { RichTextRender } from "../../rich-text/rich-text-render";

export const MyDiary = () => {
    const [data, setData] = useState<{
        id: string;
        date: string;
        content: string
    }[]>(
        Array.from(Array(8).keys()).map(item => (
            {
                id: item.toString(),
                date: dayjs().toISOString(),
                content: `私の日記の記録が一部表示されます。<br/>
                テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストトテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト`
            }
        )))
    return <div id="my-diary">
        <h1 className="text-[22px] text-center md:text-left font-secondary leading-[27px] tracking-[0.11px] pb-[5px]">MY DIARY</h1>
        <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {data.map(item => (
                <>
                    {/* @ts-expect-error motion motion Component */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }} key={item.id} className="cursor-pointer transition-all  hover:scale-[1.15] hover:translate-y-[-5px] mx-auto w-[231px] h-[231px] border-[2px] border-gray-400 bg-light pt-4 px-4 pb-[27px] flex flex-col gap-2">
                        <div className="text-[18px] font-secondary leading-[22px] tracking-[0.09px] ">
                            <p>{dayjs(item.date).format("YYYY.MM.DD")}</p>
                            <p>{dayjs(item.date).format("HH:mm")}</p>
                        </div>
                        <RichTextRender
                            className="text-ellipsis  overflow-hidden  h-[132px] text-[12px] font-hiragino leading-[17px]  font-light tracking-[0.06px]"
                            content={item.content.slice(0, 105) + (item.content.length > 104 ? ` ...` : "")}//max 104 char
                        />
                    </motion.div>
                </>
            ))}
        </div>
    </div>
}