import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { auth } from "@/firebase";

const useAuth = () => {
  const [init, setInit] = useState(false);
  const [userInformation, setUserInformation] = useState<User | null>(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserInformation(user);
      } else {
        setUserInformation(null);
      }
      setInit(true);
    });
  }, [init]);

  return { init, userInformation };
};

export default useAuth;
