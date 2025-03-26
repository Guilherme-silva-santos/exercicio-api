export type Post = {
  id: string;
  title: string;
  content: string;
  publishedAt: string;
};

import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { Post } from "@/models/Post";

type BlogPostsContextType = {
  posts: Post[];
  loading: boolean;
  refetchPosts: () => Promise<void>;
  createPost: (data: Omit<Post, "id">) => Promise<void>;

  patchPost: (id: string, data: Partial<Post>) => Promise<void>;

  putPost: (id: string, data: Post) => Promise<void>;

  deletePost: (id: string) => Promise<void>;
};

const BlogPostsContext = createContext<BlogPostsContextType>({
  posts: [],
  loading: false,
  refetchPosts: async () => {},
  createPost: async () => {},
  updatePost: async () => {},
  deletePost: async () => {},
});

export const BlogPostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await axios.get<Post[]>("https://suaapi.com/posts");
      setPosts(response.data);
    } catch (error) {
      console.error("Erro ao buscar posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const createPost = async (data: Omit<Post, "id">) => {
    try {
      const response = await axios.post<Post>("https://suaapi.com/posts", data);
      setPosts((prev) => [response.data, ...prev]);
    } catch (error) {
      console.error("Erro ao criar post:", error);
    }
  };

  const updatePost = async (id: string, data: Partial<Post>) => {
    try {
      const response = await axios.put<Post>(
        `https://suaapi.com/posts/${id}`,
        data
      );
      setPosts((prev) =>
        prev.map((post) =>
          post.id === id ? { ...post, ...response.data } : post
        )
      );
    } catch (error) {
      console.error("Erro ao atualizar post:", error);
    }
  };

  const deletePost = async (id: string) => {
    try {
      await axios.delete(`https://suaapi.com/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Erro ao deletar post:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <BlogPostsContext.Provider
      value={{
        posts,
        loading,
        refetchPosts: fetchPosts,
        createPost,
        updatePost,
        deletePost,
      }}
    >
      {children}
    </BlogPostsContext.Provider>
  );
};

export const useBlogPosts = () => useContext(BlogPostsContext);

const { posts, createPost, deletePost } = useBlogPosts();

const handleNew = () => {
  createPost({
    title: "Novo Post",
    content: "Conteúdo top",
    publishedAt: new Date().toISOString(),
  });
};

const handleRemove = (id: string) => {
  deletePost(id);
};

import { Slot } from "expo-router";
import { BlogPostsProvider } from "@/context/BlogPostsContext";

export default function Layout() {
  return (
    <BlogPostsProvider>
      <Slot />
    </BlogPostsProvider>
  );
}
