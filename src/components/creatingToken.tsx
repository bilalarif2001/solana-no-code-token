import LoaderSvg from "@/assets/svg/loader";

function CreateToken() {
  return (
    <div>
      <LoaderSvg/>
      <p className="text-center text-zinc-300 m-4 text-sm font-medium tracking-wide">
        Please confirm transaction from wallet.
      </p>
    </div>
  );
}

export default CreateToken;
