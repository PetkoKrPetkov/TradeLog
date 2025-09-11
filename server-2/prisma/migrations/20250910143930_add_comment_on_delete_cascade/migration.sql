-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tradeId" TEXT NOT NULL,
    "_ownerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "_createdOn" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Comment_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Comment__ownerId_fkey" FOREIGN KEY ("_ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Comment" ("_createdOn", "_ownerId", "content", "id", "tradeId") SELECT "_createdOn", "_ownerId", "content", "id", "tradeId" FROM "Comment";
DROP TABLE "Comment";
ALTER TABLE "new_Comment" RENAME TO "Comment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
