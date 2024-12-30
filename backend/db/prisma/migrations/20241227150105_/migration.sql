/*
  Warnings:

  - You are about to drop the column `Thumbnail` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `teachersName` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `courseStoreExists` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CourseContent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TeacherCourseStore` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_UserCourses` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[adminId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `adminId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseDescription` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `courseTitle` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_ownerId_fkey";

-- DropForeignKey
ALTER TABLE "CourseContent" DROP CONSTRAINT "CourseContent_courseId_fkey";

-- DropForeignKey
ALTER TABLE "TeacherCourseStore" DROP CONSTRAINT "TeacherCourseStore_storeId_fkey";

-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserCourses" DROP CONSTRAINT "_UserCourses_B_fkey";

-- DropIndex
DROP INDEX "User_id_key";

-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Thumbnail",
DROP COLUMN "description",
DROP COLUMN "ownerId",
DROP COLUMN "price",
DROP COLUMN "teachersName",
DROP COLUMN "title",
ADD COLUMN     "adminId" TEXT NOT NULL,
ADD COLUMN     "courseDescription" TEXT NOT NULL,
ADD COLUMN     "courseTitle" TEXT NOT NULL,
ADD COLUMN     "courseValidity" TIMESTAMP(3),
ADD COLUMN     "thumbnai" TEXT NOT NULL DEFAULT 'keep default url here if there is no image upload';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "courseStoreExists";

-- DropTable
DROP TABLE "CourseContent";

-- DropTable
DROP TABLE "TeacherCourseStore";

-- DropTable
DROP TABLE "_UserCourses";

-- CreateTable
CREATE TABLE "Admin" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'username',
    "password" TEXT NOT NULL DEFAULT 'password',

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RootCourseContentDirectory" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,

    CONSTRAINT "RootCourseContentDirectory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Folder" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "rootCourseContentDirectoryId" TEXT NOT NULL,
    "courseId" TEXT,

    CONSTRAINT "Folder_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Video" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "rootCourseContentDirectoryId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,

    CONSTRAINT "Video_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "rootCourseContentDirectoryId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Notes" (
    "id" TEXT NOT NULL,
    "rootCourseContentDirectoryId" TEXT NOT NULL,
    "folderId" TEXT NOT NULL,

    CONSTRAINT "Notes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_UserCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_UserCourse_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Admin_password_key" ON "Admin"("password");

-- CreateIndex
CREATE UNIQUE INDEX "RootCourseContentDirectory_courseId_key" ON "RootCourseContentDirectory"("courseId");

-- CreateIndex
CREATE UNIQUE INDEX "Folder_rootCourseContentDirectoryId_key" ON "Folder"("rootCourseContentDirectoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Video_rootCourseContentDirectoryId_key" ON "Video"("rootCourseContentDirectoryId");

-- CreateIndex
CREATE UNIQUE INDEX "Link_rootCourseContentDirectoryId_key" ON "Link"("rootCourseContentDirectoryId");

-- CreateIndex
CREATE INDEX "_UserCourse_B_index" ON "_UserCourse"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Course_id_key" ON "Course"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Course_adminId_key" ON "Course"("adminId");

-- CreateIndex
CREATE UNIQUE INDEX "User_password_key" ON "User"("password");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "Admin"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RootCourseContentDirectory" ADD CONSTRAINT "RootCourseContentDirectory_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Folder" ADD CONSTRAINT "Folder_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_rootCourseContentDirectoryId_fkey" FOREIGN KEY ("rootCourseContentDirectoryId") REFERENCES "RootCourseContentDirectory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourse" ADD CONSTRAINT "_UserCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserCourse" ADD CONSTRAINT "_UserCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
