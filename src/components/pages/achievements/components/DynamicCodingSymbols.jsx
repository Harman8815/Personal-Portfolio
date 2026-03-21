import React from "react";
import BackgroundSymbols from "../../../common/BackgroundSymbols";
import { CODING_SYMBOLS } from "../../../common/BackgroundSymbolsConfig";

export const DynamicCodingSymbols = ({ count = 20 }) => {
  return (
    <BackgroundSymbols 
      symbols={CODING_SYMBOLS} 
      count={count} 
    />
  );
};

export default DynamicCodingSymbols;
