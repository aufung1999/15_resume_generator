import React from "react";
import { forEachChild } from "typescript";
var stringSimilarity = require("string-similarity");

export default function compare(user: any, input: any, mode: string) {
  let sim_res,
    test = [];
  switch (mode) {
    case "project":
      console.log(user, input);

      user.map((each: any, i: number) => {
        console.log("i: " + i);
        each.array.map((technique: any) => {
          input.map((array: any) => {
            sim_res = stringSimilarity.findBestMatch(
              technique.toLowerCase(),
              array.array.map((word: string) => word.toLowerCase())
            );

            if (sim_res.bestMatch.rating > 0.8) {
              test.push({
                match_index: each.index,
                technique: technique,
                match_sentence: array.index,
              });
            }
          });
          //   console.log("sim_res: " + JSON.stringify(sim_res, null, 1));
        });
      });

      console.log(" test: " + JSON.stringify(test, null, 1));
      return;
    case "skill":
      console.log(user, input);
      user.map((each) =>
        each.array.map((skill) => {
          console.log("skill: " + JSON.stringify(skill, null, 1));
          if (skill.length !== 0) {
            input.map((array: any) => {
              sim_res = stringSimilarity.findBestMatch(
                skill?.skill?.toLowerCase(),
                array.array.map((word: string) => word.toLowerCase())
              );

              if (sim_res.bestMatch.rating > 0.8) {
                test.push({
                  match_index: each.index,
                  // match_skill_index:skill
                  technique: skill.skill,
                  match_sentence: array.index,
                });
              }

              console.log("sim_res: " + JSON.stringify(sim_res.bestMatch, null, 1));
            });
          }
        })
      );
      console.log(" test: " + JSON.stringify(test, null, 1));
      return;
  }
}
