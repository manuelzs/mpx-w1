import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { uid } = body;
  const secretKey = process.env.JWT_SECRET || "test";
  const token = jwt.sign({ uid }, secretKey);
  return NextResponse.json({ token, body }, { status: 201 });
}
