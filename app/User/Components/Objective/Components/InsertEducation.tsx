"use client";
import React, { useState } from "react";
import {
  Button,
  Card,
  Elevation,
  FormGroup,
  InputGroup,
  Switch,
  TextArea,
} from "@blueprintjs/core";
import { useSelector, useDispatch } from "react-redux";
// import {
//   addWorkExp,
//   editCompanyName,
//   editPosition,
//   editStartDate,
//   editEndDate,
//   editJobDescription,
// } from "@/slices/workSlice";

const InputComp = ({ index }) => {
  const dispatch = useDispatch();
  return (
    <Card interactive style={{ background: "gray", color: "white" }}>
      <h3>Company {index}</h3>

      <FormGroup labelFor="text-input" labelInfo="(required)">
        Company Name:
        <InputGroup
          // onChange={(e) =>
          //   dispatch(
          //     editCompanyName({ index: index, CompanyName: e.target.value })
          //   )
          // }
        />
        Position:{" "}
        <InputGroup
          // onChange={(e) =>
          //   dispatch(editPosition({ index: index, Position: e.target.value }))
          // }
        />
        Start Date:{" "}
        <InputGroup
          // onChange={(e) =>
          //   dispatch(editStartDate({ index: index, StartDate: e.target.value }))
          // }
        />
        End Date:
        <InputGroup
          placeholder="if working, type 'Now'"
          // onChange={(e) =>
          //   dispatch(editEndDate({ index: index, EndDate: e.target.value }))
          // }
        />
        Job Description:{" "}
        <div className="w-full">
          <TextArea
            large={true}
            style={{ width: "100%", height: 200 }}
            fill={true}
            // onChange={(e) =>
            //   dispatch(
            //     editJobDescription({
            //       index: index,
            //       JobDescription: e.target.value,
            //     })
            //   )
            // }
            //   value={textContent}
          />
        </div>
      </FormGroup>
    </Card>
  );
};

export default function InsertEducation() {
  const dispatch = useDispatch();
  const [links, insertLinks] = useState([]);

  const addLink = (event) => {
    // dispatch(addWorkExp({ index: links.length }));
    insertLinks(
      (links as []).concat(
        <InputComp key={links.length} index={links.length} />
      )
    );
  };
  return (
    <div>
      <Button icon="insert" onClick={addLink} />
      {links?.map((each, index) => (
        <div key={index}>{each}</div>
      ))}
    </div>
  );
}
