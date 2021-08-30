import { Request, Response } from "express";

export default function routeNotFoundMiddleware(
  request: Request,
  response: Response,
  next: any
) {
  response.status(404).render("404", { title: "not found" });
}
