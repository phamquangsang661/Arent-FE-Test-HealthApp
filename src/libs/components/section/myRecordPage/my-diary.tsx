'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs";
import { RichTextRender } from "../../rich-text/rich-text-render";
import { useAuth } from '@hooks';
import { api } from '@utils/api';
import { ButtonPrimary } from '../../button/button-primary';

export const MyDiary = () => {
    const { isAuth } = useAuth({
        redirect: true
    })
    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = api.diary.getDiaries.useInfiniteQuery(
        {
            paging: {
                limit: 8,
            },
        },
        {
            getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
            enabled: !!isAuth
        },
    );


    return <>
        <div id="my-diary">
            <h1 className="text-[22px] text-center md:text-left font-secondary leading-[27px] tracking-[0.11px] pb-[5px]">MY DIARY</h1>
            {(!data?.pages || data?.pages?.length == 0 || data?.pages?.[0]?.data?.diaries.length == 0)
                &&
                <p className="text-center w-full text-dark-600 font-hiragino text-[30px] mx-auto">現在ログは保存されていません。新しいものをログに記録してください。</p>}
            <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {data?.pages.map((page) => {
                    return page.data?.diaries.map((item) => (
                        <>
                            {/* @ts-expect-error motion motion Component */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5 }} key={item.id} className="cursor-pointer transition-all  hover:scale-[1.15] hover:translate-y-[-5px] mx-auto w-[231px] h-[231px] border-[2px] border-gray-400 bg-light pt-4 px-4 pb-[27px] flex flex-col gap-2">
                                <div className="text-[18px] font-secondary leading-[22px] tracking-[0.09px] ">
                                    <p>{dayjs(item.createdAt).format("YYYY.MM.DD")}</p>
                                    <p>{dayjs(item.createdAt).format("HH:mm")}</p>
                                </div>
                                <RichTextRender
                                    className="text-ellipsis  overflow-hidden  h-[132px] text-[12px] font-hiragino leading-[17px]  font-light tracking-[0.06px]"
                                    content={item.content.slice(0, 105) + (item.content.length > 104 ? ` ...` : "")}//max 104 char
                                />
                            </motion.div>
                        </>
                    ));
                })}
            </div>
        </div>
        {hasNextPage && <ButtonPrimary onClick={() => { fetchNextPage() }} className="md:!w-[296px] mx-auto mt-[-26px]">自分の日記をもっと見る</ButtonPrimary>}
    </>
}