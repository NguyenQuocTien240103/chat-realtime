import { Routes, Route } from "react-router";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import NotFound from "../pages/NotFound";
import Home from "../pages/home";
import Messages from "../pages/messages";
import DashBoardLayout from "../layouts/DashBoardLayout";
import DefaultLayout from "../layouts/DefaultLayout";
import PrivateRoute from "./PrivateRoute";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/" element={<DashBoardLayout />}>
          <Route index element={<Home />} />
          <Route path="/messages" element={<Messages />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AllRoutes;
