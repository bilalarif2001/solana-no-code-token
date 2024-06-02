import { BackgroundBeams } from "../components/ui/background-beams";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { TextArea } from "../components/ui/textArea";
import { cn } from "../lib/cn";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import StepCheck from "@/components/ui/stepCheck";
import UploadingMetadata from "@/components/uploadingMetadata";
import { Toaster } from "sonner";
import CreateToken from "@/components/ui/creatingToken";
import { useState } from "react";

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full mb-4", className)}>
      {children}
    </div>
  );
};

export function TokenForm() {
  const [currentStep, setCurrentStep] = useState({
    active: 1,
    completed: 0,
    error: false,
  });

  return (
    <div className="h-full min-h-screen w-full bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="grid grid-cols-12 w-full max-w-7xl mx-auto">
        <div className="col-span-6 mr-12 my-auto hidden sm:block">
          <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
            Solana
            <p className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-violet-600  text-center font-sans font-bold">
              Token Launcher
            </p>
          </h1>
          <p className="text-neutral-400 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
            Launch a Token on Solana with minimal effort.
          </p>
        </div>
        <div className="col-span-12 sm:col-span-6 sm:ml-12 z-20 sm:max-w-lg sm:w-full sm:mx-auto mx-4 rounded-none md:rounded-2xl p-4 border border-zinc-900 md:p-8 shadow-input bg-black">
          <h2 className="font-bold text-xl text-neutral-200">
            Welcome to Aceternity
          </h2>
          <p className="text-neutral-300 text-sm max-w-sm mt-2">
            Login to aceternity if you can because we don&apos;t have a login
            flow yet
          </p>

          <form className="my-8" onSubmit={() => {}}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Name" type="text" />
              </LabelInputContainer>
              <LabelInputContainer>
                <Label htmlFor="symbol">Symbol</Label>
                <Input id="symbol" placeholder="Durden" type="text" />
              </LabelInputContainer>
            </div>
            <div className="flex space-x-2">
              <div className="w-full">
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="decimals">Decimals</Label>
                  <Input
                    id="decimals"
                    placeholder="projectmayhem@fc.com"
                    type="email"
                  />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="supply">Supply</Label>
                  <Input id="supply" placeholder="Supply" type="password" />
                </LabelInputContainer>
              </div>
              <div className="w-full bg-neutral-900 border border-neutral-800 rounded-lg">
                <p></p>
              </div>
            </div>

            <LabelInputContainer className="mb-8">
              <Label htmlFor="description">Description</Label>
              <TextArea id="description" placeholder="Description" />
            </LabelInputContainer>

            <button
              className="bg-gradient-to-br relative group/btn  from-zinc-900 to-zinc-900 block bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
              type="submit"
            >
              Sign up &rarr;
              <BottomGradient />
            </button>

            <Dialog>
              <DialogTrigger>Open</DialogTrigger>
              <DialogContent className="text-white">
                <StepCheck status={currentStep} />
                {currentStep.active==1 && <UploadingMetadata/>}
                {currentStep.active==2 && <CreateToken/>}
                {currentStep.active==3 && <UploadingMetadata/>}

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
        </div>
        <Toaster
          theme="dark"
          toastOptions={{
            className: "bg-neutral-900 text-neutral-200 rounded-lg",
          }}
          position="top-center"
        />
      </div>

      {/* <BackgroundBeams /> */}
    </div>
  );
}
