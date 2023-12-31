import { getServerSession } from "next-auth";
// import { openai } from "../../../../utils/openai";
import { NextApiRequest, NextApiResponse } from "next";
import { authOptions } from "../../auth/[...nextauth]/route";
import { NextRequest, NextResponse } from "next/server";
import extractTerms from "@/components/analyze/Functions/extractTerms";
import { Configuration, OpenAIApi } from "openai";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const session = await getServerSession(authOptions);

  if (session) {
    const body = await req.json();

    const { input_data, user_data, API_KEY } = body;

    //Chat GPT
    const configuration = new Configuration({
      apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    //------------------------------------------------------------------------------

    const statement_1 = input_data;
    // const statement_2 = Object.values(user_data);
    const statement_2 = user_data;

    process.env.NODE_ENV !== "production" &&
      console.log("*****************************");
    process.env.NODE_ENV !== "production" && console.log("Project");
    process.env.NODE_ENV !== "production" && console.log("Project");
    process.env.NODE_ENV !== "production" && console.log("Project");
    process.env.NODE_ENV !== "production" && console.log("Project");
    console.log("Project");
    console.log("Project");
    console.log("Project");
    console.log(statement_1);
    console.log("*****************************");
    console.log(JSON.stringify(statement_2, null, 1));
    console.log("*****************************");

    //----------------------Cost Money--------------------Careful---------------------

    let temp_arr: any[] = [];
    let total_usage = 0;
    let chatCompletion: any;

    return Promise.all(
      //NEED to delete .slice function
      // statement_2.slice(0,1).map((each: any) =>
      statement_2.map((each: any) =>
        Promise.all(
          // input_data.slice(0,1).map(async (each_input: string) => {
          input_data.map(async (each_input: string) => {
            //result here
            chatCompletion = await openai.createChatCompletion(
              {
                model: "gpt-3.5-turbo",
                messages: [
                  {
                    role: "user",
                    content: `Are "${each.ProjectDescription}" and "${each_input}" similar. Please think twice and Answer in Yes or No`,
                  },
                ],
              },
              { timeout: 1000 }
            );

            console.log(chatCompletion?.data.choices[0].message.content);

            if (
              extractTerms(
                chatCompletion?.data.choices[0].message.content,
                "cleanup"
              ) === "Yes"
            ) {
              temp_arr.push({
                match_index_1st: each.index_1st,
                match_index_2nd: each.index_2nd,
                user_data: each.ProjectDescription,
                match_sentence: each_input,
                usage:
                  (Number(chatCompletion?.data.usage.prompt_tokens) * 0.0015 +
                    Number(chatCompletion?.data.usage.completion_tokens) *
                      0.002) /
                  1000,
              });
            }
            total_usage =
              total_usage +
              (Number(chatCompletion?.data.usage.prompt_tokens) * 0.0015 +
                Number(chatCompletion?.data.usage.completion_tokens) * 0.002) /
                1000;

            // console.log(total_usage, temp_arr);
          })
        )
      )
    )
      .then((values) => {
        console.log("sucess");
        console.log(temp_arr);
        return NextResponse.json({
          data_project: temp_arr,
          total_usage_project: total_usage,
        });
      })
      .catch((values) => {
        console.log("error");
        console.log(temp_arr);
        return NextResponse.json({
          data_project: temp_arr,
          total_usage_project: total_usage,
        });
      });
  }
}
