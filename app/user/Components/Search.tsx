import React, { useState, useEffect, useRef } from "react";

import { Icon, InputGroup, Button, FormGroup } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { addSearchBar_redux, editSearch } from "@/slices/controlSlice";
import extractTerms from "../../analyse/Functions/extractTerms";

import { Tooltip } from "@mui/material";

var stringSimilarity = require("string-similarity");

import { v4 as uuidv4 } from "uuid";
import shortenUUID from "@/utils/shortenUUID";

import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

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
      <div className="relative flex flex-col">
        <Button
          icon={<Icon icon="search" className="" style={{ color: "white" }} />}
          onClick={searchHandler}
          style={{
            backgroundColor: "rgba(0,120,255,1)",
          }}
        />
        <div className=" absolute z-20 left-full">
          <Tooltip
            title={
              <>
                if you want to find `&quot;Response`&quot; resume, type
                `&quot;true`&quot; or `&quot;false`&quot;
              </>
            }
          >
            <ErrorOutlineIcon />
          </Tooltip>
        </div>
      </div>
    </div>
  );
}
