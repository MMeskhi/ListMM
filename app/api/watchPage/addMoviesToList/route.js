import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { movieId, title, image, userId } = body;

  try {
    const moviesCount = await prisma.movie.count({ where: { userId } });

    const movie = await prisma.movie.create({
      data: {
        id: String(movieId),
        title,
        image,
        userId,
        order: moviesCount + 1,
      },
    });

    return new Response(
      JSON.stringify({ message: "Movie added to WatchList", movie }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to add movie to WatchList" }),
      { status: 500 }
    );
  }
}
