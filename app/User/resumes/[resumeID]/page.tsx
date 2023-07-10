"use client";
import React, { useState, useEffect, useRef } from "react";
export default function ResumeDetail({
  params,
}: {
  params: { resumeID: string };
}) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/user/resume/${params.resumeID}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);
  return (
    <h1>
      Details about product {params.resumeID}
      {console.log(data)}
    </h1>
  );
}
