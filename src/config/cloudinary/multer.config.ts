import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import cloudinary from "./cloudinary.config.js";

interface CustomParams {
  folder: string;
  allowed_formats: string[];
  public_id: (req: Express.Request, file: Express.Multer.File) => string;
}

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "games",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (_req: Request, file: Express.Multer.File) => Date.now() + "-" + file.originalname,
  } as unknown as CustomParams, // 👈 extendemos a mano
});

export const upload = multer({ storage });