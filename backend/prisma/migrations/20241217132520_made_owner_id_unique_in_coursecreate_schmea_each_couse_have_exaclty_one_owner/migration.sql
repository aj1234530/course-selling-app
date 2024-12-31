/*
  Warnings:

  - A unique constraint covering the columns `[ownerId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Course_ownerId_key" ON "Course"("ownerId");
