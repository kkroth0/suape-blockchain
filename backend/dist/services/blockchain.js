"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendHashToBlockchain = sendHashToBlockchain;
// Serviço de integração blockchain:
// - Sempre envia o hash para a blockchain Go (POC local)
// - Opcionalmente envia para Ethereum (se ETH_ENABLED=true e variáveis definidas)
// - Simples, sem dependências desnecessárias
const axios_1 = __importDefault(require("axios"));
const web3_1 = __importDefault(require("web3"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const GO_BLOCKCHAIN_URL = process.env.GO_BLOCKCHAIN_URL || 'http://localhost:8080/mine';
const ETH_ENABLED = process.env.ETH_ENABLED === 'true';
let web3 = null;
let contract = null;
if (ETH_ENABLED) {
    const INFURA_URL = process.env.INFURA_URL;
    const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;
    const abiPath = path_1.default.join(__dirname, '../../contracts/ContractABI.json');
    const contractABI = JSON.parse(fs_1.default.readFileSync(abiPath, 'utf8'));
    web3 = new web3_1.default(new web3_1.default.providers.HttpProvider(INFURA_URL));
    contract = new web3.eth.Contract(contractABI, CONTRACT_ADDRESS);
}
async function sendHashToBlockchain(hash) {
    // 1. Enviar para blockchain Go
    try {
        await axios_1.default.post(GO_BLOCKCHAIN_URL, { data: { hash } });
    }
    catch (err) {
        console.error('Erro ao enviar hash para blockchain Go:', err);
    }
    // 2. Opcional: Enviar para Ethereum
    if (ETH_ENABLED && web3 && contract) {
        const PRIVATE_KEY = process.env.PRIVATE_KEY;
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
