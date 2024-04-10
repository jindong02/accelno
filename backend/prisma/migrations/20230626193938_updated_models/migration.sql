/*
  Warnings:

  - Added the required column `price_id` to the `Plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stripe_customer_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Plan" ADD COLUMN     "price_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "stripe_customer_id" TEXT NOT NULL;
