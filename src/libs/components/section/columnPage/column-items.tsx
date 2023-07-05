'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs"

import { RichTextRender } from '../../rich-text/rich-text-render';
import { api } from '@utils/api';
import { ButtonPrimary } from '../../button/button-primary';

export const ColumnItems = () => {

    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = api.column.getColumns.useInfiniteQuery(
        {
            paging: {
                limit: 8,
            },
        },
        {
            getNextPageParam: (lastPage) => lastPage.data?.nextCursor,

        },
    );


    // Maximum 8 item
    return <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto">
            {data?.pages.map((page) => {
                return page.data?.columns.map((item) => (
                    <>
                        {/* @ts-expect-error motion motion Component */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key={item.id}
                            className="w-[234px] text-dark-500"
                        >
                            <div className="relative  h-[144px] overflow-hidden column-item">
                                <img className="column-item-image" alt={dayjs(item.createdAt).format("MM.DD")} src={item.image} />
                                <div className="absolute bottom-0 left-0 w-fit h-fit">
                                    <div className="pl-2 py-[7px] pr-[10px] bg-primary-300 
                font-secondary text-[15px] leading-[18px] tracking-[0.15px] text-light">
                                        {dayjs(item.createdAt).format("YYYY.MM.DD") + "    " + dayjs(item.createdAt).format("HH:mm")}
                                    </div>
                                </div>
                            </div>
                            <RichTextRender
                                className="text-ellipsis  overflow-hidden pt-2 text-[15px] font-hiragino font-light leading-[22px] tracking-[0.075px]"
                                component='p'
                                content={item.content.slice(0, 30) + (item.content.length > 29 ? ` ...` : "")}//max 104 char
                            />
                            <div className="flex flex-row flex-wrap gap-3 text-[12px] font-hiragino font-light leading-[22px] tracking-[0.06px]">
                                {item.tags.map(tag => <a href={"#" + tag.slug} className="link  !text-primary-400 hover:opacity-70 transition-all hover:scale-[1.2]" >#{tag.name}</a>)}
                            </div>
                        </motion.div>
                    </>
                ));
            })}
        </div>
        {hasNextPage && <ButtonPrimary onClick={() => { fetchNextPage() }} className="md:!w-[296px] mx-auto mt-[-30px]">コラムをもっと見る</ButtonPrimary>}
    </>
}