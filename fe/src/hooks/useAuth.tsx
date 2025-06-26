// hooks/useAuth.ts
import { useEffect, useState } from "react";
// import axios from "axios";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // test icon progress
      setTimeout(() => {
        setIsAuthenticated(false);
      }, 3000);
      return;
    }
    else{
      setIsAuthenticated(true);
    }

    // axios
    //   .get("/api/auth/verify", {
    //     headers: { Authorization: `Bearer ${token}` },
    //   })
    //   .then(() => setIsAuthenticated(true))
    //   .catch(() => setIsAuthenticated(false));
  }, []);

  return isAuthenticated;
};
