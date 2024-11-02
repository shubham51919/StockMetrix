
import React, { useContext, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Context } from '../Context/Context';
import { createChart } from 'lightweight-charts';
const CandleChart = ({ chart, expandedChart }) => {
    const { data, chartType, setChartType } = useContext(Context);
    const [chartData, setChartData] = useState({
        series: [{
            data: [{
                x: new Date(1538778600000),
                y: [6629.81, 6650.5, 6623.04, 6633.33]
            },
            ]
        }],
        options: {
            chart: {
                type: 'candlestick',
                height: 350
            },

            xaxis: {
                type: 'datetime'
            },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            }
        }
    });


    function convertTimestampToDate(timestamp) {
        return new Date(timestamp);
    }

    useEffect(() => {

        // Sort data array by time
        data.sort((a, b) => b[0] - a[0]);

        const chartOptions = { layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } };
        const chartone = createChart(document.getElementById('container'), chartOptions);
        const candlestickSeries = chartone.addCandlestickSeries({
            upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
            wickUpColor: '#26a69a', wickDownColor: '#ef5350',
        });
        const formattedData = data.map(item => ({
            x: convertTimestampToDate(item[0]), // Convert timestamp to milliseconds
            y: [item[1], item[2], item[3], item[4]] // OHLC
        }));

        setChartData({
            ...chartData,
            series: [{
                data: formattedData
            }]
        });
    }, [data])


    return (
        <div className={`bg-[rgb(0,0,0,0.2)] flex justify-center items-center ${expandedChart ? `` : `h-full`} w-full p-8 border border-white rounded-lg `}>
            <div id="chart" className='h-full w-full'>
                <div id="container"></div>
                <ReactApexChart style={{ minHeight: "0px" }} height={'100%'} key={chartType} options={chartData?.options} series={chartData?.series} type={chartType} />
            </div>
        </div>
    );
};

export default CandleChart;
