import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

function Navbar() {
  return (
    <div className=" sm:hidden">
      <div className="flex items-center justify-between mb-8 space-x-4">
        <p className="bg-clip-text text-lg text-transparent bg-gradient-to-r from-cyan-300 to-violet-600  text-center font-sans font-bold">
          Token Launcher
        </p>
        <WalletMultiButton
              className="bg-gradient-to-br relative group/btn  from-slate-800 to-slate-900"
              type="submit"
              // onClick={() => connectWallet()}
            >
            </WalletMultiButton>
      </div>

      <p className="text-neutral-400 max-w-lg mx-auto my-2 text-xs text-left relative z-10">
        Launch a Token on Solana with minimal effort.
      </p>
    </div>
  );
}

export default Navbar;
