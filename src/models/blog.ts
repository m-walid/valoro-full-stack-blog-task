import { model, Schema } from "mongoose";

const blogSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
      maxlength: 10000,
    },
  },
  { timestamps: true }
);

const Blog = model("Blog", blogSchema);
export {blogSchema} ;
export default Blog;
