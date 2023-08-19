"use client"
import React, { useState, useEffect } from "react";

export default function DisplayResult({ whatToGet }: { whatToGet: string }) {
  const [get, setGet] = useState<any[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem(whatToGet)) {
        const newObject: any = localStorage.getItem(whatToGet);
        setGet(JSON.parse(newObject));
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
      </div>
    </div>
  );
}
