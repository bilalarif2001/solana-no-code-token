import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Navbar() {
  return (
    <div className=" sm:hidden">
      <div className="flex flex-col space-y-4 items-center justify-between mb-8 space-x-4">
        <div className="">
          <p className="bg-clip-text text-lg text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600 text-center font-sans font-bold">Solana</p>
          <p className="bg-clip-text text-lg text-transparent bg-gradient-to-r from-cyan-300 to-violet-600  text-center font-sans font-bold">
          Token Launcher
        </p>
        </div>
        
        <WalletMultiButton
              className="bg-gradient-to-br relative group/btn  from-slate-800 to-slate-900"
              type="submit"
              // onClick={() => connectWallet()}
            >
            </WalletMultiButton>
      </div>

      <p className="text-neutral-400 max-w-lg mx-auto my-2 text-xs text-center relative z-10">
        Launch a Token on Solana with minimal effort.
      </p>
      <div className=" text-violet-400 rounded-lg p-2 border max-w-[300px] mx-auto border-violet-700 bg-zinc-950 text-xs flex space-x-1 items-center tracking-wider justify-center">
                <svg
                  className=""
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  height="20"
                  width="20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-bold text-sm">Info!</span>
                <span>Current network is Solana Devnet.</span>
              </div>
    </div>
  );
}

export default Navbar;
