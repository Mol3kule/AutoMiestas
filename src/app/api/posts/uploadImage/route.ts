import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import { UTApi } from 'uploadthing/server';

export const POST = async (request: NextRequest) => {
    try {
        const { userId } = auth();
        if (!userId) {
            return NextResponse.json({ status: 401, message: 'Unauthorized' });
        }

        const utapi = new UTApi();
        const formData = await request.formData();

        const files: any = [];

        formData.forEach((value) => {
            files.push(value);
        });
        const uploadResponse = await utapi.uploadFiles(files);

        return NextResponse.json({ status: 200, data: uploadResponse });
    } catch (error) {
        console.log(`[uploadImage]: ${error}`)
        return NextResponse.json({ status: 500 });
    }
}