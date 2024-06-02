import { useState } from "react";
import LoaderSvg from "../assets/svg/loader";
import CheckSvg from "@/assets/svg/checkSvg";
import { toast } from "sonner";

function UploadingMetadata() {
  const [complete, setComplete] = useState(false);
  return (
    <div>
      <LoaderSvg className={"h-24 w-24 mx-auto"} />
      <p className="text-center text-zinc-200 m-4 text-sm font-semibold tracking-wide">
        Uploading Metadata. Please Wait....
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

export default UploadingMetadata;
