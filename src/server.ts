import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response, json } from "express";
import morgan from "morgan";
import blogRouter from "./controllers/blog.routes";
import exceptionHandlerMiddleware from "./middlewares/exceptionHandler.middleware";
import routeNotFoundMiddleware from "./middlewares/routeNotFound.middleware";
import TtsService from "./services/ttsService";
import { connectToDb } from "./util/dbConnection";
import path from "path";
import fs from "fs";
const PORT = process.env.PORT;
const app = express();
app.set("view engine", "ejs");
app.set("views", __dirname +"/views");
app.use(express.static(__dirname + "/public"));
app.use(morgan("dev"));
app.use(json());

app.use("/blogs", blogRouter);
// app.use("/tts", async (req: Request, res: Response) => {
//   const ttsService = new TtsService();
//   const audio = await ttsService.tts("hello zoz");
//   res.json({ audio });
// });
app.get("/", (req: Request, res: Response) => res.redirect("/blogs"));
app.get("/about", (request: Request, response: Response) =>
  response.render("about", { title: "about" })
);

app.use(routeNotFoundMiddleware);
app.use(exceptionHandlerMiddleware);

(async () => {
  await connectToDb();
  app.listen(PORT, () => {
    console.log(`App is running on port: ${PORT}`);
  });
})();
