<h1>Please read NFTProject Report first</h1>

Step to open the website
<br>
expect installed : Foundry 0.3.0, Nextjs(Need all dependences installed under the /web), Ethers.js 5.7.0
1. code: anvil
2. copy private keys and address to /contracts/.env
3. go under contract/
4. code: source .env
5. code: forge create --broadcast --rpc-url http://127.0.0.1:8545 --private-key ${user1private_key} src/BasicNFT.sol:BasicNFT
6. copy the "deployed to" address to /web/app/utils.js : ContractAddress
7. copy /contracts/out/BasicNFT.sol/BasicNFT.json to /web
8. go under web/
9. code: npm run dev
10. connect to the network in metamask
