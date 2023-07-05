/*
  Warnings:

  - Added the required column `image` to the `Column` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Column" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "image" TEXT NOT NULL
);
INSERT INTO "new_Column" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "Column";
DROP TABLE "Column";
ALTER TABLE "new_Column" RENAME TO "Column";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
