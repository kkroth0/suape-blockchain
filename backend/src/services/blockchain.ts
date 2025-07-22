// Serviço de integração blockchain:
// - Sempre envia o hash para a blockchain Go (POC local)
// - Opcionalmente envia para Ethereum (se ETH_ENABLED=true e variáveis definidas)
// - Simples, sem dependências desnecessárias
import axios from 'axios';
import Web3 from 'web3';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const GO_BLOCKCHAIN_URL = process.env.GO_BLOCKCHAIN_URL || 'http://localhost:8080/mine';
const ETH_ENABLED = process.env.ETH_ENABLED === 'true';

let web3: Web3 | null = null;
let contract: any = null;
if (ETH_ENABLED) {
  const INFURA_URL = process.env.INFURA_URL as string;
  const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS as string;
  const abiPath = path.join(__dirname, '../../contracts/ContractABI.json');
  const contractABI = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
  web3 = new Web3(new Web3.providers.HttpProvider(INFURA_URL));
  contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
}

export async function sendHashToBlockchain(hash: string) {
  // 1. Enviar para blockchain Go
  try {
    await axios.post(GO_BLOCKCHAIN_URL, { data: { hash } });
  } catch (err) {
    console.error('Erro ao enviar hash para blockchain Go:', err);
  }

  // 2. Opcional: Enviar para Ethereum
  if (ETH_ENABLED && web3 && contract) {
    const PRIVATE_KEY = process.env.PRIVATE_KEY as string;
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    web3.eth.accounts.wallet.add(account);
    const tx = contract.methods.registerEventHash(hash);
    const gas = await tx.estimateGas({ from: account.address });
    const data = tx.encodeABI();
    const txData = {
      from: account.address,
      to: contract.options.address,
      data,
      gas
    };
    const receipt = await web3.eth.sendTransaction(txData);
    return receipt;
  }
} 