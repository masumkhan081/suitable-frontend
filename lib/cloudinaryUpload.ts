export async function uploadToCloudinary(file: File) {
  // Step 1: get signed params from backend
  const sigRes = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/upload-signature`);
  if (!sigRes.ok) throw new Error("Failed to get signature");
  const { timestamp, signature, cloudName, apiKey } = await sigRes.json();

  // Step 2: upload directly to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const uploadRes = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!uploadRes.ok) throw new Error("Cloudinary upload failed");
  return uploadRes.json(); // contains secure_url, public_id, etc.
}
