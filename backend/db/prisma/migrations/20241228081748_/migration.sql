-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_rootCourseContentDirectoryId_fkey";

-- DropIndex
DROP INDEX "Course_adminId_key";

-- AlterTable
ALTER TABLE "Folder" ALTER COLUMN "rootCourseContentDirectoryId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("courseId") ON DELETE SET NULL ON UPDATE CASCADE;
