// SPDX-License-Identifier: MIT
// Compatible with OpenZeppelin Contracts ^5.5.0
pragma solidity ^0.8.27;

import "forge-std/Test.sol";
import {BasicNFT} from "../src/BasicNFT.sol";

contract BasicNFTTest is Test{
    BasicNFT public BNFT;
    address user = vm.addr(1);
    address user2 = vm.addr(2);
    function setUp() public{
        BNFT = new BasicNFT();

        vm.deal(user, 10 ether);
        console.log("UserAddress : ", user);
    }

    function testIfUserMint_Success()public{
        vm.startPrank(user);

        BNFT.mint(user, 1);

        console.log("Owner of token1 : " , BNFT.ownerOf(1));
        vm.stopPrank();
    }
    function testburn_Success()public{
        vm.startPrank(user);

        BNFT.mint(user, 1);

        console.log("Owner of token1 : " , BNFT.ownerOf(1));

        BNFT.burn(1);

        vm.stopPrank();
    }
    function testbruntokenNotyou_Fail() public{
        vm.startPrank(user);

        BNFT.mint(user, 1);
        vm.stopPrank();

        console.log("Owner of token1 : " , BNFT.ownerOf(1));
        vm.startPrank(user2);
        BNFT.burn(1);
        //BNFT.ownerOf(1);
        vm.stopPrank();
        
    }
    function testListAndBuy_Success() public{
        vm.startPrank(user2);

        BNFT.mint(user2, 1);
        console.log("Owner of token1 : " , BNFT.ownerOf(1));
        BNFT.List(1, 1000);
        vm.stopPrank();

        vm.startPrank(user);
        BNFT.Buy{value: 1000}(1);

        console.log("Owner of token1 : " , BNFT.ownerOf(1));
        vm.stopPrank();
    }

    function testUpdateListPrice_Success() public{
        vm.startPrank(user2);

        BNFT.mint(user2, 3);
        console.log("Owner of token3 : " , BNFT.ownerOf(3));
        BNFT.List(3, 1000);
        BNFT.UpdatePrice(3,900);
        vm.stopPrank();

        vm.startPrank(user);
        BNFT.Buy{value: 900}(3);

        console.log("Owner of token3 : " , BNFT.ownerOf(3));
        vm.stopPrank();
    }

    function testRevokeNFT_Fail() public{
        vm.startPrank(user2);

        BNFT.mint(user2, 3);
        console.log("Owner of token3 : " , BNFT.ownerOf(3));
        BNFT.List(3, 1000);
        BNFT.Revoke(3);
        vm.stopPrank();

        vm.startPrank(user);
        BNFT.Buy{value: 900}(3);

        console.log("Owner of token3 : " , BNFT.ownerOf(3));
        vm.stopPrank();
    }
}