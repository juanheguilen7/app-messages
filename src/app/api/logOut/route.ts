import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";


export const POST = async (req: NextRequest, res: NextResponse) => {
    try {
        cookies().delete('authToken');
        return new NextResponse('session cerrada', { status: 200 })
    } catch (error) {
        console.error(error)
        return new NextResponse('error al cerrar la session', { status: 500 })
    }
} 