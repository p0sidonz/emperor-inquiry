export const runtime = 'edge'
import { PrismaClient } from '@prisma/client'
const client = new PrismaClient()

export async function POST(req: Request, res: Response) {

    const formData = await req.json();


    const { firstName, lastName, phone, email, isMember, isReturning } = formData

    try {

        //check if number is already in the database
        const existingUserInquiry = await client.userInquiry.findFirst({
            where: {
                phone: phone,
            },
        });

        if (existingUserInquiry) {
            //@ts-ignore
            return new Response(JSON.stringify({ status: 500, message: 'User inquiry already exists' }));
        }
        // Save form data to the database using Prisma
        const newUserInquiry = await client.userInquiry.create({
            data: {
                firstName: firstName,
                lastName: lastName || '',
                phone: phone || '',
                email: email || '',
                isMember: isMember || false,
                isReturning: isReturning || false,
            },
        });
        //@ts-ignore
        return new Response(JSON.stringify({ status: 201, message: 'Thank you!' }));

    } catch (error) {
        //@ts-ignore
        return new Response(JSON.stringify({ status: 500, message: error }));

    }


}



