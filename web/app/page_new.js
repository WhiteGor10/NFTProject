"use client"; 
import Image from "next/image"; 
import { useState } from "react"; 
import { ethers } from "ethers"; 
import BNFT from "../BasicNFT.json"; 
export default function Home() { 

  const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; 
  const [tokenId, setTokenId] = useState(""); 
  const [account, setaccount] = useState([]); 


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
        console.error("Failed to connect to accounts:", e); 
      } 
    } 


  return (
    <div className="flex min-h-screen min-w-screen bg-white ">
    {/* Sidebar */}
    <div className="w-[10%] bg-white text-gray flex flex-col items-center justify-start border-r border-gray-300">
      <h1>Sidebar</h1>
    </div>

    
    <div className="w-[90%] bg-white">
      {/* Content Topbar*/}
      <div className="h-[10%] bg-white border-b border-gray-400 flex items-center justify-center">
        <a 
          onClick={connectAccount}
          className="flex h-12 w-full items-center justify-center 
             rounded-full border border-solid border-black 
             bg-black text-white px-5 transition-colors 
             hover:bg-gray-700 hover:text-white 
             md:w-[158px]
             ml-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
         ConnectAccount
        </a>
      </div>
      {/* Content */}
      <div className="flex flex-col h-[90%] bg-white text-center">
        <h1 className="text-xl md:text-3xl lg:text-5xl" >Create your own NFT !</h1>
        <p>Approach the new age of NFT</p>
      </div>
      
    </div>
  </div>

  );
}
