import { RootState } from "@/store/store";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { editAPI_KEY } from "@/slices/controlSlice";

import { Button, Icon, InputGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

export default function API_KeyBoard({ customedCSS }: { customedCSS: string }) {
  const dispatch = useDispatch();
  //Get the Client API Key from ChatGPT, but stored inDatabase
  const API_KEY = useSelector((state: RootState) => state.control.API_KEY);
  //API Key Edit
  const APIKeyHandler = async () => {
    if (API_KEY === "") {
      return toast.error("nothing typed");
    }
    await fetch("/api/user/apikey", {
      method: "POST",
      body: JSON.stringify({ API_Key: API_KEY }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((res) => res.json())
      .then((data) => toast.success(data?.message))
      .catch(() => toast.error("Cannot Update!"));
  };

  return (
    <div
      className={` bg-white border-2 border-yellow-500 flex flex-col justify-center
    ${customedCSS}`}
    >
      <Toaster />

      <div className=" flex justify-center w-full">API Key:</div>
      <InputGroup
        onChange={(e: any) => dispatch(editAPI_KEY(e.target.value))}
        value={API_KEY}
        // maxLength={30}
        placeholder="e.g. indeed"
        // className="w-full flex flex-col "
      />
      <Button
        onClick={APIKeyHandler}
        className="  hover:bg-white hover:text-black m-2 rounded-2xl"
      >
        Update API Key
      </Button>
    </div>
  );
}
