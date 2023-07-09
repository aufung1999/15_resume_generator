import { getServerSession } from "next-auth";
import { openai } from "../../../utils/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";
import extractTerms from "@/app/analyse/Functions/extractTerms";

export interface IGetUserAuthInfoRequest extends NextApiRequest {
  json: any; // or any other type
}

export async function POST(req: IGetUserAuthInfoRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();

    const { input_data, user_data } = body;

    const statement_1 = input_data;
    // const statement_2 = Object.values(user_data);
    const statement_2 = user_data;

    console.log("*****************************");
    console.log(statement_1);
    console.log("*****************************");
    console.log(JSON.stringify(statement_2, null, 1));
    console.log("*****************************");

    //----------------------Cost Money--------------------Careful---------------------

    let temp_arr: any[] = [];
    let chatCompletion: any;
    return Promise.all(
      //NEED to delete .slice function
      // statement_2.slice(0,1).map((each: any) =>
      statement_2.map((each: any) =>
        Promise.all(
          // input_data.slice(0,1).map(async (each_input: string) => {
          input_data.map(async (each_input: string) => {
            chatCompletion = await openai.createChatCompletion({
              model: "gpt-3.5-turbo",
              messages: [
                {
                  role: "user",
                  content: `Are "${each.JobDescription}" and "${each_input}" similar. Answer in Yes or No Only`,
                },
              ],
            });

            if (
              extractTerms(
                chatCompletion?.data.choices[0].message.content,
                "cleanup"
              ) === "Yes"
            ) {
              temp_arr.push({
                match_index_1st: each.index_1st,
                match_index_2nd: each.index_2nd,
                user_data: each.JobDescription,
                match_sentence: each_input,
                usage: chatCompletion?.data.usage.total_tokens,
              });
            }
          })
        )
      )
    ).then((values) => {
      console.log(temp_arr);
      return NextResponse.json(temp_arr);
    });

    // console.log(temp_arr);
    // try {
    // const response = await chatCompletion?.data;
    // return NextResponse.json(response);
    //   } catch (err) {
    //     res.status(500).json({ error: "failed to load data" });
    //   }
  }
}
