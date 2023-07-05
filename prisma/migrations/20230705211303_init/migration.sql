/*
  Warnings:

  - You are about to drop the column `columnId` on the `ColumnTags` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_ColumnToColumnTags" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_ColumnToColumnTags_A_fkey" FOREIGN KEY ("A") REFERENCES "Column" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_ColumnToColumnTags_B_fkey" FOREIGN KEY ("B") REFERENCES "ColumnTags" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ColumnTags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL
);
INSERT INTO "new_ColumnTags" ("id", "name", "slug") SELECT "id", "name", "slug" FROM "ColumnTags";
DROP TABLE "ColumnTags";
ALTER TABLE "new_ColumnTags" RENAME TO "ColumnTags";
CREATE UNIQUE INDEX "ColumnTags_slug_key" ON "ColumnTags"("slug");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_ColumnToColumnTags_AB_unique" ON "_ColumnToColumnTags"("A", "B");

-- CreateIndex
CREATE INDEX "_ColumnToColumnTags_B_index" ON "_ColumnToColumnTags"("B");
