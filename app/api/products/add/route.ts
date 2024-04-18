// app/products/post.ts
import prisma from '@/lib/prismaClient';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const product = await prisma.products.create({ data });
        return new NextResponse(JSON.stringify(product), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to create product" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
