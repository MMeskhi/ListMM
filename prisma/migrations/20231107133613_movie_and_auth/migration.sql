/*
  Warnings:

  - You are about to drop the column `poster` on the `Movie` table. All the data in the column will be lost.
  - Added the required column `poster_path` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" DROP COLUMN "poster",
ADD COLUMN     "poster_path" TEXT NOT NULL;
