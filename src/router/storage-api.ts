import express from "express";

const storageApiRoute = express();

storageApiRoute.use("/api/storage/profile", express.static("storage/profile"));

export { storageApiRoute };
