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
    console.log("body: " + JSON.stringify(body, null, 1));

    // const chatCompletion = await openai.createChatCompletion({
    //   model: "gpt-3.5-turbo",
    //   messages: [
    //     {
    //       role: "user",
    //       content: "Can you generate text for a meme related to JavaScript",
    //     },
    //   ],
    // });

    //   console.log(chatCompletion.data.choices[0].message.content);
    // const response = chatCompletion.data.choices[0].message.content;

    return NextResponse.json({ message: "This Worked", success: true });
  }
}
