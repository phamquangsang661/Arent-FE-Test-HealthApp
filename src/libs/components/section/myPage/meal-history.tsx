'use client';
import { motion } from 'framer-motion'
import dayjs from "dayjs"
import { ButtonPrimary } from '../../button/button-primary';
import { api } from '@utils/api';
import { useAuth } from '@hooks';

export interface MealHistory {
    filter: "all" | "Morning" | "Lunch" | "Dinner" | "Snack"
}
export const MealHistory = ({ filter }: MealHistory) => {

    const { isAuth } = useAuth({
        redirect: true
    })
    const {
        data,
        hasNextPage,
        fetchNextPage,
    } = api.mealHistory.getMealHistories.useInfiniteQuery(
        {
            paging: {
                limit: 8,
            },
            type: filter == "all" ? undefined : filter
        },
        {
            getNextPageParam: (lastPage) => lastPage.data?.nextCursor,
            enabled: !!isAuth
        },
    );

    // Maximum 8 item per page
    return <>
        {(!data?.pages || data?.pages?.length == 0 || data?.pages?.[0]?.data?.mealHistories.length == 0)
            &&
            <p className="text-center w-full text-primary-400 font-hiragino text-[30px] mx-auto">現在、履歴は記録されていません !</p>}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mx-auto">

            {data?.pages.map((page) => {
                return page.data?.mealHistories.map((item) => (
                    <>
                        {/* @ts-expect-error motion motion Component */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            key={item.id} className="relative w-[234px] h-[234px] overflow-hidden meal-item">
                            <img className="meal-image" alt={dayjs(item.createdAt).format("MM.DD") + "." + item.type} src={item.image} />
                            <div className="absolute bottom-0 left-0 w-fit h-fit">
                                <div className="pl-2 py-[7px] pr-[10px] bg-primary-300 
                font-secondary text-[15px] leading-[18px] tracking-[0.15px] text-light">
                                    {dayjs(item.createdAt).format("MM.DD") + "." + item.type}
                                </div>
                            </div>
                        </motion.div>

                    </>
                ));
            })}

        </div>
        {hasNextPage && <ButtonPrimary onClick={() => { fetchNextPage() }} className="!w-[80%] md:!w-[296px] mx-auto mt-1">記録をもっと見る</ButtonPrimary>}
    </>
}