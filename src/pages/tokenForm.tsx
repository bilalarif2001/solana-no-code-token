import { BackgroundBeams } from "../components/ui/background-beams";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textArea";
import StepCheck from "@/components/ui/stepCheck";
import UploadingMetadata from "@/components/uploadingMetadata";
import { Toaster, toast } from "sonner";
import CreateToken from "@/components/creatingToken";
import { useState, useEffect } from "react";
import Navbar from "@/components/navbar";
import SolanaLogo from "../assets/SolanaLogo.png";

import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";

import { useWallet } from "@solana/wallet-adapter-react";
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
import UploadSvg from "@/assets/svg/uploadSvg";
import uploadToPinata from "@/services/uploadPinata";
import BottomGradient from "@/components/ui/bottomGradient";
import createSplToken from "@/services/createSplToken";
import formSchema from "@/schema/createSplToken.schema";
import TransactionResult from "@/components/transactionResult";
import Footer from "@/components/footer";
export function TokenForm() {
  // defining form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      symbol: "",
      decimals: "",
      supply: "",
      description: "",
      image: undefined as unknown as File,
    },
  });
  const [displayImage, setDisplayImage] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [hash, setHash] = useState("");
  const [currentStep, setCurrentStep] = useState({
    active: 1,
    completed: 0,
  });
  const wallet = useWallet();
  const imageRef = form.register("image");

  useEffect(() => {
    {
      if (wallet.publicKey) {
        localStorage.setItem("autoConnect", "true");
      }
    }
  }, []);
  async function createSolToken(values?: z.infer<typeof formSchema>) {
    if (!wallet.publicKey) {
      return toast.error("Please connect wallet first!", {
        classNames: { error: "text-red-500", title: "text-zinc-200" },
      });
    }
    const { name, symbol, decimals, supply, description } = values ?? {};

    try {
      const image = values?.image[0];
      setOpenDialog(true);
      const metadataUri = await uploadToPinata(name, description, image);
      toast.success("Metadata uploaded", {
        classNames: { success: "text-violet-500", title: "text-zinc-200" },
      });

      setCurrentStep((prev) => {
        return {
          ...prev,
          active: prev.active + 1,
          completed: prev.completed + 1,
        };
      });

      const createToken = await createSplToken(
        wallet,
        name,
        metadataUri,
        decimals,
        symbol,
        supply
      );
      setHash(createToken[0]);
      toast.success("Token Created", {
        classNames: { success: "text-violet-500", title: "text-zinc-200" },
      });
      setCurrentStep((prev) => {
        return {
          ...prev,
          active: prev.active + 1,
          completed: prev.completed + 1,
        };
      });
    } catch (err: any) {
      console.log(err);
      setCurrentStep({ active: 1, completed: 0 });
      setOpenDialog(false);
      if (err?.error) {
        return toast.error(err.error.toString(), {
          classNames: { error: "text-red-500", title: "text-zinc-200" },
        });
      } else if (err?.response?.data) {
        return toast.error("Failed to upload metadata.", {
          classNames: { error: "text-red-500", title: "text-zinc-200" },
        });
      } else {
        return toast.error("An Error Occured!", {
          classNames: { error: "text-red-500", title: "text-zinc-200" },
        });
      }
    }
  }
  return (
    <div className="h-full min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto xl:gap-24 md:px-8">
        <div className="col-span-6 mr-12 my-auto hidden sm:block space-y-5">
          <h1 className="relative z-10 text-lg lg:text-6xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Solana
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-600  text-center font-sans font-bold">
              Token Launcher
            </p>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
            Launch a Token on Solana with minimal effort.
          </p>
          <div className="relative flex justify-center ">
            <div className="absolute z-10">
              <WalletMultiButton
                className=" bg-gradient-to-br from-slate-800 to-slate-900 hover:from-stone-700 hover:to-slate-800"
                type="submit"
              ></WalletMultiButton>
            </div>
            <div className="absolute top-20 z-[5]">
              <div className="p2 text-violet-400 rounded-lg p-2 border border-violet-700 bg-zinc-950 text-xs flex space-x-1 items-center tracking-wider">
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
          </div>
        </div>
        <div className="w-full p-8 md:p-2 col-span-12 sm:col-span-6 z-20">
          <div className=" sm:mx-auto w-full rounded-none md:rounded-2xl p-4 border border-zinc-800 md:p-8 shadow-input bg-zinc-950">
            <Navbar />
            <Form {...form}>
              <form
                className="my-8"
                onSubmit={form.handleSubmit(createSolToken)}
              >
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="symbol"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel>Symbol</FormLabel>
                        <FormControl>
                          <Input placeholder="Symbol" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col md:flex-row md:space-x-2 mb-4">
                  <div className="w-full space-y-4">
                    <FormField
                      control={form.control}
                      name="decimals"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Decimals</FormLabel>
                          <FormControl>
                            <Input placeholder="0-9" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="supply"
                      render={({ field }) => (
                        <FormItem className="">
                          <FormLabel>Supply</FormLabel>
                          <FormControl>
                            <Input placeholder="1000000" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <FormField
                    control={form.control}
                    name="image"
                    render={() => (
                      <FormItem className="w-full">
                        <FormLabel>Image</FormLabel>

                        <FormControl>
                          <div className="flex items-center justify-center w-full h-full mt-2">
                            <label
                              htmlFor="dropzone-file"
                              className="flex flex-col items-center justify-center w-full h-full border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-zinc-800 hover:bg-gray-100 dark:border-zinc-800 dark:hover:border-zinc-600 "
                            >
                              <div className="flex flex-col items-center justify-center w-full h-48 md:h-40">
                                {displayImage ? (
                                  <img
                                    src={displayImage}
                                    className="size-32 "
                                  />
                                ) : (
                                  <div className="flex flex-col items-center justify-center text-center">
                                    <UploadSvg />
                                    <p className="text-sm text-zinc-400 font-semibold">
                                      Click to upload
                                    </p>
                                    <p className="text-xs text-zinc-400">
                                      JPG, PNG, or GIF (MAX 5MB)
                                    </p>
                                  </div>
                                )}
                              </div>
                              <input
                                id="dropzone-file"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                {...imageRef}
                                onChange={(e) => {
                                  imageRef.onChange(e);
                                  if (!e.target.files) {
                                    setDisplayImage("");
                                    return;
                                  }
                                  if (e.target.files) {
                                    const fileType = e.target.files[0]?.type;
                                    if (
                                      [
                                        "image/jpeg",
                                        "image/jpg",
                                        "image/png",
                                        "image/gif",
                                      ].includes(fileType)
                                    ) {
                                      setDisplayImage(
                                        URL.createObjectURL(e.target.files[0])
                                      );
                                    }
                                  }
                                  return;
                                }}
                              />
                            </label>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="mt-8">
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <TextArea
                            placeholder="Token description"
                            {...field}
                            className="resize-none"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent my-8 h-[1px] w-full" />

                <button
                  className="bg-gradient-to-br relative group/btn  from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                  type="submit"
                  disabled={form.formState.isSubmitting}
                >
                  {form.formState.isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <img src={SolanaLogo} className="size-4" />
                      <p>Processing...</p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <img src={SolanaLogo} className="size-4" />
                      <p>Create Token</p>
                    </div>
                  )}
                  <BottomGradient />
                </button>

                <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                  <AlertDialogContent className="text-white">
                    <StepCheck status={currentStep} />
                    {currentStep.active == 1 && <UploadingMetadata />}
                    {currentStep.active == 2 && <CreateToken />}
                    {currentStep.active == 3 && (
                      <TransactionResult
                        hash={hash}
                        setOpenDialog={setOpenDialog}
                        setCurrentStep={setCurrentStep}
                      />
                    )}
                  </AlertDialogContent>
                </AlertDialog>
              </form>
            </Form>
          </div>
        </div>
      </div>
      <Footer/>
      <Toaster
        theme="dark"
        toastOptions={{
          className: "bg-neutral-900 text-neutral-200 rounded-lg",
        }}
        position="top-center"
      />
      <BackgroundBeams />
    </div>
  );
}
