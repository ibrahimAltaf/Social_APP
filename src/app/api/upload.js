import cloudinary from "@/lib/cloudinary";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const fileStr = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
        upload_preset: 'your_upload_preset',
      });
      res.status(200).json({ url: uploadedResponse.secure_url });
    } catch (error) {
      console.error("Upload failed:", error);
      res.status(500).json({ error: 'Something went wrong' });
    }
  } else {
    res.status(405).json({ error: 'Only POST method is allowed' });
  }
}
