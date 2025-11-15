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
  const handleCreateNFT = () => { 
    handleMint(); 
  }; 
  const handleFindOwner = () => { 
    FindOwner(); 
  }; 

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            NFT Creation
          </h1>
          <a
            onClick={connectAccount}
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
            ConnectWallet
          </a>
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
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            onClick={handleCreateNFT}
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
          <a
            onClick={handleFindOwner}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            FindOwner
          </a>
          <a
            onClick={Findurl}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            FindUrl
          </a>
          <a
            onClick={List}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            List NFT
          </a>
          <a
            onClick={Buy}
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            target="_blank"
            rel="noopener noreferrer"
          >
            Buy NFT
          </a>
        </div>
      </main>
    </div>
  );
}
