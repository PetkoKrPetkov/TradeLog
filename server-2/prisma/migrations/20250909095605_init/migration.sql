-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Trade" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "_ownerId" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "trade_direction" TEXT NOT NULL,
    "entry" REAL NOT NULL,
    "exit" REAL NOT NULL,
    "volume" INTEGER NOT NULL,
    "support" TEXT,
    "ma" TEXT,
    "price_action" TEXT,
    "oscilators" TEXT,
    "_createdOn" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Trade__ownerId_fkey" FOREIGN KEY ("_ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tradeId" TEXT NOT NULL,
    "_ownerId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "_createdOn" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "Comment_tradeId_fkey" FOREIGN KEY ("tradeId") REFERENCES "Trade" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Comment__ownerId_fkey" FOREIGN KEY ("_ownerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
