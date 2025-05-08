import { Button } from "@/components/ui/button";
import { useState } from "react";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthereumWallet } from "./EtheriumWallet";

const Walletgenerator = ({ currency }) => {
  const [mnemonic, setMnemonic] = useState("");
  const [show, setShow] = useState(false);
  const [wallets, setWallets] = useState([]);

  const handleCopy = () => {
    navigator.clipboard.writeText(mnemonic);
    alert("Mnemonic copied to clipboard!");
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([mnemonic], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${currency || "wallet"}-mnemonic.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleClear = () => {
    setMnemonic("");
    setShow(false);
    setWallets([]);
  };

  const handleAdd = () => {
    setWallets([...wallets, wallets.length]);
  };

  return (
    <>
      <div className="flex flex-col gap-5 p-7 ml-[20%] mt-[80px] bg-slate-700 rounded-[10px] w-[60%] text-white relative">
        <p className="text-4xl italic">Secret Recovery Phrase</p>
        <p className="text-xl text-zinc-300">Save these words in a safe place.</p>

        {!show ? (
          <Button
            onClick={async () => {
              const mn = await generateMnemonic();
              setMnemonic(mn);
              setShow(true);
            }}
          >
            Create Seed Phrase
          </Button>
        ) : (
          <>
            <div className="grid grid-cols-3 gap-3 bg-slate-800 p-4 rounded-lg">
              {mnemonic.split(" ").map((word, index) => (
                <div
                  key={index}
                  className="bg-slate-600 text-white px-3 py-2 rounded-md flex items-center gap-2"
                >
                  <span className="text-sm text-gray-300">{index + 1}.</span>
                  <span className="font-mono">{word}</span>
                </div>
              ))}
            </div>
            <div className="flex flex-row justify-between">
              <div className="flex gap-4">
                <Button onClick={handleCopy}>📋 Copy</Button>
                <Button onClick={handleDownload}>📄 Download</Button>
              </div>
              <div className="flex gap-4">
                <Button onClick={handleAdd}>Add Wallet</Button>
                <Button className="bg-red-800 text-white" onClick={handleClear}>Reset</Button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Render wallets dynamically */}
      {show &&
        wallets.map((_, index) => (
          <div key={index} className="ml-[20%] mt-6 w-[60%]">
            {currency === "sol" && <SolanaWallet mnemonic={mnemonic} index={index} />}
            {currency === "eth" && <EthereumWallet mnemonic={mnemonic} index={index} />}
          </div>
        ))}
    </>
  );
};

export default Walletgenerator;
