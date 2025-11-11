Step to use this
expect installed : Foundry, Nextjs, Ethers.js 5.7.0 (may not needed)
1. code: anvil
2. copy private keys and address to /contracts/.env
3. go under contract/
4. code: source .env
5. code: forge create --broadcast --rpc-url http://127.0.0.1:8545 --private-key ${user1private_key} src/BasicNFT.sol:BasicNFT
6. copy the "deployed to" address to contracts/.env and /web/app/page.js : ContractAddress
7. copy /contracts/out/BasicNFT.sol/BasicNFT.json to /web
8. go under web/
9. code: npm run dev
10. connect to the network in metamask
