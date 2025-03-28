import { CreatePostRequest } from "@/model/create-post-request";
import { GetPostResponse } from "@/model/get-post-response";
import { PatchPostRequest } from "@/model/patch-post-request";
import { PutPostRequest } from "@/model/put-post-request";
import { RequestStatus } from "@/model/request-status";
import { api } from "@/service/axios";
import { useRouter } from "expo-router";
import { createContext, useContext, useState } from "react";
interface PostProviderProps {
  children: React.ReactNode;
}

interface PostContextProps {
  postPage: number;

  getAllPosts: () => void;
  getAllPostsRequestStatus: RequestStatus;
  posts: GetPostResponse[];

  createPost: (data: CreatePostRequest) => void;
  createPostRequestStatus: RequestStatus;

  patchPost: (id: string, data: PatchPostRequest) => void;
  patchPostRequestStatus: RequestStatus;

  putPost: (id: string, data: PutPostRequest) => void;
  putPostRequestStatus: RequestStatus;

  deletePostById: (id: string) => void;
  deletePostRequestStatus: RequestStatus;

  // createPostRequest: CreatePostRequest;
  // setCreatePostRequest: (data: CreatePostRequest) => void;
}

const PostContext = createContext<PostContextProps>({} as PostContextProps);

export const useBlogPosts = () => {
  return useContext(PostContext);
};

export const PostProvider = ({ children }: PostProviderProps) => {
  const router = useRouter();
  const [postPage, setPostPage] = useState(1);

  const [createPostRequestStatus, setCreatePostRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const [getAllPostsRequestStatus, setGetAllPostsRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const [patchPostRequestStatus, setPatchPostRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const [putPostRequestStatus, setPutPostRequestStatus] =
    useState<RequestStatus>({ status: "idle" });
  const [deletePostRequestStatus, setDeletePostRequestStatus] =
    useState<RequestStatus>({ status: "idle" });

  const [posts, setPosts] = useState<GetPostResponse[]>([]);

  const getAllPosts = async () => {
    setGetAllPostsRequestStatus({ status: "pending" });
    try {
      console.log(getAllPostsRequestStatus);

      const { data } = await api.get("/posts");
      setPosts(data);
      setGetAllPostsRequestStatus({ status: "succeeded" });
    } catch (error) {
      console.log(error);

      setGetAllPostsRequestStatus({ status: "failed" });
    }
  };

  const createPost = async (data: CreatePostRequest) => {
    setCreatePostRequestStatus({ status: "pending" });
    try {
      await api.post("/posts", data);
      setCreatePostRequestStatus({ status: "succeeded" });
    } catch (error) {
      console.log(error);

      setCreatePostRequestStatus({ status: "failed" });
    }
  };

  const patchPost = async (id: string, data: PatchPostRequest) => {
    setPatchPostRequestStatus({ status: "pending" });
    try {
      await api.patch(`/posts/${id}`, data);
      setPatchPostRequestStatus({ status: "succeeded" });
    } catch (error) {
      console.log(error);

      setPatchPostRequestStatus({ status: "failed" });
    }
  };

  const putPost = async (id: string, data: PutPostRequest) => {
    setPutPostRequestStatus({ status: "pending" });
    try {
      await api.put(`/posts/${id}`, data);
      setPutPostRequestStatus({ status: "succeeded" });
    } catch (error) {
      console.log(error);

      setPutPostRequestStatus({ status: "failed" });
    }
  };

  const deletePostById = async (id: string) => {
    setDeletePostRequestStatus({ status: "pending" });
    try {
      await api.delete(`/posts/${id}`);
      setDeletePostRequestStatus({ status: "succeeded" });
    } catch (error) {
      console.log(error);

      setDeletePostRequestStatus({ status: "failed" });
    }
  };

  return (
    <PostContext.Provider
      value={{
        postPage,
        getAllPosts,
        posts,
        getAllPostsRequestStatus,
        createPostRequestStatus,
        createPost,
        patchPost,
        patchPostRequestStatus,
        putPost,
        putPostRequestStatus,
        deletePostById,
        deletePostRequestStatus,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
