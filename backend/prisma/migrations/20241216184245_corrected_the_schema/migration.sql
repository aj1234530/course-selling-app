/*
  Warnings:

  - You are about to drop the column `courseId` on the `TeacherCourseStore` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `TeacherCourseStore` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[ownerId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teacherId]` on the table `TeacherCourseStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teacherId` to the `TeacherCourseStore` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeacherCourseStore" DROP CONSTRAINT "TeacherCourseStore_userId_fkey";

-- DropIndex
DROP INDEX "TeacherCourseStore_userId_key";

-- AlterTable
ALTER TABLE "TeacherCourseStore" DROP COLUMN "courseId",
DROP COLUMN "userId",
ADD COLUMN     "teacherId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "courseId";

-- CreateIndex
CREATE UNIQUE INDEX "Course_ownerId_key" ON "Course"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherCourseStore_teacherId_key" ON "TeacherCourseStore"("teacherId");

-- AddForeignKey
ALTER TABLE "TeacherCourseStore" ADD CONSTRAINT "TeacherCourseStore_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
