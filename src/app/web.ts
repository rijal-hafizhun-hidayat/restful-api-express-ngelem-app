import express from "express";
import cors from "cors";
import { errorMiddleware } from "../middleware/error-middleware";
import { publicApiRoute } from "../router/public-api";
import { apiRoute } from "../router/api";
import { storageApiRoute } from "../router/storage-api";

const web = express();
const corsOrigin = {
  origin: "http://localhost:3000", //or whatever port your frontend is using
  credentials: true,
  optionSuccessStatus: 200,
};

web.use(cors(corsOrigin));
web.use(express.json());
web.use(storageApiRoute);
web.use(publicApiRoute);
web.use(apiRoute);
web.use(errorMiddleware);

export { web };
