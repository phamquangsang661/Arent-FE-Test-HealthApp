import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,
} from 'chart.js';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { ButtonGraphRecord } from '../../button/button-graph-record';

ChartJS.register(
    Filler,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

);

const labels = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', "8月", "9月", "10月", "11月", "12月"];
type FilterType = "day" | "week" | "month" | "year"
export const BodyGraphRecord = () => {
    const [selectedFilter, setSelectedFilter] = useState<FilterType>("year")
    const last12Month = useMemo(() => {
        const newLabels = []
        const thisMonth = dayjs().month();
        for (let i = 0; i < 12; i++) {
            newLabels.push(labels[thisMonth + i < 12 ? thisMonth + i : (thisMonth + i) % 12])
        }
        return newLabels
    }, [])
    const onClickFilter = (filterName: FilterType) => () => {
        setSelectedFilter(filterName)
    }

    return <div id="body-record" className="w-full h-[304px] relative mx-auto px-8 md:px-[47px] bg-dark-500 pb-[49px] pt-[54px]">
        <div className="absolute top-4 left-6 flex flex-row">
            <h1 className="font-secondary text-light text-[15px] tracking-[0.15px] leading-[18px] w-[96px]">
                BODY RECORD
            </h1>
            <p className="text-white text-[22px] leading-[27px] tracking-[0.11px] font-secondary text-light">{dayjs().format("YYYY.MM.DD")}</p>
        </div>
        <div className="absolute left-8 bottom-4 flex flex-row gap-4">
            <ButtonGraphRecord onClick={onClickFilter("day")} isActive={selectedFilter == "day"}>日</ButtonGraphRecord>
            <ButtonGraphRecord onClick={onClickFilter("week")} isActive={selectedFilter == "week"}>週</ButtonGraphRecord>
            <ButtonGraphRecord onClick={onClickFilter("month")} isActive={selectedFilter == "month"}>月</ButtonGraphRecord>
            <ButtonGraphRecord onClick={onClickFilter("year")} isActive={selectedFilter == "year"}>年</ButtonGraphRecord>
        </div>
        <Line options={{
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                y: {
                    display: false,
                },
                x: {
                    border: {
                        display: false
                    },
                    grid: {
                        color: "#777777"
                    },
                    ticks: {
                        color: "white",
                        font: {
                            family: "Hiragino",
                            size: 8
                        }
                    }
                },
            },
            plugins: {
                legend: {
                    display: false
                },
                title: {
                    display: false,
                },

            },
        }} data={{
            labels: last12Month,
            datasets: [
                {
                    label: 'Body weight',
                    data: [100, 200, 400, 10000],
                    borderWidth: 3,
                    borderColor: '#8FE9D0',
                    backgroundColor: '#8FE9D0',
                },
                {
                    label: 'Body fat',
                    data: [300, 100, 1000, 10000],
                    borderWidth: 3,
                    borderColor: '#FFCC21',
                    backgroundColor: '#FFCC21',
                },
            ],
        }} />
    </div>
}