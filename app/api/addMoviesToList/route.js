import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function POST(req) {
  const { movieId, title, poster_path, userId } = req.body;

  console.log(movieId, title, poster_path, userId);

  try {
    const movie = await prisma.movie.create({
      data: {
        id: movieId,
        title,
        poster_path,
        userId,
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
