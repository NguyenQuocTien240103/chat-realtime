import prisma from "../models";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import jwt, { JwtPayload } from 'jsonwebtoken';

const authService = {
  login: async (data: Prisma.UserCreateInput) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: data.email,
          password: data.password,
        },
      });

      if (!user) throw new Error("Invalid credentials");
      
      const { password, ...userData } = user; // remove field password
      const token = jwt.sign({ data: userData }, process.env.JWT_SECRET || "", {
        expiresIn: "7h",
      });
      const result = {
        ...userData,
        token,
      };
      return result;
    } catch (error) {
      throw new Error("Login is fail");
    }
  },
  register: async (data: Prisma.UserCreateInput) => {
    try {
      const user = await prisma.user.create({
        data,
      });
      const { password, ...userData } = user; // remove field password
      return userData;
    } catch (error: any) {

      if (error instanceof PrismaClientKnownRequestError) {

        if (error.code === "P2002") {
          throw new Error("Email is exist");
        }

      }

      throw new Error("Register is fail");
    }
  },
  getUser: async (data: JwtPayload) => {
    try {
      const user = await prisma.user.findFirst({
        where: {
          id: data.id,
        },
        select:{
          id: true,
          avatar: true,
          email:true,
        }
      });      
      
      if(!user) throw new Error("Get user is fail");
      
      return user;
    } catch (error: any) {
      throw new Error("Get user is fail");
    }
  },
};

export default authService;
