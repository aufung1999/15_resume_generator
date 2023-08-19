"use client";
import React, { useState, useEffect } from "react";

export default function Statistic({ whatToGet }: { whatToGet: string }) {
  const [get, setGet] = useState<any[]>([]);
  const [usage, setTotalUsage] = useState<any>(0);
  const [job_details_csr, set_job_details_csr] = useState<any>(0);
  const [matches_csr, setMatches] = useState<string[] | null>(null);
  const [unmatches_csr, setUnMatches] = useState<string[] | null>(null);

  //---use let to access the localStorage value---
  let check_usage_ls;
  let check_job_details_ls;
  let check_matches_ls;
  let check_unmatches_ls;

  useEffect(() => {
    if (typeof window !== "undefined") {
      check_usage_ls = localStorage.getItem("total_usage");
      check_job_details_ls = localStorage.getItem("job_details");
      check_matches_ls = localStorage.getItem("matches");
      check_unmatches_ls = localStorage.getItem("unmatches");
    }
  }, []);

  //------------------------------------------
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = localStorage.getItem(whatToGet);
        setGet(JSON.parse(newObject));
      }
      if (localStorage.getItem("total_usage")) {
        //Calculate the total usage of chatgpt and display in JSX`
        const total_usage_ls: string | null =
          localStorage.getItem("total_usage");
        // const extractUsage = JSON.parse(newObject).map((each: any) =>
        //   each.usage ? each.usage : 0
        // );
        // const sumWithInitial = extractUsage.reduce(
        //   (a: string | number, b: string | number) => Number(a) + Number(b),
        //   0
        // );
        setTotalUsage(total_usage_ls);
      }
      if (localStorage.getItem("job_details")) {
        const job_details_ls: any | null = localStorage.getItem("job_details");
        set_job_details_csr(JSON.parse(job_details_ls));
      }
      if (localStorage.getItem("matches")) {
        const matches_ls: any | null = localStorage.getItem("matches");
        setMatches(JSON.parse(matches_ls));
      }
      if (localStorage.getItem("unmatches")) {
        const unmatches_ls: any | null = localStorage.getItem("unmatches");
        setUnMatches(JSON.parse(unmatches_ls));
      }
    }
  }, [
    whatToGet,
    check_usage_ls,
    check_job_details_ls,
    check_matches_ls,
    check_unmatches_ls,
  ]);

  return (
    <div
      className={
        "bg-white px-3 py-1 cursor-pointer top-0 z-10 rounded border-2  border-green-500 "
      }
    >
      <div>
        <div className="grid grid-cols-10 w-full mb-2">
          <div className=" col-span-2 flex justify-center">Company:</div>
          <div className=" col-span-8 break-words">
            {job_details_csr?.company_name}
          </div>
        </div>

        <div className="grid grid-cols-10 w-full mb-2">
          <div className=" col-span-2 flex justify-center">Position:</div>
          <div className=" col-span-8 break-words">
            {job_details_csr?.job_position}
          </div>
        </div>

        <div className="grid grid-cols-10 w-full mb-2">
          <div className=" col-span-2 flex justify-center">Website:</div>
          <div className=" col-span-8 break-words">
            {job_details_csr?.website}
          </div>
        </div>

        <div className="grid grid-cols-10 w-full mb-2">
          <div className=" col-span-2 flex justify-center">Match:</div>
          <div className=" col-span-8 break-words">
            {matches_csr &&
              unmatches_csr &&
              (
                (matches_csr?.length /
                  (matches_csr?.length + unmatches_csr?.length)) *
                100
              ).toFixed(2)}
          </div>
        </div>

        <div className="grid grid-cols-10 w-full mb-2">
          <div className=" col-span-2 flex justify-center">Usage:</div>
          <div className=" col-span-8 break-words">{usage}</div>
        </div>
      </div>
    </div>
  );
}
