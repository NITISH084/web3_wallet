import { useEffect, useState } from "react";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import bs58 from "bs58"; 
export function SolanaWallet({ mnemonic ,index}) {
  const [wallet, setWallet] = useState(null);

  // Function to generate Solana keypair from mnemonic
  const generateSolanaWallet = () => {
    const seed = mnemonicToSeedSync(mnemonic); // Convert mnemonic to seed
    const path =  `m/44'/501'/${index}'/0'`; // Solana HD wallet derivation path
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const keypair = nacl.sign.keyPair.fromSeed(derivedSeed); // Generate keypair using tweetnacl

    // Solana Keypair
    const solanaKeypair = Keypair.fromSecretKey(keypair.secretKey);
    setWallet(solanaKeypair);
  };

  useEffect(() => {
    if (mnemonic) {
      generateSolanaWallet();
    }
  }, [mnemonic]);

  if (!wallet) {
    return <div>Loading wallet...</div>;
  }
 // Convert the secret key to a Uint8Array and then to Base58
 const secretKeyBase58 = bs58.encode(wallet.secretKey);
  return (
    <div className="flex flex-col gap-4 bg-slate-700 p-5 rounded-lg text-white">
      <p className="text-2xl font-semibold">Solana Wallet</p>
      <p className="text-lg text-zinc-300">Your Solana wallet is ready!</p>

      <div className="bg-slate-800 p-4 rounded-md">
        <p className="text-sm text-gray-300">Public Key</p>
        <p className="font-mono">{wallet.publicKey.toBase58()}</p>
      </div>

      <div className="bg-slate-800 p-4 rounded-md mt-3">
        <p className="text-sm text-gray-300">Secret Key (Base58)</p>
        <p className="font-mono">{secretKeyBase58}</p>
      </div>
    </div>
  );
}
