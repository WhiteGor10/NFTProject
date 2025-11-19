// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;


contract BasicNFT{
    string public name;

    string public symbol;

    mapping(uint => address) private owners;

    mapping(uint => string) private urls;

    mapping(address => uint) private NumberOfToken;

    //for market

    mapping(uint => address) private Approval;

    struct Listing {
        address seller;
        uint256 price;
    }

    //Token listing on market
    mapping(uint => Listing) public listings;

    

    uint maxNum = 1000;
    constructor(){
        name = "BasicNFT";
        symbol = "BNFT";
    }

    function _baseURI() internal pure returns (string memory) {
        return "";
    }


    //Mint a new token
    //need input address of owner, a unique tokenId and url to metadata of the NFT
    function mint(address to, uint tokenId, string memory url)public {
        require(tokenId <= maxNum , "TokenId out of range");
        require(to != address(0), "mint to zero address");
        require(owners[tokenId] == address(0), "token already minted");

        urls[tokenId] = url;
        owners[tokenId] = to;
        NumberOfToken[to] += 1; 
    }

    //burn a token
    function burn(uint tokenId)public {
        require(tokenId <= maxNum , "TokenId out of range");
        require(msg.sender == ownerOf(tokenId), "not owner of token");
        delete owners[tokenId];
        delete urls[tokenId];
        NumberOfToken[msg.sender] -= 1; 
    }

    function ownerOf(uint tokenId)public view returns(address) {
        require(tokenId <= maxNum, "TokenId out of range");
        require(owners[tokenId] != address(0), "token not minted");
        return owners[tokenId];
    }

    function urlOf(uint tokenId)public view returns(string memory){
        require(tokenId <= maxNum, "TokenId out of range");
        require(bytes(urls[tokenId]).length != 0, "token not minted");
        return urls[tokenId];
    }

    function priceOf(uint tokenId)public view returns(uint){
        require(tokenId <= maxNum, "TokenId out of range");
        require(listings[tokenId].seller != address(0), "NFT Not Listed");
        return listings[tokenId].price;
    }

    function AssignTokenId()public view returns (uint){
        for(uint i = 1; i <= maxNum ; i++)
        {
            if(owners[i] == address(0))
            {
                return i;
            }
        }
        require(false,"No more NFT token! ");
        return 0;
    }

    function Approve(address to, uint tokenId)private{
        require(tokenId <= maxNum, "TokenId out of range");
        require(msg.sender == ownerOf(tokenId),  "not the owner of token");
        Approval[tokenId] = to;

    }

    function IsApproved(address target, uint tokenId)public view returns(bool){
        require(tokenId <= maxNum, "TokenId out of range");
        return target == Approval[tokenId];
    }

    function TransferBNFT(address from, address to, uint tokenId)public{
        require(tokenId <= maxNum, "TokenId out of range");
        require(ownerOf(tokenId) == from , "not the owner of token");
        require(msg.sender == ownerOf(tokenId) || IsApproved(msg.sender, tokenId), "msg.sender not owner and not approved");
        NumberOfToken[ownerOf(tokenId)] -= 1; 
        owners[tokenId] = to;
        NumberOfToken[to] += 1; 
        delete Approval[tokenId];
    }

    //List a NFT on market, allowing other users to buy
    //Notice that price is in Wei
    function List(uint tokenId, uint price)public {
        require(tokenId <= maxNum, "TokenId out of range");
        require(msg.sender == ownerOf(tokenId),  "not the owner of token");
        require(listings[tokenId].seller == address(0), "Already Listed");

        listings[tokenId] = Listing(msg.sender,price);
        Approve(address(this), tokenId);
    }

    //Buy a specific NFT by tokenId
    function Buy(uint tokenId)public payable{
        require(tokenId <= maxNum, "TokenId out of range");
        require(msg.sender != ownerOf(tokenId),  "Is the owner of token");
        Listing memory item = listings[tokenId];
        require(item.seller != address(0), "NFT not listed");
        require(msg.value == item.price, "price not match");

        //Send ETH
        (bool sent, ) = payable(item.seller).call{value: msg.value}("");
        require(sent, "ETH transfer failed");

        //Send BNFT
        this.TransferBNFT(item.seller, msg.sender, tokenId);

        listings[tokenId].seller = address(0);
        delete listings[tokenId];
    }

    //Change price of listed NFT
    function UpdatePrice(uint tokenId, uint newPrice)public {
        require(tokenId <= maxNum, "TokenId out of range");
        require(msg.sender == ownerOf(tokenId),  "not the owner of token");

        listings[tokenId] = Listing(msg.sender,newPrice);
    }

    //Unlist a listed NFT
    function Revoke(uint tokenId)public {
        require(tokenId <= maxNum, "TokenId out of range");
        require(msg.sender == ownerOf(tokenId),  "not the owner of token");

        delete listings[tokenId];
        delete Approval[tokenId];
    }

    function GetTokenIDsBelongsTo(address owner)public view returns (uint[] memory){
        uint len = NumberOfToken[owner];
        uint[] memory tokenIDs = new uint[](len);
        uint j = 0;
        if(len == 0){
            require(false, "No NFT");
            return tokenIDs;
        }
        for(uint i = 1; i <= maxNum;i++){
            if(owners[i] == owner){
                tokenIDs[j] = i;
                j++;
                if(j>= len){
                    break;
                }
            }
        }
        require(j == len, "ERROR : Number of token not equal owner of");
        return tokenIDs;
    }
}
