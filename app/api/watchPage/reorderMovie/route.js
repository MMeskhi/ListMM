import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { movies, userId } = body;

  try {
    for (let i = 0; i < movies.length; i++) {
      await prisma.movie.update({
        where: {
          userId_id: {
            userId: userId,
            id: movies[i].id,
          },
        },
        data: { order: i + 1 },
      });
    }

    return new Response(
      JSON.stringify({ message: "Movies order updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to update movies order" }),
      { status: 500 }
    );
  }
}
