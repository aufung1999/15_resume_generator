"use client";

import { initialize_ClientData } from "@/slices/contactSlice";
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

export default function Root_fetchData({ data }: any) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      dispatch(initialize_ClientData(data));
    }
  }, [data]);
  return <></>;
}
