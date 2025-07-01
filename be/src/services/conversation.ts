import prisma from "../models";
import { Prisma } from "@prisma/client";
import { EntitySchemaType } from "../validates/entity";
import { JwtPayload } from 'jsonwebtoken';

const conversationService = {
  getList: async (user: JwtPayload) => {
    try {
      const allUsers = await prisma.user.findMany({
        where:{
          NOT:{
            id: user.id,
          }
        },
      })

      if(allUsers.length === 0 || !allUsers){
        return [];
      }
      // get room message orderby createAt
      const userRooms = await prisma.userRoom.findMany({
        where: {
          userId: user.id,
        },
        include: {
            room:{
              include: {
                messages: {
                  orderBy: {createAt: "desc"},
                  take: 1,
                },
                userRooms:{ 
                  include: {user: true},
                }
              }
            }
        }
      })

      if (!userRooms || userRooms.length === 0) {
        return allUsers.map(user => ({
          user,
          roomId: null,
          lastMessage: null,
          lastMessageAt: null,
        }));
      }

      const mapped = userRooms.map((ur) => {
        const room = ur.room;
        const friendUserRoom = room.userRooms.find(u => u.userId !== user.id);
        const friend = friendUserRoom?.user;
        const lastMessage = room.messages[0];
      
        if (!friend) return null;
      
        return {
          user: friend,
          roomId: room.id,
          lastMessage: lastMessage?.content || null,
          lastMessageAt: lastMessage?.createAt || null,
        };
      });
      
      const friendsWithMessages = mapped
        .filter(item => item !== null)
        .sort((a, b) => {
          if (!a.lastMessageAt) return 1;
          if (!b.lastMessageAt) return -1;
          return new Date(b.lastMessageAt).getTime() - new Date(a.lastMessageAt).getTime();
        });

      const messagedUserIds = new Set(friendsWithMessages.map(f => f.user.id));

      const usersWithoutMessages = allUsers
        .filter(user => !messagedUserIds.has(user.id))
        .map(user => ({
          user,
          roomId: null,
          lastMessage: null,
          lastMessageAt: null,
        }));

      const finalList = [...friendsWithMessages, ...usersWithoutMessages];

      return finalList;
    } catch (error) {
      throw new Error("GetListConverstion is fail");
    }
  },
  getDetail: async (user: JwtPayload, entity: EntitySchemaType ) => {
    try {
      // check userExists
      const userExists = await prisma.user.findFirst({
        where: {
          id: entity.entityId,
        }
      })

      if(!userExists || userExists.id === user.id){
        throw new Error("Get detail is fail");
      }

      // check roomExists
      const roomExists = await prisma.room.findFirst({
        where: {
          AND: [
            {
              userRooms: {
                some: {
                  userId: user.id,
                },
              },
            },
            {
              userRooms: {
                some: {
                  userId: entity.entityId,
                },
              },
            },
          ],
        },
        include: {
          userRooms: true,
          messages: {
            include: {
              user: {
                select: {
                  id: true,
                  email: true,
                  avatar: true,
                }
              }
            }
          },
        },
        
      });

      if(!roomExists){
          const newRoom = await prisma.room.create({
          data:{
            type: "private",
            userRooms: {
              create: [
                {userId: user.id},
                {userId: entity.entityId},
              ]
            }
          },
          include:{
            userRooms: true,
            messages: true,
          }
        })
        return newRoom;
      }

      return roomExists;
      // if(roomExists){
      //   const roomId = roomExists.id;
      //   const messageRoom  = await prisma.message.findMany({
      //     where:{
      //       roomId: roomId,
      //     },
      //     include:{
      //       user: {
      //         select: {
      //           id: true,
      //           email: true,
      //           avatar: true,
      //         }
      //       }
      //     }
      //   })
      
      //   if(messageRoom.length === 0){
      //     return {
      //       roomId: roomExists.id,
      //       type: roomExists.type,
      //       name: roomExists.name,
      //     }
      //   }

      //   return messageRoom;
      // }
      
      // const newRoom = await prisma.room.create({
      //   data:{
      //     type: "private",
      //     userRooms: {
      //       create: [
      //         {userId: user.id},
      //         {userId: entity.entityId},
      //       ]
      //     }
      //   }
      // })
      // const result = {
      //   roomId: newRoom.id,
      //   type: newRoom.type,
      //   name: newRoom.name,
      // }
      // return result;
    } catch (error: any) {
      throw new Error("Get detail is fail");
    }
  },
  getPrivateRoomDetail: async (user: JwtPayload, entity: EntitySchemaType ) => {
    try {
      const userExists = await prisma.user.findFirst({
        where: {
          id: entity.entityId,
        }
      })

      if(!userExists || userExists.id === user.id){
        throw new Error("Get privateRoomDetail is fail");
      }

      const room = await prisma.room.findFirst({
        where: {
          userRooms: {
            some: {
              userId: user.id,
            },
          },
          AND: {
            userRooms: {
              some: {
                userId: entity.entityId,
              },
            },
          },
        },
        include: {
          userRooms: {
            include: {
              user: true,
            },
          },
        },
      });
      

      if(!room){
        return null;
      }

      return room;

    } catch (error: any) {
      throw new Error("Get privateRoomDetail is fail");
    }
  },
};

export default conversationService;
