"use server";

import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs';
import { PostImage } from '@/types/post.type';

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
    }
});

export const uploadImages = async (imageFormData: FormData) => {
    try {
        const { userId } = auth();

        if (!userId) {
            return { status: 401, message: 'Unauthorized' };
        }

        const files: File[] = [];

        imageFormData?.forEach((value) => {
            files.push(value as File);
        });

        if (!files || !files.length) {
            return { status: 400, message: 'No files uploaded' };
        }

        const imageUrls: string[] = [];

        await Promise.all(files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const imageUrl = await uploadFileToS3(buffer, file.name, userId);
            imageUrls.push(imageUrl);
        }));

        return { status: 200, data: imageUrls };
    } catch (error) {
        console.log(`[uploadImages]: ${error}`)
        return { status: 500 };
    }
};

export const deleteImages = async (images: PostImage[]) => {
    const { userId } = auth();

    if (!userId) {
        return { status: 401, message: 'Unauthorized' };
    }

    if (!images.length) {
        return { status: 400, message: 'No files uploaded' };
    }

    await Promise.all(images.map(async (image) => {
        try {
            await deleteFileFromS3(userId, image);
        } catch (error) {
            console.log(`[deleteImages]: ${error}`)
            return { status: 500 };
        }
    }));

    return { status: 200 };
}

const uploadFileToS3 = async (file: Buffer, filename: string, userId: string) => {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `${userId}/${Date.now()}-${filename}`,
        Body: file,
        ContentType: "image/*"
    };

    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${params.Key}`;
    return imageUrl;
};

const deleteFileFromS3 = async (userId: string, image: PostImage) => {
    const imageUrl = image.url.replace(`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/`, '').replace(/^.*?\//, '');
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `${userId}/${imageUrl}`
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
};