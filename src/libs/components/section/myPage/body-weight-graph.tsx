import { api } from '@utils/api';
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
import { useMemo } from 'react';
import { Line } from 'react-chartjs-2';

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

export const BodyWeighGraph = () => {
    const last12Month = useMemo(() => {
        const newLabels = []
        const thisMonth = dayjs().month();

        for (let i = 0; i < 12; i++) {
            newLabels.push(labels[thisMonth + i < 12 ? thisMonth + i : (thisMonth + i) % 12])
        }
        return newLabels
    }, []);
    const { data, isFetched, isError } = api.bodyHistory.getBodyHistories.useQuery();
    const convertDatasetForChart = useMemo(() => {
        const init = [{
            label: 'Body weight',
            data: [],
            borderWidth: 3,
            borderColor: '#8FE9D0',
            backgroundColor: '#8FE9D0',
        },
        {
            label: 'Body fat',
            data: [],
            borderWidth: 3,
            borderColor: '#FFCC21',
            backgroundColor: '#FFCC21',
        }]
        if (isFetched && !isError && data && data.data) {
            data.data.forEach((item) => {
                (init[0]?.data as number[]).push(item.weight);
                (init[1]?.data as number[]).push(item.fat);
            })
        }
        return init
    }, [isFetched, data, isError])



    return <div className="w-full h-fit md:h-[312px] flex justify-center px-8 md:px-0 bg-dark-600 pb-[19px] pt-3"><Line options={{
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
        datasets: convertDatasetForChart,
    }} />
    </div>
}