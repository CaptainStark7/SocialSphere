import { Link } from "react-router-dom";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

export const Navbar = () => {
  const [user] = useAuthState(auth);

  const signUserOut = async () => {
    await signOut(auth);
  };

  return (
    <div
      className="navbar"
      style={{
        backgroundColor: "#3f90a1",
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <div className="links" style={{ marginRight: "20px" }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            marginRight: "10px",
            color: "#333",
          }}
        >
          Home
        </Link>
        {!user ? (
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#333",
            }}
          >
            Login
          </Link>
        ) : (
          <Link
            to="/createpost"
            style={{
              textDecoration: "none",
              marginRight: "10px",
              color: "#333",
            }}
          >
            Create Post
          </Link>
        )}
      </div>
      <div className="user">
        {user && (
          <>
            <p style={{ margin: "0 10px", color: "#333" }}>
              {user?.displayName}
            </p>
            <img
              src={user?.photoURL || ""}
              alt=""
              width="20"
              height="20"
              style={{ borderRadius: "50%", marginRight: "10px" }}
            />
            <button
              onClick={signUserOut}
              style={{
                padding: "5px 10px",
                backgroundColor: "#4caf50",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Log Out
            </button>
          </>
        )}
      </div>
    </div>
  );
};
