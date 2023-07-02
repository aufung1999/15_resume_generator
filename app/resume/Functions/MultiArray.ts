import React from "react";

export default function MultiArray(
  Array1: any[],
  Array1_func: string,
  Array1Var: any,
  Array2: any[],
  Array2_func: string,
  Array2Var: any,
  Array2Var_Prop1: any,
  Array2Var_Prop2: any
) {
  Array1.map((Array1Var: any) => {
    Array2.map((Array2Var: any) =>
      Array2Var.Array2Var_Prop1 === Array2Var.Array2Var_Prop2 ? null : null
    );
  });
  return "Work!"
}
