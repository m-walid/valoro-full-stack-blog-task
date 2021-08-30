import { Request, Response, NextFunction } from "express";
import Exception from "../util/Exception";
import Blog from "../models/blog";

import BlogDto from "../DTOs/blog.dto";
import TtsService from "../services/ttsService";
const ttsService = new TtsService();
export async function getBlogs(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    const responseBlogs: BlogDto[] = blogs.map((blog: any) => {
      return {
        id: blog._id,
        title: blog.title,
        body: blog.body,
        date: new Date(blog.createdAt).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
      };
    });
    response.render("index", { title: "blogs", blogs: responseBlogs });
  } catch (error) {
    console.log(error);
    next(new Exception(500, error.message));
  }
}

export async function getBlog(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const blogId = request.params.id;
    const blog: any = await Blog.findById(blogId);
    const audio = await ttsService.tts(blog.body);
    const responseBlog: BlogDto = {
      id: blog._id,
      title: blog.title,
      body: blog.body,
      audio,
      date: new Date(blog.createdAt).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }),
    };
    response.render("blog", { title: responseBlog.title, blog: responseBlog });
  } catch (error) {
    console.log(error);
    next(new Exception(500, error.message));
  }
}

export async function createBlog(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const blogDto: BlogDto = request.body;
    const blog = new Blog({
      title: blogDto.title,
      body: blogDto.body,
    });
    await blog.save();
    response.json({ redirect: "/blogs" });
  } catch (error) {
    console.log(error);
    next(new Exception(500, error.message));
  }
}
export async function deleteBlog(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const blogId = request.params.id;
    await Blog.findByIdAndDelete(blogId);
    response.json({ redirect: "/blogs" });
  } catch (error) {
    console.log(error);
    next(new Exception(500, error.message));
  }
}
export async function getCreateBlog(
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    response.render("create", { title: "Create Blog" });
  } catch (error) {
    console.log(error);
    next(new Exception(500, error.message));
  }
}
