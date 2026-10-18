-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Brand" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "logo" TEXT NOT NULL DEFAULT '/placeholder.svg',
    "sortOrder" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_Brand" ("id", "name", "sortOrder") SELECT "id", "name", "sortOrder" FROM "Brand";
DROP TABLE "Brand";
ALTER TABLE "new_Brand" RENAME TO "Brand";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
