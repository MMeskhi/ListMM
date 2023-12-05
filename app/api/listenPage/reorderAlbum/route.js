import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { albums, userId } = body;

  try {
    for (let i = 0; i < albums.length; i++) {
      await prisma.album.update({
        where: {
          userId_id: {
            userId: userId,
            id: albums[i].id,
          },
        },
        data: { order: i + 1 },
      });
    }

    return new Response(
      JSON.stringify({ message: "Albums order updated successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to update albums order" }),
      { status: 500 }
    );
  }
}
