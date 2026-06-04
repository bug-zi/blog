import { NextResponse } from "next/server";
import { getViewCount, incrementViewCount } from "@/lib/view-counter";

export const dynamic = "force-dynamic";

export async function GET() {
  const count = await getViewCount();

  return NextResponse.json({ count });
}

export async function POST() {
  const count = await incrementViewCount();

  return NextResponse.json({ count });
}
