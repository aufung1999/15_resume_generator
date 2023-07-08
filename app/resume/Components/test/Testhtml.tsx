import React from "react";

import DOMPurify from "dompurify";
import parse from "html-react-parser";

export default function Testhtml({ renderedRef }: { renderedRef: any }) {
  //   console.log(renderedRef.current);
  const cleanHtmlString = DOMPurify.sanitize(renderedRef, {
    USE_PROFILES: { html: true },
  });

  console.log(cleanHtmlString);

  return (
    <div className=" bg-red-500 w-1/2">
      hi 
      {/* //will convert it to jsx */}
      {parse(cleanHtmlString)}
    </div>
  );
}
