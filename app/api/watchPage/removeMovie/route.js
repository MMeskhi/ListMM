import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { movieId, userId } = body;

  try {
    await prisma.movie.delete({
      where: {
        userId_id: {
          userId: userId,
          id: movieId,
        },
      },
    });
    return new Response(
      JSON.stringify({ message: "Movie removed from List" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to remove movie from List" }),
      { status: 500 }
    );
  }
}
