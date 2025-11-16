"use client"; 
import Image from "next/image"; 
import { useState } from "react"; 
import { ethers } from "ethers"; 
import BNFT from "../BasicNFT.json"; 
export default function Home() { 

  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  const [tokenId, setTokenId] = useState(""); 
  const [account, setaccount] = useState([]); 
  const [isConnected, setIsConnected] = useState(false);


  async function FindOwner(){ 
    if (window.ethereum) { 
      //initial smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract( ContractAddress, BNFT.abi, signer ); 

      try { 
        //call the function ownerOf
        const address = await contract.ownerOf(tokenId); 
        alert("Owner of id:"+ tokenId +" : "+ address); 
      } 
      catch (e) { 
        console.log("error", e); 
        alert("Error"); 
      } 
     } 
    }
    async function Findurl(){ 
    if (window.ethereum) { 
      //initial smart contract
      const provider = new ethers.providers.Web3Provider(window.ethereum); 
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract( ContractAddress, BNFT.abi, signer ); 

      try { 
        //call the function 
        const url = await contract.urlOf(tokenId); 
        alert("Url of id:"+ tokenId +" : "+ url); 
      } 
      catch (e) { 
        console.log("error", e); 
        alert("Error"); 
      } 
     } 
    }
  async function handleMint() 
  { 
    if (window.ethereum) { 
      //initial smart contract 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract( ContractAddress, BNFT.abi, signer ); 

      try { 

        //call the function mint
        await contract.mint(signer.getAddress(), tokenId, "url");   //should input url to replace "url"
        alert("Created BNFT Token : "+ tokenId); 
        
      } catch (e) { 
        console.log("error", e); 
        alert("ERROR: BNFT Token not created, it may be minted already"); 
      } 
    } 
  } 
  async function List() {
    if (window.ethereum) { 
      //initial smart contract 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract( ContractAddress, BNFT.abi, signer ); 

      try { 

        //call the function List
        await contract.List( tokenId, 100);     //the 100 is price, just for testing
        alert("Listed NFT : "+ tokenId + ",Price :" + "100 wei"); 
        
      } catch (e) { 
        console.log("error", e); 
        alert("ERROR: BNFT Token not Listed, it may be listed already"); 
      } 
    } 
  }
  async function Buy() {
    if (window.ethereum) { 
      //initial smart contract 
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner(); 
      const contract = new ethers.Contract( ContractAddress, BNFT.abi, signer ); 

      try { 

        //call the function Buy
        //the 100 is price, just for testing
        await contract.Buy( tokenId ,{value: "100"});    
        alert("Buyed NFT : "+ tokenId ); 
        
      } catch (e) { 
        console.log("error", e); 
        alert("ERROR: BNFT Token not Bought, it may not be listed"); 
      } 
    } 
  }
  async function connectAccount() { 
    
    try { 

      if (window.ethereum) {
        const accounts = await window.ethereum.request({ 
          method: "eth_requestAccounts", }); 
          setaccount(accounts); 

        } else {
          console.error("Ethereum provider not found."); 
        } 
      } catch (e) { 
        console.error("Failed to connect to accounts:"); 
      } 
      if (window.ethereum) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        
        try {
          const address = await signer.getAddress();
          if (address) {
            setIsConnected(true);
            //setAccount(address);
          } else {
            setIsConnected(false);
            //setAccount("");
          }
        } catch (error) {
          setIsConnected(false);
          //setAccount("");
        }
      } else {
        setIsConnected(false);
        //setAccount("");
      }
    } 


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
      onClick={connectAccount}
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
      <a
            onClick={handleMint}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            CreateNFT
          </a>
      <a onClick={FindOwner} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
        Find Owner
      </a>
      <a onClick={Findurl} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
        Find URL
      </a>
      <a onClick={List} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
        List NFT
      </a>
      <a onClick={Buy} className="flex h-12 w-40 items-center justify-center rounded-lg border border-gray-300 px-4 transition-colors hover:bg-gray-100 cursor-pointer text-sm">
        Buy NFT
      </a>
    </div>
    
    {/* Content Area */}
    <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
      
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-gray-900">
        Create your own NFT!
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
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl">
        Approach the new age of digital ownership and creativity with our NFT marketplace
      </p>
    </div>
  </div>
</div>
  );
}
