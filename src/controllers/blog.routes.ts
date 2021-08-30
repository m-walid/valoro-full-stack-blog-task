import { NextFunction, Router, Request, Response } from "express";
import Exception from "../util/Exception";
import * as blogController from "./blog.controller";
const blogRouter = Router();

blogRouter.get("/", blogController.getBlogs);
blogRouter.get("/create", blogController.getCreateBlog);
blogRouter.post("/", blogController.createBlog);
blogRouter.get("/:id", blogController.getBlog);
blogRouter.delete("/:id", blogController.deleteBlog);

export default blogRouter;
