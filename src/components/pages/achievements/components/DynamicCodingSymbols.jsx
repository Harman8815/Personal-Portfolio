import React, { useEffect, useState, useMemo } from "react";

const CODING_SYMBOLS = [
  // Core syntax
  { symbol: "< />", color: "cyan" },
  { symbol: "</>", color: "purple" },
  { symbol: "{", color: "blue" },
  { symbol: "}", color: "indigo" },
  { symbol: "()", color: "cyan" },
  { symbol: "[]", color: "purple" },

  // Operators
  { symbol: "=>", color: "blue" },
  { symbol: "&&", color: "indigo" },
  { symbol: "||", color: "cyan" },
  { symbol: "===", color: "purple" },
  { symbol: "!=", color: "blue" },
  { symbol: "<=", color: "indigo" },
  { symbol: ">=", color: "cyan" },
  { symbol: "++", color: "purple" },
  { symbol: "--", color: "blue" },
  { symbol: "+=", color: "indigo" },
  { symbol: "-=", color: "cyan" },
  { symbol: "*", color: "purple" },
  { symbol: "/", color: "blue" },
  { symbol: "%", color: "indigo" },

  // Keywords
  { symbol: "const", color: "indigo" },
  { symbol: "let", color: "cyan" },
  { symbol: "var", color: "purple" },
  { symbol: "async", color: "purple" },
  { symbol: "await", color: "blue" },
  { symbol: "return", color: "indigo" },
  { symbol: "export", color: "cyan" },
  { symbol: "import", color: "blue" },
  { symbol: "default", color: "purple" },
  { symbol: "class", color: "indigo" },
  { symbol: "extends", color: "cyan" },
  { symbol: "new", color: "blue" },

  // Functions / patterns
  { symbol: "function()", color: "purple" },
  { symbol: "() => {}", color: "cyan" },
  { symbol: "{...}", color: "blue" },
  { symbol: "[...]", color: "indigo" },

  // Special syntax
  { symbol: "...", color: "cyan" },
  { symbol: "::", color: "purple" },
  { symbol: "?.", color: "blue" },
  { symbol: "??", color: "indigo" },
  { symbol: "#", color: "cyan" },
  { symbol: "@", color: "purple" },

  // Comments / misc
  { symbol: "//", color: "blue" },
  { symbol: "/* */", color: "indigo" },
  { symbol: "`template`", color: "cyan" },

  // JSX / HTML vibes
  { symbol: "<div>", color: "purple" },
  { symbol: "<Component />", color: "blue" },
  { symbol: "props", color: "indigo" },
  { symbol: "state", color: "cyan" },
];

const getColorClass = (color) => {
  const map = {
    cyan: "text-cyan-500/6",
    purple: "text-purple-500/6",
    blue: "text-blue-500/6",
    indigo: "text-indigo-500/6",
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

export const DynamicCodingSymbols = ({ count = 20 }) => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const generateSymbols = () => {
      const cols = Math.ceil(Math.sqrt(count));
      const rows = Math.ceil(count / cols);

      const cellWidth = 100 / cols;
      const cellHeight = 100 / rows;

      const shuffled = [...CODING_SYMBOLS].sort(() => Math.random() - 0.5);

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

    setSymbols(generateSymbols());
  }, [count]);

  const memoizedSymbols = useMemo(() => symbols, [symbols]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
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

export default DynamicCodingSymbols;
