"use client";
import { useEffect, useState } from "react";
import Link from 'next/link' 

import {handleMint, connectAccount,UpdatePrice, UnList,Burn,EndAuction} from "../utils.js";
export default function Search() {

    const [account, setaccount] = useState([]); 
    const [isConnected, setIsConnected] = useState(false);
    const [tokenId, setTokenId] = useState("");
    const [newPrice, setNewPrice] = useState("");


    function ConnectAccount() {
        connectAccount(setaccount, setIsConnected);
    }
    
    //Run once Onopen
    useEffect(() => {
        ConnectAccount(setaccount, setIsConnected);
    }, []);

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 sticky top-0 z-50">
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
                            flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ml-auto mr-4
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
                                { href: "create", label: "Create"},
                                { href: "list", label: "List"},
                                { href: "manage", label: "Manage", active: true },
                                { href: "search", label: "Search & Buy"},
                                { href: "bidding", label: "Bidding"}
                            ].map((item) => (
                                <Link 
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                                        item.active 
                                            ? "bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 text-purple-700 font-semibold" 
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span className="text-sm">{item.label}</span>
                                </Link>
                            ))}
                        </nav>
                    </aside>

                    {/* Main Content Card */}
                    <main className="flex-1">
                        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
                            {/* Header Section */}
                            <div className="text-center mb-12">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <span className="text-2xl text-white">⚙️</span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    Manage Your NFT
                                </h1>
                                <p className="text-gray-600 text-lg max-w-md mx-auto">
                                    Update price, unlist, or burn your NFTs
                                </p>
                            </div>

                            {/* Token ID Input */}
                            <div className="max-w-md mx-auto mb-8">
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

                            {/* Management Actions */}
                            <div className="max-w-2xl mx-auto space-y-6">
                                {/* Update Price Section */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        Update Price
                                    </h3>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            placeholder="New price (ETH)"
                                            value={newPrice}
                                            onChange={(e) => setNewPrice(e.target.value)}
                                            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                                        />
                                        <button
                                            onClick={() => UpdatePrice(tokenId, newPrice)}
                                            disabled={!tokenId || !newPrice}
                                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] min-w-[140px]"
                                        >
                                            Update Price
                                        </button>
                                    </div>
                                </div>
                                {/* End Bid Section */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        Finish Auction
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        <span className="font-semibold text-red-600">Warning:</span> This action is permanent and cannot be undone.
                                    </p>
                                    <button
                                        onClick={() => EndAuction(tokenId)}
                                        disabled={!tokenId}
                                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] w-full"
                                    >
                                        Finish Auction
                                    </button>
                                </div>

                                {/* Unlist Section */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        Unlist NFT
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        Remove your NFT from the marketplace. It will no longer be available for purchase.
                                    </p>
                                    <button
                                        onClick={() => UnList(tokenId)}
                                        disabled={!tokenId}
                                        className="bg-gradient-to-r from-orange-500 to-amber-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] w-full"
                                    >
                                        Unlist NFT
                                    </button>
                                </div>

                                {/* Burn Section */}
                                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        Burn NFT
                                    </h3>
                                    <p className="text-gray-600 mb-4 text-sm">
                                        <span className="font-semibold text-red-600">Warning:</span> This action is permanent and cannot be undone. Your NFT will be permanently removed from the blockchain.
                                    </p>
                                    <button
                                        onClick={() => Burn(tokenId)}
                                        disabled={!tokenId}
                                        className="bg-gradient-to-r from-red-500 to-pink-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] active:scale-[0.98] w-full"
                                    >
                                        Burn NFT
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