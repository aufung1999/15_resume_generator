import React, { useState, useEffect } from "react";

export default function Result({
  id,
  whatToGet,
  customedCSS,
}: {
  id: string;
  whatToGet: string;
  customedCSS: string;
}) {
  const [get, setGet] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = window.localStorage.getItem(whatToGet);
        setGet(JSON.parse(newObject));
      }
    }
  }, []);

  return (
    <div
      className={
        "bg-green-300 border-4 absolute cursor-pointer top-0  z-10 " +
        customedCSS
      }
      id={id}
      content="hi"
    >
      {get?.map((each, i) => (
        <div key={i} className="flex">
          <div> {i}</div>
          <div className=" text-xs">{each}</div>
        </div>
      ))}
    </div>
  );
}
