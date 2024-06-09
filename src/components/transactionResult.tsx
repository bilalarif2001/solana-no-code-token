import { useState, useEffect } from "react";
import SuccessSvg from "@/assets/svg/successSvg";
import LoaderSvg from "@/assets/svg/loader";
import { Connection, LAMPORTS_PER_SOL, clusterApiUrl } from "@solana/web3.js";
import BottomGradient from "./ui/bottomGradient";

function TransactionResult({ hash, setOpenDialog, setCurrentStep }) {
  const connection = new Connection(clusterApiUrl("devnet"));
  const [transactionDetails, setTransactionDetails] = useState(null);
  const network= import.meta.env.VITE_NETWORK
  async function getParsedTrx() {
    const parsedTrx = await connection.getParsedTransaction(hash, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });

    if (parsedTrx) {
      const accountkeys = parsedTrx?.transaction.message.accountKeys.map(
        (account) => account.pubkey.toString()
      );
      const creator = accountkeys[0];
      const tokenAddress = accountkeys[1];
      setTransactionDetails({
        timestamp: parsedTrx.blockTime
          ? new Date(parsedTrx?.blockTime * 1000).toDateString() +
            " " +
            new Date(parsedTrx?.blockTime * 1000).toLocaleTimeString()
          : new Date(),
        tokenCreator: creator,
        tokenAddress: tokenAddress,
        gasFee: parsedTrx.meta.fee / LAMPORTS_PER_SOL,
        fee: (
          parsedTrx.meta?.preBalances[0] / LAMPORTS_PER_SOL -
          parsedTrx.meta?.postBalances[0] / LAMPORTS_PER_SOL
        ).toFixed(6),
        error: parsedTrx.meta?.err,
      });
    }
  }

  useEffect(() => {
    getParsedTrx();
  }, []);
  return (
    <div className="py-4 px-12">
      {transactionDetails ? (
        <div>
          <div className="flex flex-col items-center justify-center mb-10">
            <p className="text-center pb-7 font-semibold tracking-wide">
              Transaction successful
            </p>
            <SuccessSvg />
          </div>
          <div className="flex space-x-12 mb-8">
            <div className="text-sm font-medium space-y-2">
              <p>Status:</p>
              <p>Date:</p>
              <p>Gas Fee:</p>
              <p>TotalFees:</p>
              <p>Transaction:</p>
              <p>Token:</p>
            </div>
            <div className="text-sm space-y-2">
              {transactionDetails.error ? (
                <span className="text-xs bg-rose-950 border border-rose-600 p-1 px-2 rounded-lg text-rose-300 font-medium tracking-wide">
                  error
                </span>
              ) : (
                <span className="text-xs bg-violet-950 border border-violet-600 p-1 px-2 rounded-lg text-violet-300 font-medium tracking-wide">
                  Success
                </span>
              )}
              <p>{transactionDetails.timestamp}</p>
              <p>{transactionDetails.gasFee} SOL</p>
              <p>{transactionDetails.fee} SOL</p>
              <p className="text-violet-500 hover:text-violet-400 transition duration-200">
                <a
                  href={`https://solscan.io/tx/${hash}?cluster=${network}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Transaction ☍
                </a>
              </p>
              <p className="text-violet-500 hover:text-violet-400 transition duration-200">
                <a
                  href={`https://solscan.io/token/${transactionDetails.tokenAddress}?cluster=${network}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  View Token ☍
                </a>
              </p>
            </div>
          </div>
          <button
        className="bg-gradient-to-br relative group/btn  from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={() => {
          setOpenDialog(false);
          setCurrentStep({ active: 1, completed: 0 });
        }}
      >
        Close
        <BottomGradient />
      </button>
        </div>): <div className="flex flex-col items-center justify-center mb-10">
            <p className="text-center pb-7 font-semibold tracking-wide">
              Loading Transaction, Please Wait.
            </p>
            <LoaderSvg />
          </div>
      }
   
    </div>
  );
}

export default TransactionResult;
