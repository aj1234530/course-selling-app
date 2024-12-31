/*
  Warnings:

  - You are about to drop the column `thumbnai` on the `Course` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "thumbnai",
ADD COLUMN     "thumbnailUrl" TEXT DEFAULT 'keep default url here if there is no image upload';
