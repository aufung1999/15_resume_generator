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
    <div className="flex-col border justify-center items-center p-2">
      <ProfileName name={FirstName} />

      {/* <SectionSubtitle label={label} /> */}
      <div className="flex gap-3 border justify-center">
        <div className="flex">
          <div className="text-xs font-semibold">Tel: &nbsp;</div>
          <ProfileContact text={PhoneNumber} />
        </div>
        <div className="flex">
          <div className="text-sm font-semibold">Email: &nbsp;</div>
          <ProfileContact text={Email} />
        </div>
        <div className="flex">
          <div className="text-sm font-semibold">Location: &nbsp;</div>
          <ProfileContact text={City + ", " + Country} />
        </div>

        {Portfolio && (
          <div className="flex items-center">
            <div className="text-sm font-semibold">Link: &nbsp;</div>
            <a href={Portfolio}>
              <u>
                <ProfileContact text="Portfolio" />
              </u>
            </a>
          </div>
        )}
      </div>
      {/* <ProfileImage src={image} height="100px" width="100px" /> */}
    </div>
  );
}
