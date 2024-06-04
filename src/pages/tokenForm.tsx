import { BackgroundBeams } from "../components/ui/background-beams";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textArea";
import { Dialog, DialogContent, DialogTrigger } from "../components/ui/dialog";
import StepCheck from "@/components/ui/stepCheck";
import UploadingMetadata from "@/components/uploadingMetadata";
import { Toaster, toast } from "sonner";
import CreateToken from "@/components/ui/creatingToken";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";

// Solana Imports

import { generateSigner, percentAmount, some } from "@metaplex-foundation/umi";
import { createFungible } from "@metaplex-foundation/mpl-token-metadata";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { clusterApiUrl } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { base58 } from "@metaplex-foundation/umi/serializers";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import {
  Form,
  FormControl,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

export function TokenForm() {
  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters" })
      .max(15, { message: "Name must be 20 characters max" }),
  });

  // defining form

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: "",
      supply: "",
    },
  });

  const [currentStep, setCurrentStep] = useState({
    active: 1,
    completed: 0,
    error: false,
  });
  const wallet = useWallet();

  useEffect(() => {
    {
      if (wallet.publicKey) {
        localStorage.setItem("autoConnect", "true");
      }
    }
  }, []);

  async function execute(values?: z.infer<typeof formSchema>) {
    console.log(values);
    try {
      if (!wallet.publicKey) {
        return toast.error("Please connect wallet first!", {
          classNames: { error: "text-red-500", title: "text-zinc-200" },
        });
      }
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
    <div className="h-full min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto lg:gap-24">
        <div className="col-span-6 mr-12 my-auto hidden sm:block">
          <h1 className="relative z-10 text-lg lg:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Solana
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-600  text-center font-sans font-bold">
              Token Launcher
            </p>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
            Launch a Token on Solana with minimal effort.
          </p>
          <div className="flex justify-center">
            <WalletMultiButton
              className="bg-gradient-to-br relative group/btn  from-slate-800 to-slate-900"
              type="submit"
            ></WalletMultiButton>
          </div>
        </div>
        <div className="col-span-12 sm:col-span-6 sm:ml-0 lg:ml-0 md:mr-10 z-20 sm:max-w-lg sm:w-full sm:mx-auto mx-4 rounded-none md:rounded-2xl p-4 border border-zinc-900 md:p-8 shadow-input bg-black">
          <Navbar />
          <Form {...form}>
            <form className="my-8" onSubmit={form.handleSubmit(execute)}>
              <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="symbol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Symbol</FormLabel>
                      <FormControl>
                        <Input placeholder="shadcn" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex space-x-2 mb-4">
                <div className="w-full space-y-4">
                  <FormField
                    control={form.control}
                    name="decimals"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Decimals</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="supply"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Supply</FormLabel>
                        <FormControl>
                          <Input placeholder="shadcn" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full bg-neutral-900 border border-neutral-800 rounded-lg"></div>
              </div>

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <TextArea placeholder="shadcn" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent my-8 h-[1px] w-full" />

              <button
                className="bg-gradient-to-br relative group/btn  from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                type="submit"
                onClick={() => {
                  execute();
                }}
              >
                Create Token
                <BottomGradient />
              </button>

              <Dialog>
                <DialogTrigger>Open</DialogTrigger>
                <DialogContent className="text-white">
                  <StepCheck status={currentStep} />
                  {currentStep.active == 1 && <UploadingMetadata />}
                  {currentStep.active == 2 && <CreateToken />}
                  {currentStep.active == 3 && <UploadingMetadata />}

                  <button
                    className="border p-4 text-white"
                    onClick={() => {
                      setCurrentStep((prev) => {
                        return {
                          ...prev,
                          active: prev.active + 1,
                          completed: prev.completed + 1,
                        };
                      });
                    }}
                  >
                    asada
                  </button>
                </DialogContent>
              </Dialog>
            </form>
          </Form>
        </div>
      </div>
      {/* <BackgroundBeams /> */}
      <Toaster
        theme="dark"
        toastOptions={{
          className: "bg-neutral-900 text-neutral-200 rounded-lg",
        }}
        position="top-center"
      />
    </div>
  );
}
