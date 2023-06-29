import { RootState } from "@/store/store";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

export default function Statistic({ res }: any) {
  const stage_2 = useSelector((state: RootState) => state.analyse.stage_2);

  const [matches, setMatch] = useState(null);
  const [unmatches, setUnMatch] = useState(null);

  if (Array.isArray(stage_2)) {
    const match_sentences: any[] = stage_2?.filter(
      (each: any) =>
        res.find((each_each) => each_each.match_sentence === each)
          ?.match_sentence === each
    );

    const UNmatch_sentences: any[] = stage_2?.filter(
      (each: any) =>
        res.find((each_each) => each_each.match_sentence === each)
          ?.match_sentence !== each
    );

    // setMatch(match_sentences);
    // setResult({ match: match_sentences, unmatch: UNmatch_sentences });
    console.log(
      JSON.stringify(match_sentences, null, 1),
      UNmatch_sentences.length
    );
  }

  return (
    <>
      <div>Result</div>
      <div>
        <div>Match</div>
        <div>
          {/* {matches?.map((each, i) => (
            <div key={i}>{JSON.stringify(each, null, 1)}</div>
          ))} */}
        </div>
      </div>
      <div>
        <div>UN-Match</div>
        <div></div>
      </div>
    </>
  );
}
