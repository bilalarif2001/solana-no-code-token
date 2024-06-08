import axios from "axios";

async function uploadToPinata<T extends File>(
  name: string,
  description: string,
  image: T
): Promise<string> {
  const JWT =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI1NTU5YWRjYy0zZjZiLTQwMjEtYjczOC05ZDZiMGRjMTgwYzQiLCJlbWFpbCI6ImJpbGFsYXJpZjIwMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiZjhhOGE1MWNkMGMxZTk0YjczNjYiLCJzY29wZWRLZXlTZWNyZXQiOiIwOWQxOWYwMmFiN2E1YjU0ZmY0ZjAyZWY0ZjM1YjMyNmFjNjM4MDY4YzlmZGE2ZmNkMzQ3YWU2ODllYjM1ODI4IiwiaWF0IjoxNzE3ODM3Njg2fQ.31qiPIdrpZvvWtt5tpudFqwJ97b6tbI1vA8LIagMZE4";

  const formData = new FormData();
  formData.append("file", image);
  const pinataBaseUrl = "https://amber-recent-carp-488.mypinata.cloud/ipfs/";
  try {
    const uploadImage = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );

    if (uploadImage.data.IpfsHash) {
      console.log("image", uploadImage.data.IpfsHash);
      const metadata = {
        name: name,
        image: `${pinataBaseUrl}${uploadImage.data.IpfsHash}`,
        description: description,
      };
      console.log(metadata);
      const uploadMetadata = await axios.post(
        "https://api.pinata.cloud/pinning/pinJSONToIPFS",
        JSON.stringify(metadata),
        {
          headers: {
            "Content-Type": `application/json`,
            Authorization: `Bearer ${JWT}`,
          },
        }
      );
      console.log(uploadMetadata.data.IpfsHash);
      const metadataUrl = `${pinataBaseUrl}${uploadMetadata.data.IpfsHash}`;
      return metadataUrl;
    } else {
      throw new Error("Failed to upload image to IPFS.");
    }
  } catch (error: any) {
    return error.response.data;
  }
}

export default uploadToPinata;
