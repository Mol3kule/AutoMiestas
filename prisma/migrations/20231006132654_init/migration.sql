-- CreateTable
CREATE TABLE `make_models` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `make_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `make_models` ADD CONSTRAINT `make_models_make_id_fkey` FOREIGN KEY (`make_id`) REFERENCES `makes`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
