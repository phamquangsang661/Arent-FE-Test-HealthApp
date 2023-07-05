'use client';
import { motion } from 'framer-motion'
export interface RecommendedColumnItem {
    title: string;
    content: string
}
export const RecommendedColumnItem = ({
    title,
    content
}: RecommendedColumnItem) => {
    return <>
       
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }} className="pt-6 px-2 transition-all hover:!scale-[1.1] pb-[22px] flex flex-col justify-center items-center bg-dark-600 w-[216px]">
            <h1 className="text-primary-300 text-[22px] font-inter leading-[27px] tracking-[0.11px] text-center">{title}</h1>
            <div className="mt-[10px] mb-2 h-[1px] w-[56px] bg-light "></div>
            <p className="text-[18px] font-hiragino font-light leading-[26px] text-light">{content}</p>
        </motion.div>
    </>
}