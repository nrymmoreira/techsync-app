import { ethers } from "ethers";
import abi from "./TechSyncEscrowABI.json"; // exporte o ABI do Remix

const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

export async function getContract() {
  if (!window.ethereum) throw new Error("MetaMask não detectado!");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, abi, signer);
  return contract;
}
