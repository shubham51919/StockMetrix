import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../Context/Context';
import newdata from '../Data/NSE.json'
import Area from '../assets/svgs/Area Chart.svg'
import Candlestick from '../assets/svgs/Candlestick Chart.svg'
import Combo from '../assets/svgs/Combo Chart.svg'
import Enlarge from '../assets/svgs/Enlarge.svg'
import Line from '../assets/svgs/Line Chart.svg'
import Reboot from '../assets/svgs/Reboot.svg'
import StockStatistics from '../Components/StockStatistics';
import StockSidebar from '../Components/StockSidebar';
import StockOverviewPanel from '../Components/StockOverviewPanel';
import './Home.css'

const Home = () => {
    const { data, setData, duration, setDuration, getHistoricalData, state, setState, isinNumber, setIsinNumber, chartType, setChartType } = useContext(Context);
    const [showDialog, setShowDialog] = useState(false);
    const [selectedOption, setSelectedOption] = useState('TATA POWER');
    const [isOpen, setIsOpen] = useState(false);
    const [allData, setAllData] = useState([]);
    const [chart, setChart] = useState('line')
    const [expandedChart, setExpandedChart] = useState(false)
    const [searchStock, setSearchStock] = useState('')

    useEffect(() => {
        if (searchStock.length > 0) {
            const newFilteredData = newdata.filter(entry =>
                entry.trading_symbol.toLowerCase().includes(searchStock.toLowerCase())
            );
            console.log(newFilteredData, 'filtered')
            setAllData(newFilteredData);
        }
        else {
            setAllData(newdata)
        }
    }, [searchStock])

    const handleSelect = (option) => {
        setSelectedOption(option.trading_symbol);
        if (option.isin) {
            setIsinNumber(option.isin)
        }
        else {
            setIsinNumber(option.asset_key.split('|')[1])
        }
        setIsOpen(false);
    };

    const toggleDialog = () => {
        setShowDialog(!showDialog);
    };

    const fetchData = async () => {
        try {
            const data = await getHistoricalData();
            setData(data?.data?.candles);
            console.log(data?.data?.candles);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handlePlotClick = () => {
        fetchData();
    }

    useEffect(() => {
        fetchData();
    }, [duration, isinNumber, state])

    return (
        <div className='home bg-black h-full w-full p-8 '>
            {/* <Navbar /> */}
            <div className=" flex justify-between h-full w-full">
                <StockOverviewPanel
                    selectedOption={selectedOption}
                    isinNumber={isinNumber}
                    data={data}
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
                <div className="w-[30%] flex flex-col gap-4 justify-between">
                    <StockStatistics data={data} />
                    <StockSidebar
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                        searchStock={searchStock}
                        setSearchStock={setSearchStock}
                        allData={allData}
                        handleSelect={handleSelect}
                        isinNumber={isinNumber}
                        setIsinNumber={setIsinNumber}
                        selectedOption={selectedOption}
                        state={state}
                        setState={setState}
                        showDialog={showDialog}
                        toggleDialog={toggleDialog}
                    />
                    {/* <div className=" flex flex-col gap-4 items-center">
                        <div className="text-[20px] w-[90%] text-center text-white">
                            Get realtime market data & place order
                        </div>
                        <Link to={`https://api.upstox.com/v2/login/authorization/dialog?response_type=code&client_id=30e44b84-101e-41af-a6f3-75834a243ead&redirect_uri=https://stockproject1.azurewebsites.net/real`}>

                            <div className="bg-main w-[90%] bg-[rgb(0,0,0,0.8)] cursor-pointer flex items-center justify-center gap-2" ><img src={upstox} className=" " height="40px" width="40px" alt="" /> Login with Upstox</div>
                        </Link>
                    </div> */}

                </div>
            </div>
        </div>
    )
}

export default Home