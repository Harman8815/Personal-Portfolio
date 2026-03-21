"use client";
import React, { useEffect, useState, useMemo } from "react";

const getColorClass = (color) => {
  const map = {
    cyan: "text-cyan-500/6",
    purple: "text-purple-500/6",
    blue: "text-blue-500/6",
    indigo: "text-indigo-500/6",
    emerald: "text-emerald-500/6",
    orange: "text-orange-500/6",
    rose: "text-rose-500/6",
    amber: "text-amber-500/6",
  };
  return map[color] || map.cyan;
};

const getRandom = (min, max) => Math.random() * (max - min) + min;

const getRotation = () => {
  const rotations = [-45, -25, -12, -6, 6, 12, 25, 45];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

const getSize = () => {
  const sizes = ["text-2xl", "text-3xl", "text-4xl"];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

export const BackgroundSymbols = ({ symbols = [], count = 20, className = "" }) => {
  const [generatedSymbols, setGeneratedSymbols] = useState([]);

  useEffect(() => {
    if (symbols.length === 0) return;

    const generateSymbols = () => {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);

      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;

      const shuffled = [...symbols].sort(() => Math.random() - 0.5);

      let index = 0;
      const result = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          if (index >= count) break;

          const item = shuffled[index % shuffled.length];

          // jitter inside cell (prevents rigid grid look)
          const jitterX = getRandom(-cellWidth * 0.3, cellWidth * 0.3);
          const jitterY = getRandom(-cellHeight * 0.3, cellHeight * 0.3);

          result.push({
            id: index,
            symbol: item.symbol,
            color: item.color,
            top: `${r * cellHeight + cellHeight / 2 + jitterY}%`,
            left: `${c * cellWidth + cellWidth / 2 + jitterX}%`,
            rotation: getRotation(),
            size: getSize(),
          });

          index++;
        }
      }

      return result;
    };

    setGeneratedSymbols(generateSymbols());
  }, [symbols, count]);

  const memoizedSymbols = useMemo(() => generatedSymbols, [generatedSymbols]);

  return (
    <div className={`absolute inset-0 pointer-events-none z-0 overflow-hidden ${className}`}>
      {memoizedSymbols.map((item) => (
        <div
          key={item.id}
          className={`absolute font-mono opacity-15 ${getColorClass(item.color)} ${item.size}`}
          style={{
            top: item.top,
            left: item.left,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          {item.symbol}
        </div>
      ))}
    </div>
  );
};

export default BackgroundSymbols;
