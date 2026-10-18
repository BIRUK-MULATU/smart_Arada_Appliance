-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DealOfWeek" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 1,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "endsAt" DATETIME NOT NULL,
    "image" TEXT NOT NULL DEFAULT ''
);
INSERT INTO "new_DealOfWeek" ("description", "endsAt", "id", "title") SELECT "description", "endsAt", "id", "title" FROM "DealOfWeek";
DROP TABLE "DealOfWeek";
ALTER TABLE "new_DealOfWeek" RENAME TO "DealOfWeek";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
