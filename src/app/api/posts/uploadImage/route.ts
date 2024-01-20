import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs';

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
    }
});

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
}

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const formData = await request.formData();
        const files: File[] = [];

        formData?.forEach((value) => {
            files.push(value as File);
        });

        if (!files) {
            return NextResponse.json({ status: 400, message: 'No files uploaded' });
        }

        const imageUrls: string[] = [];

        await Promise.all(files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer());
            const imageUrl = await uploadFileToS3(buffer, file.name, userId);
            imageUrls.push(imageUrl);
        }));

        return NextResponse.json({ status: 200, data: imageUrls });
    } catch (error) {
        console.log(`[uploadImage]: ${error}`)
        return NextResponse.json({ status: 500 });
    }
}