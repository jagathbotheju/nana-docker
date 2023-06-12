import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany();
    if (!users) return null;

    return users;
  } catch (error) {
    console.log(error);
    return null;
  }
};
