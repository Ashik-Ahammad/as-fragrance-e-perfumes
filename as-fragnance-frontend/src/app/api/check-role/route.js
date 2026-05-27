import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function GET(request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    const email = session?.user?.email;

    if (!email) {
      return NextResponse.json({ role: "user" });
    }

    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-role?email=${encodeURIComponent(email)}`,
      {
        headers: {
          "x-internal-key":
            process.env.INTERNAL_API_KEY || "as-fragrance-internal",
        },
      },
    );

    if (backendRes.ok) {
      const data = await backendRes.json();
      return NextResponse.json({ role: data.role || "user" });
    }

    return NextResponse.json({ role: "user" });
  } catch (error) {
    console.error("Role API Error:", error);
    return NextResponse.json({ role: "user" });
  }
}
