-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "roundOf16Id" TEXT;

-- CreateTable
CREATE TABLE "round_of_16" (
    "id" TEXT NOT NULL,
    "clashes" TEXT[],
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "round_of_16_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "round_of_16_id_key" ON "round_of_16"("id");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_roundOf16Id_fkey" FOREIGN KEY ("roundOf16Id") REFERENCES "round_of_16"("id") ON DELETE SET NULL ON UPDATE CASCADE;
