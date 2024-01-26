import { NextRequest, NextResponse } from 'next/server';
import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { auth } from '@clerk/nextjs';
import { PostImage } from '@/types/post.type';

const s3Client = new S3Client({
    region: process.env.S3_REGION,
    credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY!,
        secretAccessKey: process.env.S3_SECRET_KEY!
    }
});

const uploadFileToS3 = async (userId: string, image: PostImage) => {
    const imageUrl = image.url.replace(`https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/`, '').replace(/^.*?\//, '');
    const params = {
        Bucket: process.env.S3_BUCKET_NAME!,
        Key: `${userId}/${imageUrl}`
    };

    const command = new DeleteObjectCommand(params);
    await s3Client.send(command);
}

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const { images }: { images: PostImage[] } = await request.json();
        if (!images.length) {
            return NextResponse.json({ status: 400, message: 'No files uploaded' });
        }

        await Promise.all(images.map(async (image) => {
            try {
                await uploadFileToS3(userId, image);
            } catch (error) {
                console.log(error);
                return NextResponse.json({ status: 500 });
            }
        }));

        return NextResponse.json({ status: 200 });
    } catch (error) {
        console.log(`[uploadImage]: ${error}`)
        return NextResponse.json({ status: 500 });
    }
}