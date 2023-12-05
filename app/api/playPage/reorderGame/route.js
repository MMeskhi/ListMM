import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { games, userId } = body;

  try {
    for (let i = 0; i < games.length; i++) {
      await prisma.game.update({
        where: {
          userId_id: {
            userId: userId,
            id: games[i].id,
          },
        },
        data: { order: i + 1 },
      });
    }

    return new Response(
      JSON.stringify({ message: "Games order updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to update games order" }),
      { status: 500 }
    );
  }
}
