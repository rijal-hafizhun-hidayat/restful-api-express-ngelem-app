import express from "express";

const storageApiRoute = express();

storageApiRoute.use("/api/storage", express.static("storage/profile"));

export { storageApiRoute };
