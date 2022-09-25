import { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import firebaseInitialize from "../authentication/firebaseInitialize";

firebaseInitialize();

const useFirebase = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUsers(user);
      } else {
        setIsLoggedIn(false);
        setUsers({});
      }
      setIsLoading(false);
    });
    return () => unSubscribe;
  }, [auth]);
  const createNewUser = (fullName, email, password, navigate) => {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfileName(fullName);
        const displayName = fullName;
        const userData = {
          email: user.email,
          displayName,
          role: "user",
        };
        // clientSaveToDatabase(userData);
        toast.success("Successfully create a new account.");
        navigate("/login");
      })
      .catch((error) => {
        const errorCode = error.code;
        alert(errorCode);
        if (errorCode) {
          Swal.fire("Attention!", "Sorry! this email already in use.", "error");
        }
      })
      .finally(() => setIsLoading(false));
  };
  /* const clientSaveToDatabase = (userData) => {
    axios
      .post("http://localhost:5000/app/v1/user", userData)
      .then((res) => {})
      .catch((err) => {});
  }; */
  const updateProfileName = (fullName) => {
    updateProfile(auth.currentUser, {
      displayName: fullName,
    })
      .then(() => {})
      .catch(() => {});
  };
  const userLogin = (email, password, navigate, location) => {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        if (user) {
          setUsers(user);
          setIsLoggedIn(true);
          const destination = location.state?.from || "/dashboard";
          navigate(destination);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/wrong-password") {
          Swal.fire(
            "Attention!",
            "Wrong password. please try again or reset the password",
            "warning"
          );
        } else if (errorCode === "auth/user-not-found") {
          Swal.fire("Attention!", "User not found. please sign up", "warning");
          navigate("/create-a-new-account");
        }
      })
      .finally(() => setIsLoading(false));
  };
  const handlePasswordResetEmail = (email, navigate, location) => {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        const destination = location.state?.from || "/login";
        navigate(destination);
        Swal.fire(
          "Congratulation!",
          "Please check your email inbox or spam folder and reset your password.",
          "success"
        );
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === "auth/user-not-found") {
          Swal.fire("Attention!", "User not found. please sign up", "warning");
          navigate("/create-a-new-account");
        }
      });
  };
  /* const handleJsonWebToken = (email) => {
    axios
      .put(`http://localhost:5000/app/v1/user?email=${email}`)
      .then((res) => {})
      .catch((err) => {});
  }; */
  const handleSignOut = () => {
    setIsLoading(true);
    signOut(auth)
      .then(() => {
        setUsers({});
        setIsLoggedIn(false);
      })
      .catch((error) => {
        // An error happened.
      })
      .finally(() => setIsLoading(false));
  };
  /* useEffect(() => {
    let subscribed = true;
    if (users.email) {
      axios
        .get(`http://localhost:5000/app/v1/user?email=${users.email}`)
        .then((res) => {
          if (subscribed) {
            const accessToken = res.data?.data?.token;
            setIsToken(accessToken);
            localStorage.setItem("accessToken", accessToken);
            if (res.data.data?.role === "Admin@k") {
              setIsAdmin(true);
            } else if (res.data.data?.role === "Client") {
              setIsClient(true);
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    return () => (subscribed = false);
  }, [users.email]); */
  return {
    users,
    isLoggedIn,
    isLoading,
    createNewUser,
    userLogin,
    handlePasswordResetEmail,
    handleSignOut,
  };
};

export default useFirebase;
