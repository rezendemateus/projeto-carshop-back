import cors from "cors";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import handleError from "./errors/handleError";
import { adsRoutes } from "./routes/ads.routes";
import userRoutes from "./routes/user.routes";
import { adressRoutes } from "./routes/adress.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/ads", adsRoutes);
app.use("/user", userRoutes);
app.use("/adress", adressRoutes);

app.use(handleError);

export default app;
