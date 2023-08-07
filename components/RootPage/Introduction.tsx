import React from "react";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";

export default function Introduction() {
  return (
    <div className="px-48 py-10">
      <div className="border grid grid-cols-10">
        <div className="border col-span-6 text-lg">
          Have you ever wondered &apos;why I&apos;m a fit to this position, but
          still received rejection letter?&apos;
        </div>
        <div className=" col-span-4" />

        <div className=" col-span-4" />

        <div className="border col-span-6 text-lg">
          <div>Yeah, I can hear you! me too!</div>
          <div>
            After ~150 applications on ndeed/LinkedIn/GlassDoor and other
            methods, I am still like you.
          </div>
        </div>
      </div>
      
      <table className="table-fixed w-full">
        <thead>
          <tr>
            <th>
              <div className="font-sans font-semibold text-2xl">
                <span className=" italic">Static Resume</span> &nbsp;
              </div>
            </th>
            <th>
              <div className="font-sans font-semibold text-2xl">
                <span className=" italic">Dynamic Resume</span> &nbsp;
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {" "}
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>❌</span>
                  <div>Use the same Resume to apply for every companies</div>
                </div>
              </div>
            </td>
            <td>
              {" "}
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>✔️</span>
                  <div>
                    Dynamically change your Resume based on Job Description of{" "}
                    <span className=" italic">Each</span> company
                  </div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>❌</span>
                  <div>highlight keywords of your resume</div>
                </div>
              </div>
            </td>
            <td>
              <div className="text-xl flex list-none">
                <div className="flex">
                  <span>✔️</span>
                  <div>highlight keywords of your resume</div>
                </div>
              </div>
            </td>
          </tr>
          <tr>
            <td>Shining Star</td>
            <td>Earth, Wind, and Fire</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
