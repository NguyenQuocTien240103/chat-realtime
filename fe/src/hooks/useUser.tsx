// import { useEffect, useState } from "react";
// import fetchApi from "../utils/fetchApi";
// import { useNavigate } from "react-router-dom";

// export type User = {
//   id: number;
//   avatar?: string;
//   email: string;
// };

// export const useUser = () => {
//   const [user, setUser] = useState<User | null>(null);
//   const navigate = useNavigate();
  
//   const redirectToLogin = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//     return;
//   };

//   const getUser = async () =>{
//       try {
//         const res = await fetchApi( `${import.meta.env.VITE_API_BASE_URL}/auth/getUser`,
//           {
//             method: "GET"
//           })

//         if(res.status == 401){
//           redirectToLogin(); 
//         } 

//         const result = await res.json();

//         if(!result.data) return;

//         setUser(result.data);
//       } catch (error: any) {
//         console.log("error", error);
//       }
//   }
  
//   useEffect(() => {
//     getUser();
//   }, []);

//   return { user, setUser };
// };
