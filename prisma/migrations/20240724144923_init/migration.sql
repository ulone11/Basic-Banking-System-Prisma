/*
  Warnings:

  - You are about to drop the column `bank_account_number` on the `bank_accounts` table. All the data in the column will be lost.
  - You are about to drop the column `bank_name` on the `bank_accounts` table. All the data in the column will be lost.
  - Added the required column `account_name` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_number` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `bank_accounts` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "bank_accounts" DROP COLUMN "bank_account_number",
DROP COLUMN "bank_name",
ADD COLUMN     "account_name" TEXT NOT NULL,
ADD COLUMN     "account_number" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "transactions" ALTER COLUMN "date" SET DEFAULT CURRENT_TIMESTAMP;
