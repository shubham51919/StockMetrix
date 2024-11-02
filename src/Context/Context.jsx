import axios from 'axios';
import React, { createContext, useState } from 'react';
import { addDays } from 'date-fns';

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [data, setData] = useState([]);
    const [duration, setDuration] = useState('day');
    const [isinNumber, setIsinNumber] = useState('INE245A01021');
    const [chartType, setChartType] = useState('candlestick');
    const [state, setState] = useState(getDateRange());

    function getDateRange() {
        const today = new Date();
        const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());

        // Start date of last month
        const startDate = new Date(lastMonth.getFullYear(), lastMonth.getMonth(), 1);
        // End date of today
        const endDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

        // Return the date range in the desired format
        return [{
            startDate: startDate,
            endDate: endDate,
            key: 'selection'
        }];
    }

    const getHistoricalData = async () => {
        const dateObjectStart = new Date(state[0].startDate);
        const dateObjectEnd = new Date(state[0].endDate);
        const yearStart = dateObjectStart.getFullYear();
        const monthStart = ('0' + (dateObjectStart.getMonth() + 1)).slice(-2); // Months are zero-based
        const dayStart = ('0' + dateObjectStart.getDate()).slice(-2);
        const formattedDateStart = `${yearStart}-${monthStart}-${dayStart}`;
        const yearEnd = dateObjectEnd.getFullYear();
        const monthEnd = ('0' + (dateObjectEnd.getMonth() + 1)).slice(-2); // Months are zero-based
        const dayEnd = ('0' + dateObjectEnd.getDate()).slice(-2);
        const formattedDateEnd = `${yearEnd}-${monthEnd}-${dayEnd}`;
        let config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://api.upstox.com/v2/historical-candle/NSE_EQ%7C${isinNumber}/${duration}/${formattedDateEnd}/${formattedDateStart}`,
        };

        try {
            const response = await axios.request(config);
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    return (
        <Context.Provider value={{
            data,
            setData,
            getHistoricalData,
            duration,
            setDuration,
            state,
            setState,
            setIsinNumber,
            isinNumber,
            chartType,
            setChartType,
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };
