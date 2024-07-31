-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "groupId" TEXT;

-- CreateTable
CREATE TABLE "group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "positions" TEXT NOT NULL,

    CONSTRAINT "group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "group_id_key" ON "group"("id");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "group"("id") ON DELETE SET NULL ON UPDATE CASCADE;
