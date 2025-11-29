"use client";
import { useEffect, useState } from "react";
import Link from 'next/link' 

import { FindOwner, Findurl,List, connectAccount,Buy} from "../utils.js";
export default function search() {

    const [account, setaccount] = useState([]); 
    const [isConnected, setIsConnected] = useState(false);
    const [tokenId, setTokenId] = useState(""); 
    const [priceEth, setPriceEth] = useState(""); // Added state for price

    function OwnerOf(){
        FindOwner(tokenId);
    }
    function View(){
        Findurl(tokenId);
    }
    function ListNFT(){
        List(tokenId, priceEth);
    }
    function BuyNFT(){
        Buy(tokenId);
    }
    function ConnectAccount() {
        connectAccount(setaccount, setIsConnected);
    }
    //Run once Onopen
    useEffect(() => {
        ConnectAccount(setaccount, setIsConnected);
    }, []);

    
        return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Enhanced Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                     {/* flex col container */}
                    <div className="flex justify-between items-center h-16">   
                        {/* Logo/Brand */}
                        <div className="flex items-center space-x-3">
                            <Link 
                                href="../"
                                className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
                            >
                                NFT Marketplace
                            </Link>
                        </div>

                        {/* Connection Status */}
                        <div className={`
                            flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ml-auto mr-4 ml-auto mr-4 ml-auto mr-4
                            ${isConnected 
                                ? "bg-green-50 border-green-200 text-green-700 shadow-sm" 
                                : "bg-gray-50 border-gray-200 text-gray-500"
                            }
                        `}>
                            <div className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-gray-400"}`}></div>
                            <span className="text-sm font-medium">
                                {isConnected ? "Wallet Connected" : "Not Connected"}
                            </span>
                        </div>

                        {/* Connect Button */}
                        <button 
                            onClick={ConnectAccount}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:shadow-lg transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Connect Wallet
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Layout */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex gap-8">
                    {/* Enhanced Sidebar */}
                    <aside className="w-64">
                        <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-2 sticky top-24">
                            {[
                                { href: "home", label: "Home"},             
                                { href: "create", label: "Create",},
                                { href: "list", label: "List"},
                                { href: "manage", label: "Manage"},
                                { href: "search", label: "Search & Buy", active: true },
                                { href: "bidding", label: "Bidding"}
                            ].map((item) => (
                                <Link 
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl ${
                                        item.active 
                                            ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 font-semibold" 
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content*/}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            {/* Header Section */}
                            <div className="text-center mb-12">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 ">
                                    <span className="text-2xl text-white">🔍</span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Search NFT by tokenID
                                </h1>
                            </div>

                            {/* Form Section */}
                            <div className="max-w-md mx-auto space-y-6">
                                {/* Token ID Input */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        NFT Token ID
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="e.g., 123"
                                        value={tokenId}
                                        onChange={(e) => setTokenId(e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 hover:bg-white"
                                    />
                                </div>

                                {/* Buttons Row */}
                                <div className="flex flex-col gap-4">
                                    {/* First Row */}
                                    <div className="flex gap-4">
                                        {/* Search Button */}
                                        <button
                                            onClick={OwnerOf}
                                            disabled={!tokenId}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            Search
                                        </button>
                                        
                                        {/* Search URL Button */}
                                        <button
                                            onClick={View}
                                            disabled={!tokenId}
                                            className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98]"
                                        >
                                            View
                                        </button>
                                    </div>
                                    
                                    {/* Buy Button */}
                                    <button
                                        onClick={BuyNFT}
                                        disabled={!tokenId}
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-2"
                                    >
                                        Buy
                                    </button>
                                </div>
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}