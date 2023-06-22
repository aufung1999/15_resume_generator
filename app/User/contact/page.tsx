import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Contact from "@/models/Contact";
import ContactClient from "./Components/Client";

export default async function Page() {
  const session = await getServerSession(authOptions);

  //Initialize a variable outside of "if" statement
  let contactData;
  //check if "Authenticated"
  if (session) {
    await db.connect();
    contactData = await Contact.findOne({
      email: session?.user?.email,
    });
    if (contactData) {
      contactData = db.convertDocToObj(contactData);
    }
  }

  return (
    <div>
      <ContactClient data={contactData} />
    </div>
  );
}
