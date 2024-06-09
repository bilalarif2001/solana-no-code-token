import { generateSigner, percentAmount, some } from "@metaplex-foundation/umi";
import {
  createAndMint,
  TokenStandard,
  mplTokenMetadata
} from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import {
  WalletAdapter,
  walletAdapterIdentity,
} from "@metaplex-foundation/umi-signer-wallet-adapters";
import { base58 } from "@metaplex-foundation/umi/serializers";

async function createSplToken<T extends WalletAdapter>(
  wallet: T,
  name: string,
  uri: string,
  decimals: number,
  symbol: string,
  supply: number
): Promise<[string,number]> {
  const network= import.meta.env.VITE_NETWORK
  const umi = createUmi(clusterApiUrl(network));
  umi.use(mplTokenMetadata())
  umi.use(walletAdapterIdentity(wallet));
  const mint = generateSigner(umi);
  const mintFungibleInstruc = await createAndMint(umi, {
    mint: mint,
    name: name,
    authority: umi.identity,
    uri: uri,
    sellerFeeBasisPoints: percentAmount(0),
    decimals: some(decimals), // for 0 decimals use some(0)
    amount: supply,
    symbol: symbol,
    tokenStandard: TokenStandard.Fungible,
  }).sendAndConfirm(umi);
  return base58.deserialize(mintFungibleInstruc.signature);
}

export default createSplToken;
