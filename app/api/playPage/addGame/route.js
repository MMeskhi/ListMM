import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { gameId, title, image, url, userId } = body;

  try {
    const gamesCount = await prisma.game.count({ where: { userId } });

    const game = await prisma.game.create({
      data: {
        id: String(gameId),
        title,
        image,
        url,
        userId,
        order: gamesCount + 1,
      },
    });

    return new Response(
      JSON.stringify({ message: "Game added to List", game }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to add game to List" }),
      { status: 500 }
    );
  }
}
