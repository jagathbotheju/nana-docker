import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

interface Props {
  params: {
    id: string;
  };
}

export async function DELETE(request: Request, { params }: Props) {
  try {
    const { id } = params;
    if (!id) return NextResponse.json({ error: "User ID not found" });
    const deletedUser = await prisma.user.deleteMany({
      where: {
        id,
      },
    });
    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Internal Server Error" });
  }
}
