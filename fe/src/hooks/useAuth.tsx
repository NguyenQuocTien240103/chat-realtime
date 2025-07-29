import { useEffect, useState } from "react";
import { useUserContext } from "../context/UserContext";
import fetchApi from "../utils/fetchApi";


export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { setUser } = useUserContext();
  
  const getUser = async () =>{
        try {
          const res = await fetchApi( `${import.meta.env.VITE_API_BASE_URL}/auth/getUser`,
            {
              method: "GET"
            })
  
          if(res.status == 401){
            setIsAuthenticated(false);
          } 
  
          const result = await res.json();
  
          if(!result.data) return;

          setIsAuthenticated(true);
          setUser(result.data);
        } catch (error: any) {
          console.log("error", error);
        }
    }

  useEffect(() => {
    const token = localStorage.getItem("token");
    
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    else{
      getUser();
    }

  }, []);

  return isAuthenticated;
};
