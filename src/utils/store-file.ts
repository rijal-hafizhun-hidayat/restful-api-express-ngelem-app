import fs from "fs";
import path from "path";

export class StoreFile {
  static async storePhoto(file: any, uploadDirParam: string) {
    const uploadDir = path.join("src", uploadDirParam);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, {
        recursive: true,
      });
    }

    const filePath = path.join(
      uploadDir,
      Date.now() + path.extname(file.originalname)
    );

    fs.writeFileSync(filePath, file.buffer);

    return filePath;
  }

  static async storeFiles(
    files: Express.Multer.File[],
    uploadDirParam: string
  ) {
    const uploadDir: string = uploadDirParam;

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    return files.forEach((file: any) => {
      const filePath = path.join(
        uploadDir,
        Date.now() + path.extname(file.originalname)
      );
      fs.writeFileSync(filePath, file.buffer);
    });
  }
}
