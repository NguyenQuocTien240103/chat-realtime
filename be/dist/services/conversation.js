"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("../models"));
const conversationService = {
    getList: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const allUsers = yield models_1.default.user.findMany({
                where: {
                    NOT: {
                        id: user.id,
                    }
                },
            });
            if (allUsers.length === 0 || !allUsers) {
                return [];
            }
            // get room message orderby createAt
            const userRooms = yield models_1.default.userRoom.findMany({
                where: {
                    userId: user.id,
                },
                include: {
                    room: {
                        include: {
                            messages: {
                                orderBy: { createAt: "desc" },
                                take: 1,
                            },
                            userRooms: {
                                include: { user: true },
                            }
                        }
                    }
                }
            });
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
                const friend = friendUserRoom === null || friendUserRoom === void 0 ? void 0 : friendUserRoom.user;
                const lastMessage = room.messages[0];
                if (!friend)
                    return null;
                return {
                    user: friend,
                    roomId: room.id,
                    lastMessage: (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.content) || null,
                    lastMessageAt: (lastMessage === null || lastMessage === void 0 ? void 0 : lastMessage.createAt) || null,
                };
            });
            const friendsWithMessages = mapped
                .filter(item => item !== null)
                .sort((a, b) => {
                if (!a.lastMessageAt)
                    return 1;
                if (!b.lastMessageAt)
                    return -1;
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
        }
        catch (error) {
            throw new Error("GetListConverstion is fail");
        }
    }),
    getDetail: (user, entity) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // check userExists
            const userExists = yield models_1.default.user.findFirst({
                where: {
                    id: entity.entityId,
                }
            });
            if (!userExists || userExists.id === user.id) {
                throw new Error("Get detail is fail");
            }
            // check roomExists
            const roomExists = yield models_1.default.room.findFirst({
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
            if (!roomExists) {
                const newRoom = yield models_1.default.room.create({
                    data: {
                        type: "private",
                        userRooms: {
                            create: [
                                { userId: user.id },
                                { userId: entity.entityId },
                            ]
                        }
                    },
                    include: {
                        userRooms: true,
                        messages: true,
                    }
                });
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
        }
        catch (error) {
            throw new Error("Get detail is fail");
        }
    }),
    getPrivateRoomDetail: (user, entity) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userExists = yield models_1.default.user.findFirst({
                where: {
                    id: entity.entityId,
                }
            });
            if (!userExists || userExists.id === user.id) {
                throw new Error("Get privateRoomDetail is fail");
            }
            const room = yield models_1.default.room.findFirst({
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
            if (!room) {
                return null;
            }
            return room;
        }
        catch (error) {
            throw new Error("Get privateRoomDetail is fail");
        }
    }),
};
exports.default = conversationService;
