import { ContactState } from "@/slices/contactSlice";
import React from "react";
import { ProfileName } from "../atoms/ProfileName";
import { SectionSubtitle } from "../atoms/SectionSubtitle";
import { ProfileContact } from "../atoms/ProfileContact";

export default function BasicIntro({
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
    <div className="flex justify-between items-center p-2">
      <div>
        <ProfileName name={FirstName} />
        {/* <SectionSubtitle label={label} /> */}
        <div className="flex gap-3">
          <ProfileContact text={PhoneNumber} />
          <ProfileContact text={Email} />
          <ProfileContact text={City} />
          {Portfolio && (
            <div className="flex gap-2 ml-2 items-center">
              {/* <BsGlobe /> */}
              <ProfileContact text={Portfolio} />
            </div>
          )}
        </div>
      </div>
      {/* <ProfileImage src={image} height="100px" width="100px" /> */}
    </div>
  );
}
