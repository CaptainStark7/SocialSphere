import { getDocs, collection } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { Post } from "./post";

export interface Post {
  id: string;
  userId: string;
  title: string;
  username: string;
  description: string;
}

export const Main = () => {
  const [postsList, setPostsList] = useState<Post[] | null>(null);
  const postsRef = collection(db, "posts");

  const getPosts = async () => {
    const data = await getDocs(postsRef);
    setPostsList(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as Post[]
    );
  };

  useEffect(() => {
    getPosts();
  }, []);

  const mainContainerStyle = {
    padding: "20px",
    backgroundColor: "#f4f4f4",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  return (
    <div style={mainContainerStyle}>
      {postsList?.map((post) => (
        <Post post={post} />
      ))}
    </div>
  );
};
