import { useEffect, useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";

export function EthereumWallet({ mnemonic, index }) {
  const [wallet, setWallet] = useState(null);

  useEffect(() => {
    if (!mnemonic) return;

    async function deriveWallet() {
      const seed = await mnemonicToSeed(mnemonic);
      const derivationPath = `m/44'/60'/0'/0/${index}`;
      const hdNode = HDNodeWallet.fromSeed(seed).derivePath(derivationPath);
      const wallet = new Wallet(hdNode.privateKey);

      setWallet({ address: wallet.address, privateKey: wallet.privateKey });
    }

    deriveWallet();
  }, [mnemonic, index]);

  if (!wallet) return <div>Loading Ethereum Wallet...</div>;

  return (
    <div className="flex flex-col gap-4 bg-slate-700 p-5 rounded-lg text-white">
      <p className="text-2xl font-semibold">Ethereum Wallet</p>
      <div className="bg-slate-800 p-4 rounded-md">
        <p className="text-sm text-gray-300">Address</p>
        <p className="font-mono break-all">{wallet.address}</p>
      </div>
      <div className="bg-slate-800 p-4 rounded-md mt-3">
        <p className="text-sm text-gray-300">Private Key</p>
        <p className="font-mono break-all">{wallet.privateKey}</p>
      </div>
    </div>
  );
}
