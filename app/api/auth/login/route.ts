import connectDb from "@/mongoDb/connectDb";
import * as dotenv from 'dotenv';
import { NextRequest,NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from '../../../../models/userModel'
import jwt from 'jsonwebtoken'
dotenv.config();    
connectDb();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const { email, password} = reqBody;
            console.log(reqBody);

        if (!email || !password) {
            return NextResponse.json(
                { error: "Please provide email or password" },
                { status: 400 }
            );
        }

        //check if user exists or not
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "User doesn't exist" },
                { status: 401 }
            );
        }

        //check if passowrd is correct or not
        const isMatch = await bcryptjs.compare(password,user.password);


        if (!isMatch) {
            return NextResponse.json({ error: "invalid password" }, { status: 400 });
        }

        //generate token data
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        };

        //create token
        const token = await jwt.sign(tokenData, process.env.NEXTAUTH_JWT_SECRET!, {
            expiresIn: "1d",
        });

        const response = NextResponse.json({
            message: "Login successful",
            success: true,
        });

        response.cookies.set("token", token, { httpOnly: true });

      return response;


    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
     }
     }
