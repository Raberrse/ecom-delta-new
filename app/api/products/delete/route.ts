import prisma from '@/lib/prismaClient';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function DELETE(req: NextRequest) {
    try {
        const id  = await req.json();
        await prisma.products.delete({
          where: { id: id },
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
