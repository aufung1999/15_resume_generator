// "use client";
import React from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
} from "@blueprintjs/core";
import InsertWorkExp from "./Components/InsertWorkExp";

import toast, { Toaster } from "react-hot-toast";

import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";

import { motion, useScroll, useSpring } from "framer-motion";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import db from "@/utils/db";
import Work from "@/models/Work";

export default function WorkComp() {
  const works = useSelector((state: RootState) => state.work);
  // console.log("server_works: " + JSON.stringify(server_works, null, 1));
  // Save to server
  const SubmitHandler = () => {
    // console.log(contact);

    fetch("/api/user/work", {
      method: "POST",
      body: JSON.stringify(works),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(() => toast.success("User Work Info Updated!"))
      .catch(() => toast.error("Cannot Update!"));
  };
  return (
    <Card
      className="border border-blue-600 flex-1"
      interactive={false}
      elevation={Elevation.TWO}
    >
      <Toaster />
      <h1>Work</h1>

      <div className=" border-4 flex flex-col items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          // exit={{ opacity: 0, transition: { duration: 0.5 } }}
          className=" w-9/12"
        >
          {/* Control the form size */}
          <InsertWorkExp />
        </motion.div>
      </div>
      <Button className="bp3-intent-primary" onClick={SubmitHandler}>
        Submit
      </Button>
    </Card>
  );
}

// export async function getStaticProps() {
//   try {
//     const session = await getServerSession(authOptions);
//     await db.connect();
//     const exist = await Work.find({
//       email: session?.user?.email,
//     }).exec();
//     await db.disconnect();

//     return {
//       props: { works: JSON.parse(JSON.stringify(exist)) },
//     };
//   } catch (e) {
//     console.error(e);
//   }
// }
