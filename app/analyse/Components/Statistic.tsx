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
    //store the result from chatgpt / other algorithms to redux store  ***Choose
    dispatch(editAnalyse_stage_3(res));
    //store the result from chatgpt / other algorithms to localStorage  ***Choose
    window.localStorage.setItem("stage_3", JSON.stringify(res));
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
