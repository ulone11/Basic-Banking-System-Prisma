/*
  Warnings:

  - You are about to drop the column `identity_number` on the `profiles` table. All the data in the column will be lost.
  - You are about to drop the column `identity_type` on the `profiles` table. All the data in the column will be lost.
  - Added the required column `phone_number` to the `profiles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profiles" DROP COLUMN "identity_number",
DROP COLUMN "identity_type",
ADD COLUMN     "phone_number" INTEGER NOT NULL;
