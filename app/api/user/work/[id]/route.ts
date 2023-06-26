import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";

export async function DELETE(
  req: NextApiRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (session) {
    const { id } = params;
    console.log("id: " + id);
    await db.connect();

    const query = { index: id, email: session?.user?.email };
    Work.deleteOne(query)
      .then(function () {
        console.log("Data deleted"); // Success
      })
      .catch(function (error) {
        console.log(error); // Failure
      });

    await db.disconnect();
    return NextResponse.json({ message: "Deleted" });
  }
}
