'use client';
import { motion } from 'framer-motion'
import { IconCup, IconKnife } from "../../icon"
import { Hexagon } from "../../vector/hexagon"
export interface MyPageFilters {
    onFilter: (type: 'Morning' | 'Dinner' | 'Lunch' | 'Snack') => () => void
}
export const MyPageFilters = ({ onFilter }: MyPageFilters) => {
    return <>
        {/* @ts-expect-error motion motion Component */}
        <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "fit-content", opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-[66px] w-fit mx-auto justify-center items-center">
            <Hexagon onClick={onFilter("Morning")}>
                <IconKnife />
                <p className="font-secondary leading-6 text-[20px] text-light">Morning</p>
            </Hexagon>
            <Hexagon onClick={onFilter("Dinner")}>
                <IconKnife />
                <p className="font-secondary leading-6 text-[20px] text-light">Lunch</p>
            </Hexagon>
            <Hexagon onClick={onFilter("Lunch")}>
                <IconKnife />
                <p className="font-secondary leading-6 text-[20px] text-light">Dinner</p>
            </Hexagon>
            <Hexagon onClick={onFilter("Snack")}>
                <IconCup />
                <p className="font-secondary leading-6 text-[20px] text-light">Snack</p>
            </Hexagon>
        </motion.div>

    </>
}