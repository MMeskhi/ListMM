import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { userId } = await body;

  try {
    const games = await prisma.game.findMany({
      where: { userId },
      orderBy: { order: "asc" },
    });
    return new Response(JSON.stringify({ games }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Failed to fetch List" }), {
      status: 500,
    });
  }
}
