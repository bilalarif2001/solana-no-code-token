import { generateSigner, percentAmount, some } from "@metaplex-foundation/umi";
import { createFungible } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { TokenForm } from "./pages/tokenForm";
function App() {
  const { visible, setVisible } = useWalletModal();
  const wallet = useWallet();
  async function execute() {
    try {
      setVisible(true);
      await wallet.connect();
      const umi = createUmi(clusterApiUrl("devnet"));
      umi.use(walletAdapterIdentity(wallet));
      const mint = generateSigner(umi);
      const mintFungibleInstruc = await createFungible(umi, {
        mint: mint,
        name: "Talla is a big dalla",
        authority: umi.identity,
        uri: "https://example.com/my-fungible.json",
        sellerFeeBasisPoints: percentAmount(0),
        decimals: some(7), // for 0 decimals use some(0)
      }).sendAndConfirm(umi);
      console.log(base58.deserialize(mintFungibleInstruc.signature));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
    <TokenForm/>
      {/* <button className="bg-gradient-to-r from-amber-700 to-orange-800 text-white text-xs font-semibold p-4 rounded-lg" onClick={() => execute()}>Click Me</button> */}
   {/*  
    <div className="relative">
      <img src={gradient} className="w-[313px] h-[254px]"/>
      <div className="absolute top-0 p-[98px] border-red-500" />
      <div className="absolute top-0 bg-zinc-900 p-28 border border-transparent">
        <p className="border">hello world</p>
      </div>
    </div> */}
    </div>
  );
}

export default App;
