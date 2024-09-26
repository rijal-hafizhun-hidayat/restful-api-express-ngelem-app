import fs from "fs";
import { ErrorResponse } from "../error/error-response";

export class DestroyFile {
  static async unlink(filePath: string) {
    fs.unlink(filePath, (err) => {
      if (err) {
        throw new ErrorResponse(404, `Error removing old file: ${err}`);
        return;
      }
    });
  }
}
