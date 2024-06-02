import { useState } from "react";
import CheckSvg from "@/assets/svg/checkSvg";
import { toast } from "sonner";
import LoaderSvg from "@/assets/svg/loader";

function CreateToken() {
  const [complete, setComplete] = useState(false);
  return (
    <div>
      <LoaderSvg className={"h-24 w-24 mx-auto"} />
      <p className="text-center text-zinc-200 m-4 text-sm font-semibold tracking-wide">
        Waiting for confirmation from wallet.
      </p>

      <button
        className="text-white"
        onClick={() => {
          toast.success("Metadata has been uploaded!");
        }}
      >
        clieck
      </button>
    </div>
  );
}

export default CreateToken;
