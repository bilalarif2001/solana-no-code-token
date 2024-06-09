import LoaderSvg from "../assets/svg/loader";

function UploadingMetadata() {
  return (
    <div>
      <LoaderSvg />
      <p className="text-center text-zinc-300 m-4 text-sm font-medium tracking-wide">
        Uploading Metadata. Please Wait....
      </p>
    </div>
  );
}

export default UploadingMetadata;
