import {
  addDoc,
  getDocs,
  collection,
  query,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "../../config/firebase";
import { Post as IPost } from "./main";

interface Props {
  post: IPost;
}

interface Like {
  likeId: string;
  userId: string;
}

const PostContainer = ({ children }: { children: React.ReactNode }) => (
  <div style={{ display: "flex", justifyContent: "center" }}>{children}</div>
);

export const Post = (props: Props) => {
  const { post } = props;
  const [user] = useAuthState(auth);

  const [likes, setLikes] = useState<Like[] | null>(null);

  const likesRef = collection(db, "likes");

  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(
      data.docs.map((doc) => ({ userId: doc.data().userId, likeId: doc.id }))
    );
  };
  const addLike = async () => {
    try {
      const newDoc = await addDoc(likesRef, {
        userId: user?.uid,
        postId: post.id,
      });
      if (user) {
        setLikes((prev) =>
          prev
            ? [...prev, { userId: user.uid, likeId: newDoc.id }]
            : [{ userId: user.uid, likeId: newDoc.id }]
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeLike = async () => {
    try {
      const likeToDeleteQuery = query(
        likesRef,
        where("postId", "==", post.id),
        where("userId", "==", user?.uid)
      );

      const likeToDeleteData = await getDocs(likeToDeleteQuery);
      const likeId = likeToDeleteData.docs[0].id;
      const likeToDelete = doc(db, "likes", likeId);
      await deleteDoc(likeToDelete);
      if (user) {
        setLikes(
          (prev) => prev && prev.filter((like) => like.likeId !== likeId)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hasUserLiked = likes?.find((like) => like.userId === user?.uid);

  useEffect(() => {
    getLikes();
  }, []);

  const postContainerStyle: React.CSSProperties = {
    width: "350px", // Example width
    height: "300px", // Example height
    padding: "20px",
    border: "2px solid #331b03", // Border styling
    borderRadius: "5px",
    marginBottom: "20px",
    backgroundColor: "#f6d8ac",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center", // Aligning content at the center vertically
  };

  const titleStyle = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const bodyStyle = {
    marginBottom: "10px",
  };

  const footerContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  } as React.CSSProperties;

  const usernameStyle = {
    marginBottom: "10px",
  };

  const buttonStyle = {
    color: hasUserLiked ? "red" : "green",
    marginBottom: "10px",
  };

  return (
    <PostContainer>
      <div style={postContainerStyle}>
        <div style={titleStyle}>
          <h1>{post.title}</h1>
        </div>
        <div style={bodyStyle}>
          <p>{post.description}</p>
        </div>

        <div style={footerContainerStyle}>
          <div style={usernameStyle}>
            <p>@{post.username}</p>
          </div>
          <button
            style={buttonStyle}
            onClick={hasUserLiked ? removeLike : addLike}
          >
            {hasUserLiked ? <>&#128078;</> : <>&#128077;</>}
          </button>
        </div>
        {likes && <p>Likes: {likes?.length}</p>}
      </div>
    </PostContainer>
  );
};
