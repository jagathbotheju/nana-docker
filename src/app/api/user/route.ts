import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    if (!users) return NextResponse.json({ error: "Users Not Found" });

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, address } = body;
    const user = await prisma.user.create({
      data: {
        name,
        email,
        address,
      },
    });
    if (!user) return NextResponse.json({ error: "Could not create user" });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
