/*
  Warnings:

  - The primary key for the `Movie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[userId,id]` on the table `Movie` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_pkey";

-- CreateIndex
CREATE UNIQUE INDEX "Movie_userId_id_key" ON "Movie"("userId", "id");
