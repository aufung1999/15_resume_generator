"use client"
import { editAnalyse_stage_3 } from "@/slices/analyseSlice";
import { RootState } from "@/store/store";
import { Button } from "@blueprintjs/core";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function Statistic({ res }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);

  const job_position = useSelector(
    (state: RootState) => state.analyse.job_position
  );
  const company_name = useSelector(
    (state: RootState) => state.analyse.company_name
  );
  const website = useSelector((state: RootState) => state.analyse.website);

  const [matches, setMatch] = useState<string[] | null>(null);
  const [unmatches, setUnMatch] = useState<string[] | null>(null);

  useEffect(() => {
    if (Array.isArray(stage_2)) {
      const match_sentences: any[] = stage_2?.filter(
        (each: any) =>
          res.find((each_2: any) => each_2.match_sentence === each)
            ?.match_sentence === each
      );

      const UNmatch_sentences: any[] = stage_2?.filter(
        (each: any) =>
          res.find((each_2: any) => each_2.match_sentence === each)
            ?.match_sentence !== each
      );

      setMatch(match_sentences);
      setUnMatch(UNmatch_sentences);
      // setResult({ match: match_sentences, unmatch: UNmatch_sentences });
      console.log(
        JSON.stringify(match_sentences, null, 1),
        UNmatch_sentences.length
      );
    }
  }, []);

  const ClickHandler = () => {
    //store the result from chatgpt / other algorithms to localStorage  ***Choose
    window.localStorage.setItem("stage_3", JSON.stringify(res));

    //store the "matches" from chatgpt / other algorithms to localStorage
    window.localStorage.setItem("matches", JSON.stringify(matches));

    //store the "unmatches" from chatgpt / other algorithms to localStorage
    window.localStorage.setItem("unmatches", JSON.stringify(unmatches));

    //store the "job related"
    window.localStorage.setItem(
      "job_details",
      JSON.stringify({
        job_position: job_position,
        company_name: company_name,
        website: website,
      })
    );

    //store the "job related"
    window.localStorage.setItem("last_website", JSON.stringify(website));

    //Jump to another tab
    router.push("/resume");
  };

  return (
    <>
      <h1 className=" font-bold text-lg">Result</h1>
      <div>
        <div className="flex justify-center border-4">Match</div>
        <div className="px-3">
          {matches?.map((each, i) => (
            <div key={i}>{JSON.stringify(each, null, 1)}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-center border-4">UN-Match</div>
        <div className="px-3">
          {" "}
          {unmatches?.map((each, i) => (
            <div key={i}>{JSON.stringify(each, null, 1)}</div>
          ))}
        </div>
      </div>
      <hr
        style={{
          color: "black",
          backgroundColor: "black",
          height: 5,
        }}
      />
      {matches && (
        <>
          <div>
            <div className="flex">
              <b className=" w-1/4 flex hover:justify-end">Matches</b>
              <b>:</b>
              <div className=" w-3/4">{matches?.length}</div>
            </div>

            <div className="flex">
              <b className=" w-1/4 flex hover:justify-end">Does Not Match</b>
              <b>:</b>
              <div className=" w-3/4">{unmatches?.length}</div>
            </div>

            <div className="flex">
              <b className=" w-1/4 flex hover:justify-end">Percentage</b>
              <b>:</b>
              <div className=" w-3/4">
                {stage_2?.length &&
                  (matches?.length / stage_2?.length).toFixed(2)}
              </div>
            </div>
          </div>
          <div className=" border flex justify-center hover:text-2xl">
            <Button
              onClick={ClickHandler}
              className=" bg-blue-500 rounded px-3"
            >
              Lets&apos; go to Edit Your Resume!
            </Button>
          </div>
        </>
      )}
    </>
  );
}
