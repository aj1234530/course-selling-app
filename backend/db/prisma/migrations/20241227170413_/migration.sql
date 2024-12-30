-- DropForeignKey
ALTER TABLE "Link" DROP CONSTRAINT "Link_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_folderId_fkey";

-- DropForeignKey
ALTER TABLE "Video" DROP CONSTRAINT "Video_folderId_fkey";

-- AlterTable
ALTER TABLE "Link" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Notes" ALTER COLUMN "folderId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Video" ALTER COLUMN "folderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Video" ADD CONSTRAINT "Video_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Link" ADD CONSTRAINT "Link_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"("id") ON DELETE SET NULL ON UPDATE CASCADE;
