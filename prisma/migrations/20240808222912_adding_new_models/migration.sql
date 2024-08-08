-- AlterTable
ALTER TABLE "teams" ADD COLUMN     "finalId" TEXT,
ADD COLUMN     "quarterFinalsId" TEXT,
ADD COLUMN     "semiFinalId" TEXT;

-- CreateTable
CREATE TABLE "quarter_finals" (
    "id" TEXT NOT NULL,
    "clashes" TEXT[],
    "classified" TEXT[],
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "quarter_finals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "semifinal" (
    "id" TEXT NOT NULL,
    "clashes" TEXT[],
    "classified" TEXT[],
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "semifinal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Final" (
    "id" TEXT NOT NULL,
    "champion" TEXT NOT NULL,
    "clashes" TEXT[],
    "classified" TEXT[],
    "concluded" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Final_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "quarter_finals_id_key" ON "quarter_finals"("id");

-- CreateIndex
CREATE UNIQUE INDEX "semifinal_id_key" ON "semifinal"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Final_id_key" ON "Final"("id");

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_quarterFinalsId_fkey" FOREIGN KEY ("quarterFinalsId") REFERENCES "quarter_finals"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_semiFinalId_fkey" FOREIGN KEY ("semiFinalId") REFERENCES "semifinal"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teams" ADD CONSTRAINT "teams_finalId_fkey" FOREIGN KEY ("finalId") REFERENCES "Final"("id") ON DELETE SET NULL ON UPDATE CASCADE;
