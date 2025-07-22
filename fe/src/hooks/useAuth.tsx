import { useEffect, useState } from "react";

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // test icon progress
      // setTimeout(() => {
      // }, 3000);
      setIsAuthenticated(false);
      return;
    }
    // setTimeout(()=>{
      setIsAuthenticated(true);
    // },3000)
  }, []);

  return isAuthenticated;
};
