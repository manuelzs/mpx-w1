import { NextResponse, NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const secretKey = process.env.JWT_SECRET || "test";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token } = body;
    const claims = jwt.verify(token, secretKey);
    return NextResponse.json(claims, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 401 });
  }
}
