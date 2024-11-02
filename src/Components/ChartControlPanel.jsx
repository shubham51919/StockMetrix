import React from 'react';
import CandleChart from './CandleChart';

const ChartControlPanel = ({
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
    // Common button styles
    const baseButtonStyles = "min-h-[40px] min-w-[40px] border border-white rounded-full transition-all duration-200";
    const timeButtonStyles = `${baseButtonStyles} w-fit bg-[rgb(255,255,255,0.1)] px-2 py-2 text-white text-[12px] hover:bg-[rgb(255,255,255,0.2)]`;
    const chartButtonStyles = `${baseButtonStyles} w-fit px-2 py-2 text-white hover:bg-[rgb(255,255,255,0.2)]`;
    const utilityButtonStyles = `${baseButtonStyles} w-full px-2 py-4 bg-[rgb(0,0,0,0.2)] hover:bg-[rgb(0,0,0,0.3)] cursor-pointer`;

    // Time intervals configuration
    const timeIntervals = [
        { label: '1m', value: '1minute' },
        { label: '30m', value: '30minute' },
        { label: '1d', value: 'day' },
        { label: '1w', value: 'week' },
        { label: '1mo', value: 'month' }
    ];

    // Chart types configuration
    const chartTypes = [
        { type: 'candlestick', icon: Candlestick },
        { type: 'line', icon: Line },
        { type: 'area', icon: Area },
        { type: 'bar', icon: Combo }
    ];

    return (
        <div className={`${expandedChart
            ? 'bg-[rgb(0,0,0,0.8)] fixed inset-0 z-50 w-screen h-screen'
            : 'w-[100%] h-[100%]'
            } flex gap-2`}>
            <div className="w-full h-full flex flex-col items-end">
                {/* Time interval controls */}
                <div className="flex gap-2 items-center rounded-full py-2">
                    {timeIntervals.map(({ label, value }) => (
                        <button
                            key={value}
                            className={`${timeButtonStyles} ${duration === value ? 'bg-[rgb(255,255,255,0.2)]' : ''
                                }`}
                            onClick={() => setDuration(value)}
                        >
                            {label}
                        </button>
                    ))}
                </div>

                {/* Chart Component */}
                <div className="w-full h-full">
                    <CandleChart chart={chart} expandedChart={expandedChart} />
                </div>
            </div>

            {/* Chart controls sidebar */}
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-2 mt-14">
                    {/* Chart type selector */}
                    <div className="flex flex-col gap-2 border border-white bg-[rgb(0,0,0,0.2)] items-center rounded-full py-2 px-2">
                        {chartTypes.map(({ type, icon: Icon }) => (
                            <button
                                key={type}
                                className={`${chartButtonStyles} ${chartType === type ? 'bg-[rgb(255,255,255,0.15)]' : ''
                                    }`}
                                onClick={() => setChartType(type)}
                            >
                                <img src={Icon} alt={type} className="w-5 h-5" />
                            </button>
                        ))}
                    </div>

                    {/* Utility buttons */}
                    <button
                        className={utilityButtonStyles}
                        onClick={handlePlotClick}
                    >
                        <img src={Reboot} alt="Refresh" className="mx-auto w-5 h-5" />
                    </button>

                    <button
                        className={utilityButtonStyles}
                        onClick={() => setExpandedChart(!expandedChart)}
                    >
                        <img src={Enlarge} alt="Expand" className="mx-auto w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChartControlPanel;