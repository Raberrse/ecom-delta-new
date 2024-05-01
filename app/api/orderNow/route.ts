import prisma from "@/lib/prismaClient";
import { createClient } from "@/utils/supabase/server";
import { NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const cartItems = await req.json();
  
  const supabase = createClient();
  const userId = (await supabase.auth.getUser()).data?.user?.id; 

  try {
    const order = await prisma.orders.create({
      data: {
        user_id: userId || '',
        details: cartItems, 
      },
    });
    console.log(order)

    return new NextResponse(JSON.stringify(order), {
        status: 201,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  } catch (error) {
    console.error('Failed to create order:', error);
    return new NextResponse(JSON.stringify({ error: "Failed to create order" }), {
        status: 500,
        headers: {
            'Content-Type': 'application/json',
        },
    });
  }
}


/*
{
  cartItems: [
    {
      id: 'd31b4beb-e2c4-4b48-b3b3-3455c726c9b3',
      name: 'Sunglasses',
      price: '24.99',
      image_url: 'https://m.media-amazon.com/images/I/71BibFdowCL._AC_UY1000_.jpg'
    },
    {
      id: '65a76e9d-2e0a-48b7-b2f0-074dfff15f5e',
      name: 'Running Shoes',
      price: '89.99',
      image_url: 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/ca929f7e-f433-46b7-8d83-1a6171c172ce/revolution-7-easyon-mens-road-running-shoes-Wsqj83.png'
    },
    {
      id: '998dc613-a44d-4ddf-b7cc-0f8b63dd95c6',
      name: 'E-book',
      price: '129.99',
      image_url: 'https://i.pcmag.com/imagery/roundups/05iDYFESVlhBiq5t0L7LDpU-13..v1639759771.jpg'
    },
    {
      id: 'c49729ad-eb94-42ca-9b23-44a73f1c2da1',
      name: 'Wireless Mouse',
      price: '29.95',
      image_url: 'https://m.media-amazon.com/images/I/51sL3ZYNqKS.jpg'
    }
  ]
}

*/