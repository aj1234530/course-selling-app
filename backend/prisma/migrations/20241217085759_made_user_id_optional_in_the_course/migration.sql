/*
  Warnings:

  - You are about to drop the column `teacherId` on the `TeacherCourseStore` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[storeId]` on the table `TeacherCourseStore` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storeId` to the `TeacherCourseStore` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCourseStore" DROP CONSTRAINT "TeacherCourseStore_teacherId_fkey";

-- DropIndex
DROP INDEX "TeacherCourseStore_teacherId_key";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "Thumbnail" DROP NOT NULL,
ALTER COLUMN "userId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "TeacherCourseStore" DROP COLUMN "teacherId",
ADD COLUMN     "storeId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "TeacherCourseStore_storeId_key" ON "TeacherCourseStore"("storeId");

-- AddForeignKey
ALTER TABLE "TeacherCourseStore" ADD CONSTRAINT "TeacherCourseStore_storeId_fkey" FOREIGN KEY ("storeId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
