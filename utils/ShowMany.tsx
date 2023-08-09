"use client";
import React from "react";

import "animate.css";
import TrackVisibility from "react-on-screen";

type Props = {
  children: JSX.Element | any;
  seconds?: number;
  mode_IN: string | any;
  mode_OUT: string | any;
  speed?: string | any;

  delay?: string | any;
};

const ShowMany = ({
  children,
  seconds = 7000,
  mode_IN = null,
  mode_OUT = null,
  speed = null,
  delay = null,
}: Props) => {
  return (
    <TrackVisibility>
      {({ isVisible }) => (
        <div
          className={
            isVisible
              ? `animate__animated ${mode_IN} ${speed} ${delay}`
              : `animate__animated ${mode_OUT} ${speed} ${delay}`
          }
        >
          {children}
        </div>
      )}
    </TrackVisibility>
  );
};

export default ShowMany;
