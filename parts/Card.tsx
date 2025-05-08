"use client"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Walletgenerator from "./Walletgenerator";
const Card = () => {
    const[window,setWindow]=useState(false);
    const[currency,setCurrency]=useState("");
    const sol=()=>{
        setWindow(true);
        setCurrency("sol");
    }
    const eth=()=>{
        setWindow(true);
        setCurrency("eth");
    }
  return (
    <>
{!window?
    <div className="flex justify-center items-center h-[80%] ">
        <div className="m-4 p-4 dark:bg-gray-700 bg-zinc-300 flex rounded-[5px] flex-col gap-2">
            <p className="text-xl">
              Choose a blockchain to get started :   
            </p>
            <div className="flex flex-row gap-2 justify-center items-center ">
                <Button onClick={sol}>Solana</Button>
                <Button onClick={eth}>Etherium</Button>
            </div>
            </div>
        </div>
        :<Walletgenerator currency={currency} />
    }
    </>
  )
}
export default Card