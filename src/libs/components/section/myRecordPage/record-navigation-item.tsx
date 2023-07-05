'use client';
import { motion } from 'framer-motion'
export interface RecordNavigationItem {
    url: string,
    title: string,
    content: string,
    className?: string;
    href?: string;
}
export const RecordNavigationItem = ({
    url,
    title,
    content,
    className = "",
    href = "#"
}: RecordNavigationItem) => {
    return <>
        {/* @ts-expect-error motion motion Component */}
        <motion.a
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} className={`bg-primary-300 p-6 transition-all hover:!scale-[1.1] ${className}`} href={href}>
            <div className="relative w-[240px] h-[240px] mx-auto">
                <div className="absolute top-0 left-0 w-full h-full bg-dark-600 z-10"></div>
                <img
                    src={url}
                    style={{
                        filter: "grayscale(100%)"
                    }}
                    className="absolute top-0 left-0  z-20 w-full h-full"
                />

                <div className="absolute top-0 left-0 w-full h-full z-30 flex flex-col gap-[11px] justify-center items-center">
                    <p className="text-primary-300 font-secondary text-[25px] leading-[30px] tracking-[0.125px] text-center">{title}</p>
                    <div className="pt-[1px] pb-[3px]  min-w-[160px] bg-primary-400 text-center text-light font-hiragino text-[14px] font-light leading-[20px] ">{content}</div>
                </div>
            </div>
        </motion.a></>
}