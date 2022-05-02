/*
  Warnings:

  - Added the required column `dateAdded` to the `Favorite` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorite" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "spellId" TEXT NOT NULL,
    "spellName" TEXT NOT NULL,
    "dateAdded" TEXT NOT NULL
);
INSERT INTO "new_Favorite" ("id", "spellId", "spellName") SELECT "id", "spellId", "spellName" FROM "Favorite";
DROP TABLE "Favorite";
ALTER TABLE "new_Favorite" RENAME TO "Favorite";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
