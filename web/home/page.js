"use client";
import { useEffect, useState } from "react";
import Link from 'next/link' 

import { List, connectAccount, GetTokenIDsBelongsTo ,Findurl} from "../utils.js";
export default function search() {

    const [account, setaccount] = useState([]); 
    const [isConnected, setIsConnected] = useState(false);
    const [tokenId, setTokenId] = useState(""); 
    const [priceEth, setPriceEth] = useState("");
    const [myTokenIDs, setMyTokenIDs] = useState([]);
    const [loading, setLoading] = useState(false);

    function OwnerOf(){
        FindOwner(tokenId);
    }
    function UrlOf(){
        Findurl(tokenId);
    }
    function ListNFT(){
        List(tokenId, priceEth);
    }
    function ConnectAccount() {
        connectAccount(setaccount, setIsConnected);
    }

    async function loadMyNFTs() {
        if (!account || account.length === 0) return;
        
        setLoading(true);
        try {
            const tokenIDs = await GetTokenIDsBelongsTo(account[0]);
            const formattedTokenIDs = tokenIDs.map(token => {
                return parseInt(token.toString(), 10);
            });
            setMyTokenIDs(formattedTokenIDs);

        } catch (error) {
            console.error("Error loading NFTs:", error);
            setMyTokenIDs([]);
        } finally {
            setLoading(false);
        }
    }

    //Run once Onopen
    useEffect(() => {
        ConnectAccount(setaccount, setIsConnected);
    }, []);

    // Load NFTs when account changes
    useEffect(() => {
        if (isConnected && account && account.length > 0) {
            loadMyNFTs();
        }
    }, [isConnected, account]);

    
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Enhanced Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-8">
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
            <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="flex gap-8">
                    {/* Enhanced Sidebar */}
                    <aside className="w-64">
                        <nav className="bg-white rounded-2xl shadow-sm border border-gray-200 p-4 space-y-2 sticky top-24">
                            {[
                                { href: "home", label: "Home", active: true},                               
                                { href: "create", label: "Create",},
                                { href: "list", label: "List" },
                                { href: "manage", label: "Manage"},
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
                                    <span className="text-2xl text-white">📤</span>
                                </div>
                                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                                    My NFTs
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    {isConnected ? "Your owned NFT Token IDs" : "Connect your wallet to view your NFTs"}
                                </p>
                            </div>

                            {/* My NFTs Content */}
                            <div className="max-w-2xl mx-auto">
                                {myTokenIDs.length === 0 ? (
                                    <div className="text-center py-12">
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <span className="text-3xl text-gray-400">🖼️</span>
                                        </div>
                                        <p className="text-gray-500 text-lg">No NFTs found in your wallet</p>
                                        <p className="text-gray-400 text-sm mt-2">Create or purchase NFTs to see them here</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="flex justify-between items-center mb-6">
                                            <h2 className="text-xl font-semibold text-gray-900">
                                                Your NFT Collection ({myTokenIDs.length})
                                            </h2>
                                        </div>
                                        
                                        <div className="grid grid-cols-3 gap-4">
                                            {myTokenIDs.map((tokenId) => (
                                                <div 
                                                    key={tokenId} 
                                                    className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6 text-center hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                                                >
                                                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                                                        <span className="text-white font-bold">{tokenId}</span>
                                                    </div>
                                                    <h3 className="font-semibold text-gray-900 mb-2">Token ID</h3>
                                                    <p className="text-2xl font-bold text-purple-600">#{tokenId}</p>
                                                    <div className="mt-4 flex gap-2">
                                                        <button 
                                                            onClick={() => Findurl(tokenId)}
                                                            className="flex-1 bg-purple-600 text-white py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
                                                        >
                                                            View
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}