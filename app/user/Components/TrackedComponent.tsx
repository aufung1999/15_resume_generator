"use client";
import { editViewport } from "@/slices/controlSlice";
import React, { useRef, useEffect, ReactNode } from "react";
import { useDispatch } from "react-redux";

function TrackedComponent({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactNode;
}) {
  const targetRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log(`Component with ID ${id} is in viewport`);
          dispatch(editViewport(id));
        }
      });
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [id]);

  return <div ref={targetRef}>{children}</div>;
}

export default TrackedComponent;
