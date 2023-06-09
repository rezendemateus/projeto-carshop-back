import cors from "cors";
import express from "express";
import "express-async-errors";
import "reflect-metadata";
import handleError from "./errors/handleError";
import { adsRoutes } from "./routes/ads.routes";
import userRoutes from "./routes/user.routes";
import { adressRoutes } from "./routes/adress.routes";
import sessionRouter from "./routes/login.routes";
import resetpassRouter from "./routes/forgotPassword.routes";
import commentsRouter from "./routes/comments.routes";
import  SwaggerUI from "swagger-ui-express";
import swaggerDocs from "../swagger.json"

const app = express();

app.use(cors());

app.use(express.json());


app.use("/api-docs",SwaggerUI.serve, SwaggerUI.setup(swaggerDocs))
app.use("/user", userRoutes);
app.use("/adress", adressRoutes);
app.use("/login", sessionRouter)
app.use("/ads", adsRoutes);
app.use("/forgot", resetpassRouter);
app.use("/comments", commentsRouter);


app.use(handleError);

export default app;
