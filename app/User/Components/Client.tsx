"use client";
import React, { useState, useEffect, useRef } from "react";

import parse from "html-react-parser";

import * as htmlToImage from "html-to-image";

export default function UserClient({ resumeData }: { resumeData: any }) {
  const [images_csr, setImages] = useState<any[]>([]);

  useEffect(() => {
    let images_db: any[] = [];
    resumeData.map(async (each) => {
      var img = new Image();
      img.src = each.HTMLDIVElement;
      images_db.push(img);
    });
    setImages(images_db);
  }, []);
  return (
    <div id="user" className="grid grid-cols-2">
      {images_csr?.map((each, i: number) => (
        <div className="w-1/2 relative hover:w-full " key={i}>
          <img src={each.src} />
        </div>
      ))}
    </div>
  );
}
