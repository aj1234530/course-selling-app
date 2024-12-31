-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_rootCourseContentDirectoryId_fkey";

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("courseId") ON DELETE RESTRICT ON UPDATE CASCADE;
