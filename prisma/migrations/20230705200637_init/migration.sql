/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `ColumnTags` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ColumnTags_slug_key" ON "ColumnTags"("slug");
