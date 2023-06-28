import { getServerSession } from "next-auth";
import { openai } from "../../../utils/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();

    const { input_data, user_data } = body;

    const statement_1 = input_data;
    const statement_2 = Object.values(user_data);
    
    console.log("*****************************");
    console.log(statement_1);
    console.log("*****************************");
    console.log(statement_2);
    console.log("*****************************");

    //----------------------Cost Money--------------------Careful---------------------
    // try {
    //   const chatCompletion: any = await openai.createChatCompletion({
    //     model: "gpt-3.5-turbo",
    //     messages: [
    //       {
    //         role: "user",
    //         content: `if "${statement_1}" includes any of "${statement_2}".`,

    //       },
    //     ],
    //   });
    //   const response = await chatCompletion?.data;
    //   console.log(response);
    //   return NextResponse.json(response);
    // } catch (err) {
    //   res.status(500).json({ error: "failed to load data" });
    // }
  }
}
