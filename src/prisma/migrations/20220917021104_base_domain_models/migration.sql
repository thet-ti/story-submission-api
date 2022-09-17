-- CreateTable
CREATE TABLE "tb_writer" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,

    CONSTRAINT "tb_writer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_writer_validation" (
    "id" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "isConfirmed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_writer_validation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_story" (
    "id" TEXT NOT NULL,
    "writerId" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "synopsis" VARCHAR(1000) NOT NULL,
    "googleDriveId" TEXT,
    "isCompleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_story_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_writer_validation_writerId_key" ON "tb_writer_validation"("writerId");

-- CreateIndex
CREATE UNIQUE INDEX "tb_writer_validation_code_key" ON "tb_writer_validation"("code");

-- AddForeignKey
ALTER TABLE "tb_writer_validation" ADD CONSTRAINT "tb_writer_validation_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "tb_writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_story" ADD CONSTRAINT "tb_story_writerId_fkey" FOREIGN KEY ("writerId") REFERENCES "tb_writer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
