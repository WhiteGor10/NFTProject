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
    setIsConnected(false);
  }
}


export async function FindOwner(tokenId){ 
    if (window.ethereum) { 

      const contract = getContract();

      try { 
        //call the function ownerOf
        const address = await contract.ownerOf(tokenId); 
        try { 
          const price = await contract.priceOf(tokenId);
          const priceInEth = ethers.utils.formatEther(price);
          alert("Owner of id:"+ tokenId +" : "+ address+"\nPrice:"+priceInEth+"ETH");
        }
          catch (e) {
          alert("Owner of id:"+ tokenId +" : "+ address); 
        }
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
            const url = await contract.urlOf(tokenId); 
            // Open URL in new tab
            window.open(url, '_blank');
        } 
        catch (e) { 
            console.log("error", e); 
            alert("Error : " + e); 
        } 
    } 
}

export async function handleMint(url) {
    if (window.ethereum) { 
        const contract = getContract();
        const signer = contract.signer;
        
        try { 
            // First get the token ID
            const tokenId = await contract.AssignTokenId(); 
            
            // Then use it for minting
            await contract.mint(signer.getAddress(), tokenId, url);   
            
            alert("Created BNFT Token: " + tokenId+"+"+url); 
            
        } catch (e) { 
            console.log("error", e); 
            alert(url+"ERROR: BNFT Token not created: " + e); 
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
export async function UpdatePrice(tokenId, priceEth) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            //call the function List
            await contract.UpdatePrice( tokenId, ethers.utils.parseUnits(priceEth, "ether"));    
            alert("Listed NFT : "+ tokenId + ",New Price :" + priceEth + "ETH"); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: BNFT Token not Listed" + e); 
        } 
    }
}
export async function UnList(tokenId) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            //call the function List
            await contract.Revoke(tokenId);    
            alert("UnListed NFT : "+ tokenId); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: BNFT Token not Listed" + e); 
        } 
    }
}
export async function Burn(tokenId) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            //call the function List
            await contract.burn(tokenId);    
            alert("Burnt NFT : "+ tokenId); 
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

export async function StartAuction(tokenId, StartpriceEth) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            await contract.StartAuction( tokenId, ethers.utils.parseUnits(StartpriceEth, "ether"));    
            alert("Started Auction, NFT : "+ tokenId + ",Start Price :" + priceEth + "ETH"); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: Auction not started" + e); 
        } 
    }
}

export async function Bidding(tokenId, priceInEth) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            await contract.Bidding(tokenId, { value: ethers.utils.parseEther(priceInEth) }); 
            alert("Bided, NFT : "+ tokenId + ",Price :" + priceInEth + "ETH"); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: Bid fail" + e); 
        } 
    }
}

export async function EndAuction(tokenId) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            await contract.EndAuction(tokenId); 
            alert("Auction end"); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: End auction fail" + e); 
        } 
    }
}

export async function GetCurrentAuctionPrice(tokenId) {
    if (window.ethereum) { 
        const contract = getContract();
    try { 
            const price = await contract.GetCurrentAuctionPrice(tokenId); 
            alert("Current price : " + price); 
        } catch (e) { 
            console.log("error", e); 
            alert("ERROR: " + e); 
        } 
    }
}


export async function getTokenIDsBelongsTo(ownerAddress) {
    if (window.ethereum) {
        const contract = getContract();
        try {
            const tokenIDs = await contract.getTokenIDsBelongsTo(ownerAddress);
            return tokenIDs;
        } catch (e) {
            console.log("error", e);
            
            // Handle specific error messages from the contract
            if (e.message && e.message.includes("No NFT")) {
                alert("No NFTs found for this address");
            } else if (e.message && e.message.includes("Number of token not equal")) {
                alert("Error retrieving token IDs");
            } else {
                alert("Error: " + e.message);
            }
            
            return [];
        }
    } else {
        alert("Please install MetaMask");
        return [];
    }
}