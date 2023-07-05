/*
  Warnings:

  - Added the required column `image` to the `MealHistory` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Column" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "createdAt" DATETIME NOT NULL,
    "content" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ColumnTags" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "columnId" TEXT,
    CONSTRAINT "ColumnTags_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "Column" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MealHistory" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "image" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'Morning',
    "createdAt" DATETIME NOT NULL,
    CONSTRAINT "MealHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_MealHistory" ("createdAt", "id", "type", "userId") SELECT "createdAt", "id", "type", "userId" FROM "MealHistory";
DROP TABLE "MealHistory";
ALTER TABLE "new_MealHistory" RENAME TO "MealHistory";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
