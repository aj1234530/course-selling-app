/*
  Warnings:

  - You are about to drop the column `courseId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_rootCourseContentDirectoryId_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_rootCourseContentDirectoryId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_rootCourseContentDirectoryId_fkey";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "courseId";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "rootCourseContentDirectoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "rootCourseContentDirectoryId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "rootCourseContentDirectoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
