"use client";
import { useEffect, useState } from "react";
import Link from 'next/link' 

import { FindOwner, Findurl, connectAccount} from "../utils.js";
export default function search() {

    const [account, setaccount] = useState([]); 
    const [isConnected, setIsConnected] = useState(false);
    const [tokenId, setTokenId] = useState(""); 

    function OwnerOf(){
        FindOwner(tokenId);
    }
    function UrlOf(){
        Findurl(tokenId);
    }
    function ConnectAccount() {
    connectAccount(setaccount, setIsConnected);
    }
    //Run once Onopen
    useEffect(() => {
        ConnectAccount(setaccount, setIsConnected);
    }, []);

    
    return (
        <div className="flex flex-col min-h-screen w-full bg-white">
        {/* Topbar - Now properly at the top */}
        <div className="h-16 bg-white border-b border-gray-400 flex items-center justify-between px-6">
        <div className="text-xl font-bold text-gray-800">NFT Marketplace</div>
            <div className={`
                flex items-center justify-center 
                px-4 py-2 rounded-md border 
                ${isConnected 
                ? "bg-green-50 border-green-200 text-green-700" 
                : "bg-gray-50 border-gray-200 text-gray-500"
                }
                font-medium text-sm
                select-none cursor-default
            `}>
                {isConnected ? (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Connected</span>
                </div>
                ) : (
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <span>Not Connected</span>
                </div>
                )}
            </div>
        <a 
            onClick={ConnectAccount}
            className="flex h-10 items-center justify-center 
            rounded-full bg-black text-white px-6 transition-colors 
            hover:bg-gray-800 cursor-pointer"
        >
        Connect Account
        </a>
        </div>

    {/* Main Content Area */}
    <div className="flex flex-1 bg-white"> {/* flex-1 to take remaining space */}
        {/* Sidebar */}
        <div className="w-48 bg-white flex flex-col items-center justify-start border-r border-gray-300 py-4 space-y-4">
        <Link href="../" className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
            Home
        </Link>
        <Link href="search" className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
            Search NFT
        </Link>
        
        </div>
        
        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
            Search NFT by tokenID
        </h1>
        <input
                type="text"
                placeholder="Enter NFT ID"
                value={tokenId}
                onChange={(e) => setTokenId(e.target.value)}
                style={{
                padding: "0.5rem",
                marginRight: "1rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                }}
            />
            
            <div className="flex flex-row gap-4 mt-4">
                <a onClick={OwnerOf} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
                Find Owner
                </a>
                <a onClick={UrlOf} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
                    Find URL
                </a>
            </div>
        
        </div>
    </div>
    </div>
    );
}
