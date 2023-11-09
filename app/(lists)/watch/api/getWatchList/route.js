import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const { userId } = await req.body;
  try {
    const movies = await prisma.movie.findMany({
      where: {
        userId,
      },
    });
    return new Response(JSON.stringify({ movies }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch watch list" }),
      { status: 500 }
    );
  }
}
