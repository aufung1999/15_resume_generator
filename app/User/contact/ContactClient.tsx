"use client";
import React, { useEffect, useState, useTransition } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  initialize_ClientData,
  cleanUp_Contact_redux,
} from "@/slices/contactSlice";

import InsertContact from "./InsertContact";

export default function ContactClient({ data }: { data: any }) {
  const dispatch = useDispatch();

  const [dispatched, setDispatched] = useState(false);

  useEffect(() => {
    dispatch(cleanUp_Contact_redux());
    if (data) {
      dispatch(initialize_ClientData(data));
      setDispatched(true);
    }
  }, [data]);

  return (
    <div>
      <InsertContact data={data} dispatched={dispatched} />
    </div>
  );
}
