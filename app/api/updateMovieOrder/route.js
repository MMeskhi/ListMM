import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { movies } = body;

  try {
    for (let i = 0; i < movies.length; i++) {
      try {
        await prisma.movie.update({
          where: { id: String(movies[i].id), userId: movies[i].userId },
          data: { order: i },
        });
      } catch (error) {
        console.error(
          `Failed to update order of movie with id ${movies[i].id}: ${error}`
        );
      }
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
