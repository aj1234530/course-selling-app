/*
  Warnings:

  - Added the required column `teacherName` to the `TeacherCourseStore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TeacherCourseStore" ADD COLUMN     "teacherName" TEXT NOT NULL;
