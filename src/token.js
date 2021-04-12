const Web3 = require('web3')
const BigNumber = require('bignumber.js')
var Tx = require('ethereumjs-tx').Transaction

const web3 = new Web3('https://ropsten.infura.io/v3/a49a1a9da01f463fa694029c6c980e46') // Your Infura Endpoint here 



const account1 = '0x598A060e4a8Ebe1877f4B21a692A2095d6A665bD' // Your account address 1


// put in your private keys here (from metamask)
const privateKey1 = Buffer.from('9f423fae885ada50777fcb1321282898c9eca455b5d3e05b4d8281e252c385d7', 'hex') // Your account PKey 1

// - use your deployed contract address here!
const contractAddress = '0x67e932b1a2dc05447d7424eada36f8cdf778ad34'

//enter the contract ABI which you get from Remix
let contractABI = [
  {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      },
      {
        "name": "data",
        "type": "bytes"
      }
    ],
    "name": "approveAndCall",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferAnyERC20Token",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "from",
        "type": "address"
      },
      {
        "name": "to",
        "type": "address"
      },
      {
        "name": "tokens",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "payable": true,
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "_totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "tokenOwner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "uint256"
      },
      {
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "safeAdd",
    "outputs": [
      {
        "name": "c",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "uint256"
      },
      {
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "safeDiv",
    "outputs": [
      {
        "name": "c",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "uint256"
      },
      {
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "safeMul",
    "outputs": [
      {
        "name": "c",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "a",
        "type": "uint256"
      },
      {
        "name": "b",
        "type": "uint256"
      }
    ],
    "name": "safeSub",
    "outputs": [
      {
        "name": "c",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
]
const contract = new web3.eth.Contract(contractABI, contractAddress)


const getTransactionCount = async(account) => {
  return await web3.eth.getTransactionCount(account)
}

const sendTransaction = async(raw) => {
  return await web3.eth.sendSignedTransaction(raw)
}

const transferFunds = async(account1, account2, amount) => {

  let txCount = await getTransactionCount(account1)
  amount= new BigNumber(amount)
  console.log("txCount returned: " + txCount)
  console.log('amount', amount)
  console.log('account2', account2)
  
  const txObject = {
    nonce:    web3.utils.toHex(txCount),
    gasLimit: web3.utils.toHex(100000), // uses about 36,000 gas 
    gasPrice: web3.utils.toHex(web3.utils.toWei('30', 'gwei')),
    to: contractAddress,
    data: contract.methods.transfer(account2.trim(), amount).encodeABI()
  }

  const tx = new Tx(txObject, {chain:'ropsten', hardfork: 'petersburg'})

  tx.sign(privateKey1)

  const serializedTx = tx.serialize()
  const raw = '0x' + serializedTx.toString('hex')

  console.log("raw hex transaction: " + raw)

  console.log("about to send transaction")

  let minedTransaction = await sendTransaction(raw)
  console.log("transaction hash returned: " + minedTransaction.transactionHash)

  return `txHash is: ${minedTransaction.transactionHash}`
}

//get  balance of the account
const getBalanceOfTheAccount = async(account) => {
  let balanceOf = await contract.methods.balanceOf(account).call()
  // return balance
  return balanceOf
}

const start = async(array) => {
  validval = await getBalanceOfTheAccount(account1)
  console.log('Balance : ', validval)
  val= splitpercentage(validval)// calculating 5% of the account
  console.log('5% : ',val)
  for (i=0;i<array.length;i++ ) {
        if(array[i]) {
            console.log('loop incoming', array[i])
            await transferFunds(account1, array[i], val)
            console.log('transaction done')
        }      
        
  }

}
function splitpercentage(val) {
    console.log(typeof val )
    console.log('val', val)
   
    // bigval = new BigNumber(val)
    console.log('big val', val)
    // return bigval.multipliedBy(0.05)

    // return bigval * 0.05
    return val * 0.05
}

module.exports = {  getBalanceOfTheAccount, start }
