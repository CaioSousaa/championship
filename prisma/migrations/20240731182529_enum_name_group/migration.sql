/*
  Warnings:

  - Changed the type of `name` on the `group` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NameGroups" AS ENUM ('GrupoA', 'GrupoB', 'GrupoC', 'GrupoD', 'GrupoE', 'GrupoF', 'GrupoG', 'GrupoH');

-- AlterTable
ALTER TABLE "group" DROP COLUMN "name",
ADD COLUMN     "name" "NameGroups" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "group_name_key" ON "group"("name");
