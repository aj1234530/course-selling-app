-- CreateTable
CREATE TABLE "CourseContent" (
    "id" TEXT NOT NULL,
    "courseId" TEXT NOT NULL,
    "videos" TEXT[],
    "pdfs" TEXT[],
    "links" TEXT[],

    CONSTRAINT "CourseContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CourseContent_courseId_key" ON "CourseContent"("courseId");

-- AddForeignKey
ALTER TABLE "CourseContent" ADD CONSTRAINT "CourseContent_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
