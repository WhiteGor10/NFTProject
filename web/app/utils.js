"use client";
import { ethers } from "ethers";
import BNFT from "../BasicNFT.json";

const ContractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

//init contract
function getContract() {
  if (!window.ethereum) throw new Error("Ethereum provider not found");
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  return new ethers.Contract(ContractAddress, BNFT.abi, signer);
}


export async function connectAccount(setaccount, setIsConnected) {
  if (!window.ethereum) {
    console.error("Ethereum provider not found.");
    setIsConnected(false);
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setaccount(accounts);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const address = await signer.getAddress();
    setIsConnected(Boolean(address));
  } catch (e) {
    console.error("Failed to connect:", e?.message || e);
    setIsConnected(false);
  }
}


export async function FindOwner(tokenId){ 
    if (window.ethereum) { 

      const contract = getContract();

      try { 
        //call the function ownerOf
        const address = await contract.ownerOf(tokenId); 
        alert("Owner of id:"+ tokenId +" : "+ address); 
      } 
      catch (e) { 
        console.log("error", e); 
        alert("Error : " + e); 
      } 
    } 
}

export async function Findurl(tokenId){ 
    if (window.ethereum) { 

        const contract = getContract();

        try { 
            //call the function 
            const url = await contract.urlOf(tokenId); 
            alert("Url of id:"+ tokenId +" : "+ url); 
        } 
        catch (e) { 
            console.log("error", e); 
            alert("Error : " + e); 
        } 
    } 
}

export async function handleMint(tokenId, url) {
    if (window.ethereum) { 
        const contract = getContract();
        const signer = contract.signer;
        try { 
            //call the function mint
            await contract.mint(signer.getAddress(), tokenId, url);   
            alert("Created BNFT Token : "+ tokenId); 
            
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: BNFT Token not created : " +e); 
        } 
    }
  
}

export async function List(tokenId, priceEth) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            //call the function List
            await contract.List( tokenId, ethers.utils.parseUnits(priceEth, "ether"));    
            alert("Listed NFT : "+ tokenId + ",Price :" + priceEth + "ETH"); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: BNFT Token not Listed" + e); 
        } 
    }

  
}

export async function Buy(tokenId) {
    if (window.ethereum) { 
      //initial smart contract 
      const contract = getContract();
      try { 

        //Get price, then call the function Buy
        const price = await contract.priceOf(tokenId);
        const priceInEth = ethers.utils.formatEther(price);
        await contract.Buy(tokenId, { value: ethers.utils.parseEther(priceInEth) });
        alert("Buyed NFT : "+ tokenId ); 
        
      } catch (e) { 
        console.log("error", e); 
        alert("ERROR: BNFT Token not Bought : "+e); 
      } 
    } 
}

