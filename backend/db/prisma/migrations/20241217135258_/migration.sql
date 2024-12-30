-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_ownerId_fkey";

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "TeacherCourseStore"("storeId") ON DELETE RESTRICT ON UPDATE CASCADE;
