import Web3 from 'web3'
//const web3 = new Web3("https://nd-568-863-669.p2pify.com/2dfeb3634054cc14d8a64a528431a652")
//export const web3 = new Web3("https://mainnet.infura.io/v3/92d53cee52834368b0fabb42fa1b5570") // ether mainnet
export let web3 = new Web3("https://data-seed-prebsc-2-s3.binance.org:8545") //bsc testnet 

export const genWeb3Route=(rpc)=>{
    const newWeb3 = new Web3(rpc)
    web3=newWeb3
}