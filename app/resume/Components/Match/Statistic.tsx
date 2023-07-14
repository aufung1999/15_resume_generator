import React, { useState, useEffect } from "react";

export default function Statistic({ whatToGet }: { whatToGet: string }) {
  const [get, setGet] = useState<any[]>([]);
  const [usage, setTotalUsage] = useState<any>(0);
  const [job_details_csr, set_job_details_csr] = useState<any>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = window.localStorage.getItem(whatToGet);
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
        const job_details_ls: any | null =
          window.localStorage.getItem("job_details");
        set_job_details_csr(JSON.parse(job_details_ls));
      }
    }
  }, []);

  return (
    <div
      className={
        "bg-white px-3 py-1 cursor-pointer top-0 z-10 rounded border-2  border-green-500 "
      }
    >
      <div>
        <div>Company:{job_details_csr?.company_name}</div>
        <div>Job Position:{job_details_csr?.job_position}</div>
        <div>Website:{job_details_csr?.website}</div>
        <div>Match:</div>
        <div className=" text-xs">Usage:{usage}</div>
      </div>
    </div>
  );
}
