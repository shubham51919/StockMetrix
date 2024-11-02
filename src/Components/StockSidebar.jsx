import React, { useState, useEffect, useMemo } from 'react';
import { DateRangePicker } from 'react-date-range';
import { debounce } from 'lodash';

const ITEMS_PER_PAGE = 20;

const StockSidebar = ({
    isOpen,
    setIsOpen,
    searchStock,
    setSearchStock,
    allData,
    handleSelect,
    isinNumber,
    setIsinNumber,
    selectedOption,
    state,
    setState,
    showDialog,
    toggleDialog
}) => {
    const [displayedItems, setDisplayedItems] = useState([]);
    const [page, setPage] = useState(1);

    // Create an index for faster searching
    const searchIndex = useMemo(() => {
        const index = new Map();
        allData.forEach((item, idx) => {
            const symbol = item.trading_symbol.toLowerCase();
            // Create index entries for each 2-letter combination
            for (let i = 0; i < symbol.length - 1; i++) {
                const key = symbol.slice(i, i + 2);
                if (!index.has(key)) {
                    index.set(key, new Set());
                }
                index.get(key).add(idx);
            }
        });
        return index;
    }, [allData]);

    // Optimized search function
    const getSearchResults = useMemo(() => {
        return debounce((searchTerm) => {
            if (!searchTerm) {
                setDisplayedItems(allData.slice(0, ITEMS_PER_PAGE));
                setPage(1);
                return;
            }

            const term = searchTerm.toLowerCase();
            let resultIndexes = new Set();

            // Get candidate indexes from the search index
            for (let i = 0; i < term.length - 1; i++) {
                const key = term.slice(i, i + 2);
                const candidates = searchIndex.get(key);
                if (candidates) {
                    if (resultIndexes.size === 0) {
                        resultIndexes = new Set(candidates);
                    } else {
                        resultIndexes = new Set(
                            [...resultIndexes].filter(idx => candidates.has(idx))
                        );
                    }
                }
            }

            // Final filtering with the full search term
            const results = [...resultIndexes]
                .map(idx => allData[idx])
                .filter(item =>
                    item.trading_symbol.toLowerCase().includes(term)
                );

            setDisplayedItems(results.slice(0, ITEMS_PER_PAGE));
            setPage(1);
        }, 300);
    }, [allData, searchIndex]);

    useEffect(() => {
        getSearchResults(searchStock);
        return () => getSearchResults.cancel();
    }, [searchStock, getSearchResults]);

    const loadMore = () => {
        const nextPage = page + 1;
        const start = (nextPage - 1) * ITEMS_PER_PAGE;
        const end = start + ITEMS_PER_PAGE;

        if (searchStock) {
            const term = searchStock.toLowerCase();
            const filtered = allData.filter(item =>
                item.trading_symbol.toLowerCase().includes(term)
            );
            setDisplayedItems(filtered.slice(0, end));
        } else {
            setDisplayedItems(allData.slice(0, end));
        }
        setPage(nextPage);
    };

    return (
        <div className="flex flex-col gap-4">
            {/* Explore Section */}
            <div className={`bg-black border border-white/10 rounded-lg p-4 ${isOpen ? 'fixed inset-0 z-50 bg-black/95' : ''
                }`}>
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between items-center cursor-pointer"
                        onClick={() => {
                            setIsOpen(!isOpen);
                            if (!isOpen) {
                                setDisplayedItems(allData.slice(0, ITEMS_PER_PAGE));
                                setPage(1);
                                setSearchStock('');
                            }
                        }}>
                        <div className="text-white/80 text-lg font-medium">Explore</div>
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors">
                            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                            </svg>
                        </div>
                    </div>
                    {isOpen && (
                        <div className="relative">
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                                type="text"
                                value={searchStock}
                                onChange={(e) => setSearchStock(e.target.value)}
                                placeholder="Search stocks..."
                            />
                        </div>
                    )}
                </div>
                {isOpen && (
                    <div className="mt-4 max-h-[60vh] overflow-auto">
                        {displayedItems.map((option, index) => (
                            <div
                                key={index}
                                className="px-4 py-3 hover:bg-white/5 cursor-pointer transition-colors text-white/80"
                                onClick={() => handleSelect(option)}
                            >
                                {option.trading_symbol}
                            </div>
                        ))}
                        {displayedItems.length >= ITEMS_PER_PAGE && (
                            <button
                                className="w-full px-4 py-3 text-blue-400 hover:bg-white/5 transition-colors text-center"
                                onClick={loadMore}
                            >
                                Show More
                            </button>
                        )}
                    </div>
                )}
            </div>

            {/* Rest of the sidebar components remain the same */}
            <div className="bg-black border border-white/10 rounded-lg p-4">
                <div className="flex justify-between items-center">
                    <div className="text-white/80 text-lg font-medium">My List</div>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors cursor-pointer">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="bg-black border border-white/10 rounded-lg p-4">
                <input
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                    onClick={() => setIsOpen(!isOpen)}
                    value={isinNumber}
                    onChange={(e) => setIsinNumber(e.target.value)}
                    placeholder="Enter ISIN number..."
                />
            </div>

            <div className="bg-black border border-white/10 rounded-lg p-4">
                <button
                    onClick={toggleDialog}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white hover:bg-white/10 transition-colors text-left"
                >
                    {`${state[0].startDate.toString().split(' ').slice(1, 4).join(' ')} - ${state[0].endDate.toString().split(' ').slice(1, 4).join(' ')}`}
                </button>
                {showDialog && (
                    <div className="absolute left-0 top-0 h-full mt-2 z-50 bg-black border border-white/10 rounded-lg p-2">
                        <DateRangePicker
                            onChange={item => setState([item.selection])}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            months={2}
                            ranges={state}
                            direction="horizontal"
                            className="rounded-lg overflow-hidden"
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default StockSidebar;