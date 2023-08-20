"use client";
import React, { useEffect, useState, useTransition } from "react";

import { useSelector, useDispatch } from "react-redux";

import InsertContact from "./InsertContact";
import {
  cleanUp_Contact_redux,
  initialize_ClientData,
} from "../../../slices/contactSlice";

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
    <div className="font-sans">
      <InsertContact data={data} dispatched={dispatched} />
    </div>
  );
}
