import prisma from '@/lib/prismaClient';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';


export async function DELETE(req: NextRequest) {
    try {
        const id  = await req.json();
        await prisma.products.delete({
          where: { id: id },
        });
        return new NextResponse(JSON.stringify(id)), {
            status: 201,
            headers: {
                'Content-Type': 'application/json',
            },
        };
    } catch (error) {
        return new NextResponse(JSON.stringify({ error: "Failed to create product" }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
