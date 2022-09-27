/*
  Warnings:

  - Added the required column `storyProtocol` to the `tb_story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_story" ADD COLUMN     "storyProtocol" TEXT NOT NULL;
