import { prisma } from "./prisma.server";
import {  Prisma } from "@prisma/client";

export const createModel = async (
  title: string,
  message: string,
  userId: number,
) => {
  await prisma.model.create({
    data: {
      message,
      title,
      author: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const getFilteredModel = async (
  userId: number,
  sortFilter: Prisma.ModelOrderByWithRelationInput,
  whereFilter: Prisma.ModelWhereInput
) => {
  return await prisma.model.findMany({
    select: {
      id: true,
      message: true,
      author: {
        select: {
          profile: true,
        },
      },
    },
    orderBy: {
      ...sortFilter,
    },
    where: {
      ...whereFilter,
    },
  });
};

export const getRecentModel = async () => {
  return await prisma.model.findMany({
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
   
  });
};