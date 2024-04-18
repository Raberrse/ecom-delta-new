// app/products/put.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '@/lib/prismaClient';


export async function PUT(req: NextRequest) {
    try {
        const data = await req.json();
        const product = await prisma.products.update({
            where: { id: data.id },
            data: data,
        });
        return new NextResponse(JSON.stringify(product), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to update product" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
