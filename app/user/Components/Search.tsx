import React, { useState, useEffect, useRef } from "react";

import { Icon, InputGroup, Button, FormGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Colors } from "@blueprintjs/core";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addSearchBar_redux, editSearch } from "@/slices/controlSlice";
import extractTerms from "@/components/analyze/Functions/extractTerms";

import { Tooltip } from "@mui/material";

var stringSimilarity = require("string-similarity");

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ShowOnce from "@/utils/ShowOnce";

import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import MdPhone from "@mui/icons-material/Phone";

export default function Search({
  resume_csr,
  setResumes,
}: {
  resume_csr: any;
  setResumes: Function;
}) {
  const dispatch = useDispatch();

  const search_redux = useSelector((state: RootState) => state.control.search);

  const searchHandler = () => {
    if (resume_csr.length > 0 && search_redux.length !== 0) {
      const filtered_array = resume_csr.filter((each: any) =>
        search_redux.find(
          (item: { index: string; input: string | null }) =>
            (item.input &&
              stringSimilarity.findBestMatch(
                item?.input?.toLowerCase(),
                extractTerms(each.job_details.job_position, "search")
              ).bestMatch.rating > 0.6) ||
            (item.input &&
              stringSimilarity.findBestMatch(
                item.input?.toLowerCase(),
                extractTerms(each.job_details.website, "search")
              ).bestMatch.rating > 0.6) ||
            (item.input &&
              stringSimilarity.findBestMatch(
                item.input?.toLowerCase(),
                extractTerms(each.response, "search")
              ).bestMatch.rating > 0.9)
        )
      );
      //   console.log(filtered_array);
      if (filtered_array.length !== 0) setResumes(filtered_array);
    }
  };

  const [searchBar_csr, editSearchBar] = useState<any>([]);

  const addSearchBar = () => {
    //initialize the "index"
    const uuid = uuidv4();
    const short_id = shortenUUID(uuid);
    // update the Redux Store
    dispatch(addSearchBar_redux({ index: short_id }));
    //update the useState of "searchBar"
    editSearchBar(
      searchBar_csr.concat(
        <InputGroup
          id={short_id}
          key={short_id}
          onChange={(e) =>
            dispatch(editSearch({ input: e.target.value, index: short_id }))
          }
          //   value={search_redux}
          className="w-full border "
        />
      )
    );
  };

  return (
    <div className="w-full flex flex-col">
      {/* 1. Search Bar */}
      <div className=" border-2 w-full flex relative justify-between py-3">
        <Button
          icon={<Icon icon="insert" className="" style={{ color: "white" }} />}
          onClick={addSearchBar}
          style={{
            backgroundColor: "rgba(0,120,255,1)",
          }}
        />
        <div className="flex">
          {searchBar_csr?.map((each: any, i: number) => (
            <div key={i}>{each}</div>
          ))}
        </div>
        <div className="relative flex flex-row">
          <Button
            icon={
              <Icon icon="search" className="" style={{ color: "white" }} />
            }
            onClick={searchHandler}
            style={{
              backgroundColor: "rgba(0,120,255,1)",
            }}
          />
          <div className="  z-20 left-full">
            <Tooltip
              title={
                <>
                  if you want to find &quot;Response&quot;, please type
                  <div className="flex flex-col items-center">
                    <div className=" font-semibold italic underline">
                      rejected
                    </div>
                    <div className=" font-semibold italic underline">phone</div>
                    <div className=" font-semibold italic underline">first</div>
                    <div className=" font-semibold italic underline">
                      second
                    </div>
                    <div className=" font-semibold italic underline">third</div>
                    <div className=" font-semibold italic underline">
                      fourth
                    </div>
                    <div className=" font-semibold italic underline">offer</div>
                  </div>
                </>
              }
            >
              <ErrorOutlineIcon />
            </Tooltip>
          </div>
        </div>
      </div>

      {/* 2. Icon filter */}
      {/* Qualify if the resume gets response */}
      <div>
        <div className="w-full flex h-7 border">
          <Button
            className="w-full bg-red-400"
            value="rejected"
            onClick={() => {
              dispatch(editSearch({ input: "rejected", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>
              <CloseIcon style={{ fill: "red" }} />
            </div>
          </Button>

          <Button
            className="w-full bg-red-400"
            value="phone"
            onClick={() => {
              dispatch(editSearch({ input: "phone", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>
              <MdPhone style={{ fill: "black" }} />
            </div>
          </Button>

          <Button
            className="w-full bg-red-400"
            value="first"
            onClick={() => {
              dispatch(editSearch({ input: "first", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>1st</div>
          </Button>

          <Button
            className="w-full bg-red-400"
            value="second"
            onClick={() => {
              dispatch(editSearch({ input: "second", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>2nd</div>
          </Button>

          <Button
            className="w-full bg-red-400"
            value="third"
            onClick={() => {
              dispatch(editSearch({ input: "third", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>3rd</div>
          </Button>

          <Button
            className="w-full bg-red-400"
            value="fourth"
            onClick={() => {
              dispatch(editSearch({ input: "fourth", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div>4th</div>
          </Button>

          <Button
            className="w-full relative"
            value="offer"
            onClick={() => {
              dispatch(editSearch({ input: "offer", index: "filter_icon" })),
                searchHandler();
            }}
          >
            <div className=" w-full relative">
              <DoneIcon style={{ fill: "green", width: "100%" }} />
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
