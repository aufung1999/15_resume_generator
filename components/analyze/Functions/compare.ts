import React from "react";
var stringSimilarity = require("string-similarity");

export default function compare(user: any, input: any, mode: string) {
  let sim_res,
    test: any[] = [];
  switch (mode) {
    case "project":
      console.log(user, input);

      user.map((each: { index: string; array: string[] }) => {
        each.array.map((technique: any) => {
          input.map((array: { index: string; array: string[] }) => {
            sim_res = stringSimilarity.findBestMatch(
              technique.toLowerCase(),
              array.array.map((word: string) => word.toLowerCase())
            );

            if (sim_res.bestMatch.rating > 0.6) {
              test.push({
                match_index_1st: each.index,
                match_index_2nd: null,
                technique: technique,
                match_sentence: array.index,
              });
            }
          });
          //   console.log("sim_res: " + JSON.stringify(sim_res, null, 1));
        });
      });

      console.log(" test: " + JSON.stringify(test, null, 1));
      return test;
    case "skill":
      console.log(user, input);
      user.map((each: any) =>
        each.array.map((skill: any) => {
          // console.log("skill: " + JSON.stringify(skill, null, 1));
          if (skill.length !== 0) {
            input.map((array: any) => {
              sim_res = stringSimilarity.findBestMatch(
                skill?.skill?.toLowerCase(),
                array.array.map((word: string) => word.toLowerCase())
              );

              if (sim_res.bestMatch.rating > 0.6) {
                test.push({
                  match_index_1st: each.index,
                  match_index_2nd: skill.skillIndex,
                  technique: skill.skill,
                  match_sentence: array.index,
                });
              }

              console.log(
                "sim_res: " + JSON.stringify(sim_res.bestMatch, null, 1)
              );
            });
          }
        })
      );
      console.log(" test: " + JSON.stringify(test, null, 1));
      return test;
  }
}
