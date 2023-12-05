import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req) {
  const body = await req.json();

  const { albumId, title, image, userId } = body;

  try {
    const albumsCount = await prisma.album.count({ where: { userId } });

    const album = await prisma.album.create({
      data: {
        id: String(albumId),
        title,
        image,
        userId,
        order: albumsCount + 1,
      },
    });

    return new Response(
      JSON.stringify({ message: "Album added to List", album }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to add album to List" }),
      { status: 500 }
    );
  }
}
