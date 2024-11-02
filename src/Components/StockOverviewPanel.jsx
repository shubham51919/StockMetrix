import React from 'react';
// import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';
import ChartControlPanel from './ChartControlPanel';

const StockOverviewPanel = ({
    selectedOption,
    isinNumber,
    data,
    expandedChart,
    duration,
    setDuration,
    chart,
    chartType,
    setChartType,
    handlePlotClick,
    setExpandedChart,
    Candlestick,
    Line,
    Area,
    Combo,
    Reboot,
    Enlarge
}) => {
    const getLatestPrice = () => {
        if (!data || data.length === 0) return null;
        return data[data.length - 1][4]; // Closing price of latest candle
    };

    const getPriceChange = () => {
        if (!data || data.length < 2) return { value: 0, percentage: 0 };
        const latestClose = data[data.length - 1][4];
        const previousClose = data[data.length - 2][4];
        const change = latestClose - previousClose;
        const percentageChange = (change / previousClose) * 100;
        return {
            value: change,
            percentage: percentageChange
        };
    };

    const getDayRange = () => {
        if (!data || data.length === 0) return { low: 0, high: 0 };
        const dayData = data[data.length - 1];
        return {
            low: dayData[3], // Day's low
            high: dayData[2]  // Day's high
        };
    };

    const getVolume = () => {
        if (!data || data.length === 0) return 0;
        return data[data.length - 1][5]; // Volume
    };

    const priceChange = getPriceChange();
    const dayRange = getDayRange();
    const currentPrice = getLatestPrice();
    const volume = getVolume();

    return (
        <div className="flex flex-col h-full w-full gap-4 mr-4">
            <div className="bg-black/20 rounded-lg p-6 backdrop-blur-sm">
                <div className="grid grid-cols-12 gap-6">
                    {/* Stock Info Section */}
                    <div className="col-span-4">
                        <h1 className="text-2xl font-bold text-white mb-2">
                            {selectedOption}
                        </h1>
                        <p className="text-white/60 text-sm mb-4">
                            ISIN: {isinNumber}
                        </p>
                        <div className="flex items-baseline gap-3">
                            <span className="text-3xl font-bold text-white">
                                ₹{currentPrice?.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                            </span>
                            <div className={`flex items-center gap-1 ${priceChange.value >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                                {priceChange.value >= 0 ? (
                                    // <ArrowUpCircle className="w-4 h-4" />
                                    <div>up</div>
                                ) : (
                                    // <ArrowDownCircle className="w-4 h-4" />
                                    <div>down</div>
                                )}
                                <span className="font-medium">
                                    {Math.abs(priceChange.value).toFixed(2)} ({Math.abs(priceChange.percentage).toFixed(2)}%)
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Price Stats Section */}
                    <div className="col-span-8 grid grid-cols-3 gap-6">
                        <div className="p-4 bg-white/5 rounded-lg">
                            <h3 className="text-white/60 text-sm mb-2">Day's Range</h3>
                            <div className="flex flex-col">
                                <span className="text-white font-medium">₹{dayRange.low.toFixed(2)}</span>
                                <div className="w-full h-1 bg-white/10 rounded-full my-2">
                                    <div
                                        className="h-full bg-blue-500 rounded-full"
                                        style={{
                                            width: `${((currentPrice - dayRange.low) / (dayRange.high - dayRange.low)) * 100}%`
                                        }}
                                    />
                                </div>
                                <span className="text-white font-medium">₹{dayRange.high.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg">
                            <h3 className="text-white/60 text-sm mb-2">Volume</h3>
                            <span className="text-xl font-bold text-white">
                                {volume.toLocaleString('en-IN')}
                            </span>
                        </div>

                        <div className="p-4 bg-white/5 rounded-lg">
                            <h3 className="text-white/60 text-sm mb-2">Last Updated</h3>
                            <span className="text-white font-medium">
                                {data && data.length > 0 &&
                                    new Date(data[data.length - 1][0]).toLocaleString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: true
                                    })}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <ChartControlPanel
                expandedChart={expandedChart}
                duration={duration}
                setDuration={setDuration}
                chart={chart}
                chartType={chartType}
                setChartType={setChartType}
                handlePlotClick={handlePlotClick}
                setExpandedChart={setExpandedChart}
                Candlestick={Candlestick}
                Line={Line}
                Area={Area}
                Combo={Combo}
                Reboot={Reboot}
                Enlarge={Enlarge}
            />
        </div>
    );
};

export default StockOverviewPanel;