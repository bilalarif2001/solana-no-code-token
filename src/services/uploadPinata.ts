import axios from "axios";
async function uploadToPinata<T extends File>(
  name: string,
  description: string,
  image: T
): Promise<string> {
  const key = import.meta.env.VITE_PINATA_KEY;
  const formData = new FormData();
  formData.append("file", image);
  const pinataBaseUrl = "https://amber-recent-carp-488.mypinata.cloud/ipfs/";
  const uploadImage = await axios.post(
    "https://api.pinata.cloud/pinning/pinFileToIPFS",
    formData,
    {
      maxBodyLength: Infinity,
      headers: {
        "Content-Type": `multipart/form-data`,
        Authorization: `Bearer ${key}`,
      },
    }
  );

  if (uploadImage.data.IpfsHash) {
    const metadata = {
      name: name,
      image: `${pinataBaseUrl}${uploadImage.data.IpfsHash}`,
      description: description,
    };
    const uploadMetadata = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JSON.stringify(metadata),
      {
        headers: {
          "Content-Type": `application/json`,
          Authorization: `Bearer ${key}`,
        },
      }
    );
    const metadataUrl = `${pinataBaseUrl}${uploadMetadata.data.IpfsHash}`;
    return metadataUrl;
  } else {
    throw new Error("Failed to upload image to IPFS.");
  }
}

export default uploadToPinata;
