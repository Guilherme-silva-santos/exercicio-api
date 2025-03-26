import { GetPostResponse } from "@/model/get-post-response";
import { ReactNode } from "react";

interface PostProviderProps {
  children: ReactNode;
}

type BlogPostsContextType = {
  posts: GetPostResponse[];
  loading: boolean;
  refetchPosts: () => Promise<void>;
  createPost: (data: Omit<GetPostResponse, "id">) => Promise<void>;
  patchPost: (id: string, data: Partial<GetPostResponse>) => Promise<void>;
  putPost: (id: string, data: GetPostResponse) => Promise<void>;
  deletePost: (id: string) => Promise<void>;
};
