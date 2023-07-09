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
          res.find((each_each: any) => each_each.match_sentence === each)
            ?.match_sentence === each
      );

      const UNmatch_sentences: any[] = stage_2?.filter(
        (each: any) =>
          res.find((each_each: any) => each_each.match_sentence === each)
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

    //Jump to another tab
    router.push("/resume");
  };

  return (
    <>
      <div>Result</div>
      <div>
        <div className="flex justify-center border-4">Match</div>
        <div>
          {matches?.map((each, i) => (
            <div key={i}>{JSON.stringify(each, null, 1)}</div>
          ))}
        </div>
      </div>
      <div>
        <div className="flex justify-center border-4">UN-Match</div>
        <div>
          {" "}
          {unmatches?.map((each, i) => (
            <div key={i}>{JSON.stringify(each, null, 1)}</div>
          ))}
        </div>
      </div>
      {matches && (
        <>
          <div>
            <div>Matches: {matches?.length}</div>
            <div>Does Not Match: {unmatches?.length}</div>
            <div>Percentage:{matches?.length / stage_2?.length}</div>
          </div>
          <div>
            <Button onClick={ClickHandler}>
              Lets&apos; go to Edit Your Resume!
            </Button>
          </div>
        </>
      )}
    </>
  );
}
