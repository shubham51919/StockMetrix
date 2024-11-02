import React from 'react';

const StockStatistics = ({ data }) => {
  const calculateStats = () => {
    if (!data || data.length === 0) return null;

    const latestDay = data[0];
    const previousDay = data[1];

    // Calculate daily change
    const dailyChange = latestDay[4] - previousDay[4];
    const dailyChangePercent = (dailyChange / previousDay[4] * 100).toFixed(2);

    // Calculate trading volume change
    const volumeChange = ((latestDay[5] - previousDay[5]) / previousDay[5] * 100).toFixed(2);

    // Calculate price range
    const dayRange = {
      high: latestDay[2],
      low: latestDay[3],
      range: (latestDay[2] - latestDay[3]).toFixed(2)
    };

    // Calculate average volume
    const avgVolume = (data.reduce((sum, day) => sum + day[5], 0) / data.length).toFixed(0);

    return {
      dailyChange,
      dailyChangePercent,
      volumeChange,
      dayRange,
      avgVolume
    };
  };

  const stats = calculateStats();
  if (!stats) return null;

  return (
    <div className="grid grid-cols-1 gap-4 w-full overflow-y-auto ">
      {/* Daily Change Card */}
      <div className="bg-black border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stats.dailyChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            {stats.dailyChange >= 0 ? (
              <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
            ) : (
              <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
              </svg>
            )}
          </div>
          <span className="text-sm text-white/80">Daily Change</span>
        </div>
        <div className={`text-lg font-bold ${stats.dailyChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stats.dailyChangePercent}%
        </div>
      </div>

      {/* Volume Card */}
      <div className="bg-black border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
          </div>
          <span className="text-sm text-white/80">Average Volume</span>
        </div>
        <div className="text-lg font-bold text-white">
          {(stats.avgVolume / 1000000).toFixed(2)}M
        </div>
      </div>

      {/* Volume Change Card */}
      <div className="bg-black border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${stats.volumeChange >= 0 ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
            <svg className={`w-4 h-4 ${stats.volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
            </svg>
          </div>
          <span className="text-sm text-white/80">Vol. Change</span>
        </div>
        <div className={`text-lg font-bold ${stats.volumeChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {stats.volumeChange}%
        </div>
      </div>

      {/* Day Range Card */}
      <div className="bg-black border border-white/10 rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-yellow-500/20 flex items-center justify-center">
            <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <span className="text-sm text-white/80">Day Range</span>
        </div>
        <div className="text-lg font-bold text-white">
          {stats.dayRange.range}
        </div>
      </div>
    </div>
  );
};

export default StockStatistics;