import React, { useState, useEffect } from "react";

export default function Revalidation(experience) {
  useEffect(() => {
    let temp_array: any[] = [];
    if (typeof window !== "undefined") {
      if (localStorage.getItem("stage_3")) {
        const newObject: any = window.localStorage.getItem("stage_3");
        // *****NOT exist*****
        JSON.parse(newObject).map((each: any) =>
        
        )
      }
    }
  }, []);
}
