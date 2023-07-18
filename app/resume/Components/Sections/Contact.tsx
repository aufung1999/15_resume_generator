import { ContactState } from "@/slices/contactSlice";
import React from "react";
import { ProfileName } from "../../atoms/ProfileName";
import { ProfileContact } from "../../atoms/ProfileContact";

export default function Contact({
  FirstName,
  LastName,
  PhoneNumber,
  Country,
  City,
  State,
  ZipCode,
  Email,
  Portfolio,
  LinkedIn,
  GitHub,
}: ContactState) {
  return (
    <div className="flex-col  justify-center items-center p-2">
      <ProfileName name={FirstName} />

      {/* <SectionSubtitle label={label} /> */}
      <div className="flex gap-3  justify-center">
        <div className="text-sm font-semibold flex ">
          Tel: &nbsp; <ProfileContact text={PhoneNumber} />
        </div>

        <div className="text-sm font-semibold flex">
          Email: &nbsp; <ProfileContact text={Email} />
        </div>

        {/* <div className="text-sm font-semibold flex">
          Location: &nbsp;
          <ProfileContact text={City + ", " + Country} />
        </div> */}

        {Portfolio && (
          <div className="text-sm font-semibold flex">
            Link: &nbsp;{" "}
            <a href={Portfolio}>
              <u>
                <ProfileContact text="Portfolio" />
              </u>
            </a>
          </div>
        )}
        {LinkedIn && (
          <div className="text-sm font-semibold flex">
            <a href={LinkedIn}>
              <u>
                <ProfileContact text="LinkedIn" />
              </u>
            </a>
          </div>
        )}
        {GitHub && (
          <div className="text-sm font-semibold flex">
            <a href={GitHub}>
              <u>
                <ProfileContact text="GitHub" />
              </u>
            </a>
          </div>
        )}
      </div>
      {/* <ProfileImage src={image} height="100px" width="100px" /> */}
    </div>
  );
}
