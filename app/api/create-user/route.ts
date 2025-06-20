
import { syncUserWithDatabase } from "@/lib/syncUserWithDatabase";

export async function POST(req: Request) {
  const { role } = await req.json();

  if (!["STUDENT", "PYME"].includes(role)) {
    return new Response("Invalid role", { status: 400 });
  }

  try {
    await syncUserWithDatabase(role);
    return new Response("User created", { status: 200 });
  } catch (e) {
    console.error("Error syncing user:", e);
    return new Response("Error", { status: 500 });
  }
}
