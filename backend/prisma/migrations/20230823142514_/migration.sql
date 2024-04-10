-- AlterTable
ALTER TABLE "User" ADD COLUMN     "plan_id" INTEGER,
ADD COLUMN     "stripe_subscription_expiry" TIMESTAMP(3),
ADD COLUMN     "stripe_subscription_id" TEXT,
ADD COLUMN     "stripe_subscription_status" TEXT;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_plan_id_fkey" FOREIGN KEY ("plan_id") REFERENCES "Plan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
