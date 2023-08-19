"use client";
import TrackVisibility from "react-on-screen";

import { useState, useEffect } from "react";

type Props = {
  children: JSX.Element | any;
  seconds?: number;
};

const ShowOnce = ({ children, seconds = 7000 }: Props) => {
  return (
    <TrackVisibility>
      {({ isVisible }) => <div>{children}</div>}
    </TrackVisibility>
  );
};

export default ShowOnce;
