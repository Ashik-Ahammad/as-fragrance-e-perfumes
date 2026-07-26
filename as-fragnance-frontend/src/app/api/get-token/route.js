import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  const cookieStore = await cookies();
  
  // Find any cookie containing "session_token" to be perfectly safe
  const allCookies = cookieStore.getAll();
  let token = null;
  for (const c of allCookies) {
    if (c.name.includes("session_token")) {
      token = c.value;
      break;
    }
  }

  return NextResponse.json({ token, debug: allCookies.map(c => c.name) });
}
