"use client"; 
import Image from "next/image"; 
import { useEffect,useState } from "react"; 
import Link from 'next/link' 

import { FindOwner, Findurl, handleMint, List, Buy,connectAccount} from "./utils.js";
export default function Home() { 


  const [tokenId, setTokenId] = useState(""); 
  const [account, setaccount] = useState([]); 
  const [isConnected, setIsConnected] = useState(false);

  function Mint(){
    handleMint(tokenId,"url");
  }
  function OwnerOf(){
    FindOwner(tokenId);
  }
  function UrlOf(){
    Findurl(tokenId);
  }
  function ListNFT(){
    List(tokenId, "1");
  }
  function BuyNFT(){
    Buy(tokenId);
  }


  /*function ConnectAccount() {
    connectAccount(setaccount, setIsConnected);
  }

  //Run once Onopen
    useEffect(() => {
    ConnectAccount(setaccount, setIsConnected);
  }, []);*/



  return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
              <div className="mx-auto px-8">
                  <div className="flex justify-between items-center h-16">   
                      <div className="flex items-center space-x-3">
                          <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                              NFT Marketplace
                          </span>
                      </div>
                  </div>
              </div>
            </header>

           {/* Main Layout */}
              <div className="mx-auto lg:px-8">
                  <div className="flex flex-col items-center justify-center min-h-[80vh] text-center">
                      <h1 className="text-4xl font-bold text-gray-900 mb-8">
                          Approach the new age of digital ownership and creativity with our NFT marketplace
                      </h1>
                      
                      <Link 
                          href="create"// go to create page
                          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2.5 rounded-full transition-all duration-200"
                      >
                          Get Started
                      </Link>
                  </div>
              </div>
                          
        </div>
    );
}