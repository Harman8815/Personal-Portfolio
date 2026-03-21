import React from "react";
import BackgroundSymbols from "../common/BackgroundSymbols";
import { CERTIFICATION_SYMBOLS } from "../common/BackgroundSymbolsConfig";

export const CertificationSymbols = ({ count = 20 }) => {
  return (
    <BackgroundSymbols 
      symbols={CERTIFICATION_SYMBOLS} 
      count={count} 
    />
  );
};

export default CertificationSymbols;
