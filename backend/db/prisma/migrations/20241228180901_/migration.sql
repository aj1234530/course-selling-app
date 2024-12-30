/*
  Warnings:

  - Made the column `rootCourseContentDirectoryId` on table `Folder` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_rootCourseContentDirectoryId_fkey";

-- DropIndex
DROP INDEX "Folder_rootCourseContentDirectoryId_key";

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "rootCourseContentDirectoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
