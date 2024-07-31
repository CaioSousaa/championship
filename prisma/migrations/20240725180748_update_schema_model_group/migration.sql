-- AlterTable
ALTER TABLE "group" ADD COLUMN     "clashes" TEXT[],
ADD COLUMN     "rounds" INTEGER NOT NULL DEFAULT 0;
