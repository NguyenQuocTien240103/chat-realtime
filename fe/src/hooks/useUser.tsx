// hooks/useAuth.ts
import { useEffect, useState } from "react";
import fetchApi from "../utils/fetchApi";

export type User = {
  id: number;
  avatar?: string;
  email: string;
};
export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () =>{
      try {
        const res = await fetchApi( `${import.meta.env.VITE_API_BASE_URL}/auth/getUser`,
          {
            method: "GET"
          })
        const result = await res.json();
        console.log("aaaa",result);
        if(!result.data){
          return;
        }

        setUser(result.data);

      } catch (error: any) {
        console.log("error", error);
      }
  }
  useEffect(() => {
    getUser();
  }, []);

  return { user, setUser };
};
