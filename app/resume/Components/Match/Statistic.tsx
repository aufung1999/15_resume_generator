import React, { useState, useEffect } from "react";

export default function Statistic({ whatToGet }: { whatToGet: string }) {
  const [get, setGet] = useState<any[]>([]);
  const [usage, setTotalUsage] = useState<any[]>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = window.localStorage.getItem(whatToGet);
        setGet(JSON.parse(newObject));

        //Calculate the total usage of chatgpt and display in JSX`
        const extractUsage = JSON.parse(newObject).map((each: any) =>
          each.usage ? each.usage : 0
        );
        const sumWithInitial = extractUsage.reduce(
          (a: string | number, b: string | number) => Number(a) + Number(b),
          0
        );
        setTotalUsage(sumWithInitial);
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
        <div>Company:</div>
        <div>Match:</div>
        <div className=" text-xs">Usage:{usage}</div>
      </div>
    </div>
  );
}
