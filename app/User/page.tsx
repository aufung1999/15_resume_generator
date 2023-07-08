// "use client"
import PersonalInfo from "./Components/PersonalInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

import db from "@/utils/db";
import Resume from "@/models/Resume";

import parse from "html-react-parser";

import * as htmlToImage from "html-to-image";

export default async function Page() {
  const session = await getServerSession(authOptions);

  let resumeData;

  if (session) {
    await db.connect();
    resumeData = JSON.parse(
      JSON.stringify(
        await Resume.find({
          email: session?.user?.email,
        })
      )
    );
    if (resumeData) {
      resumeData.map((each) => {
        htmlToImage
          .toPng(
            each.HTMLDIVElement
          )
          .then(function (dataUrl) {
            var img = new Image();
            img.src = dataUrl;
            console.log(dataUrl);
            document.body.appendChild(img);
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      });
    }
  }

  return (
    <div className=" w-full items-center justify-between font-mono text-sm lg:flex border-4">
      {/* h-screen */}
      <div className="w-full flex flex-row border-2">
        {resumeData.map((each, i: number) => (
          <div className="w-full h-full relative" key={i}>
            {parse(
              each.HTMLDIVElement.replace(
                /<div class="w-a4 h-a4 border-2  px-6 py-2 bg-white text-black">/g,
                `<div class="border-2  px-6 py-2 bg-white text-black">`
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
