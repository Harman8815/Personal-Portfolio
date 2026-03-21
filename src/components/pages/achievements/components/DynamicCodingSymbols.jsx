import React, { useEffect, useState, useMemo } from 'react';

const CODING_SYMBOLS = [
  { symbol: '< />', color: 'cyan' },
  { symbol: '</>', color: 'purple' },
  { symbol: '{', color: 'blue' },
  { symbol: '}', color: 'indigo' },
  { symbol: '()', color: 'cyan' },
  { symbol: '[]', color: 'purple' },
  { symbol: '=>', color: 'blue' },
  { symbol: '&&', color: 'indigo' },
  { symbol: '||', color: 'cyan' },
  { symbol: ';', color: 'purple' },
  { symbol: '+', color: 'blue' },
  { symbol: '-', color: 'indigo' },
  { symbol: '*', color: 'cyan' },
  { symbol: '/', color: 'purple' },
  { symbol: '%', color: 'blue' },
  { symbol: '=', color: 'indigo' },
  { symbol: '!', color: 'cyan' },
  { symbol: '?', color: 'purple' },
  { symbol: ':', color: 'blue' },
  { symbol: 'const', color: 'indigo' },
  { symbol: 'let', color: 'cyan' },
  { symbol: 'async', color: 'purple' },
  { symbol: 'await', color: 'blue' },
  { symbol: 'return', color: 'indigo' },
  { symbol: 'export', color: 'cyan' },
  { symbol: 'function()', color: 'purple' },
  { symbol: 'import', color: 'blue' },
  { symbol: 'from', color: 'indigo' },
  { symbol: '++', color: 'cyan' },
  { symbol: '--', color: 'purple' },
  { symbol: '!=', color: 'blue' },
  { symbol: '===', color: 'indigo' },
  { symbol: '||=', color: 'cyan' },
  { symbol: '+=', color: 'purple' },
  { symbol: '&&=', color: 'blue' },
  { symbol: '//', color: 'indigo' },
  { symbol: '/**/', color: 'cyan' },
  { symbol: '*/', color: 'purple' },
  { symbol: '#', color: 'blue' },
  { symbol: '@', color: 'indigo' },
  { symbol: '|', color: 'cyan' },
  { symbol: '&', color: 'purple' },
  { symbol: '~', color: 'blue' },
  { symbol: '^', color: 'indigo' },
  { symbol: '<<', color: 'cyan' },
  { symbol: '>>', color: 'purple' },
  { symbol: '<=', color: 'blue' },
  { symbol: '/> ', color: 'indigo' },
  { symbol: '...', color: 'cyan' },
];

const getRandomPosition = () => {
  const positions = [
    { top: '10%', left: '5%' },
    { top: '20%', right: '8%' },
    { top: '33%', left: '10%' },
    { top: '50%', right: '15%' },
    { top: '33%', left: '8%' },
    { top: '25%', right: '10%' },
    { top: '66%', left: '25%' },
    { top: '50%', right: '25%' },
    { top: '75%', left: '20%' },
    { top: '25%', right: '20%' },
    { top: '15%', left: '20%' },
    { top: '30%', right: '20%' },
    { top: '20%', left: '30%' },
    { top: '10%', right: '30%' },
    { top: '50%', left: '35%' },
    { top: '33%', right: '35%' },
    { top: '20%', left: '40%' },
    { top: '10%', right: '40%' },
    { top: '50%', left: '50%' },
    { top: '20%', right: '50%' },
    { top: '75%', left: '50%' },
    { top: '10%', right: '50%' },
    { top: '20%', left: '50%' },
    { top: '50%', left: '45%' },
    { top: '33%', right: '45%' },
    { top: '20%', left: '35%' },
    { top: '75%', left: '35%' },
    { top: '25%', right: '35%' },
    { top: '50%', left: '45%' },
    { top: '75%', right: '45%' },
    { top: '10%', left: '50%' },
    { top: '20%', right: '50%' },
    { top: '50%', left: '50%' },
    { top: '75%', left: '50%' },
    { top: '10%', right: '50%' },
    { top: '20%', left: '50%' },
  ];
  
  return positions[Math.floor(Math.random() * positions.length)];
};

const getRandomRotation = () => {
  const rotations = ['-rotate-6', '-rotate-12', '-rotate-45', 'rotate-6', 'rotate-90', 'rotate-12', 'rotate-45', '-rotate-90', '-rotate-6', '-rotate-12', '-rotate-45'];
  return rotations[Math.floor(Math.random() * rotations.length)];
};

const getRandomSize = () => {
  const sizes = ['text-2xl', 'text-3xl', 'text-4xl'];
  return sizes[Math.floor(Math.random() * sizes.length)];
};

const getColorClass = (color) => {
  const colorMap = {
    cyan: 'text-cyan-500/6',
    purple: 'text-purple-500/6',
    blue: 'text-blue-500/6',
    indigo: 'text-indigo-500/6',
  };
  return colorMap[color] || 'text-cyan-500/6';
};

export const DynamicCodingSymbols = ({ count = 15 }) => {
  const [symbols, setSymbols] = useState([]);

  useEffect(() => {
    const generateSymbols = () => {
      const shuffled = [...CODING_SYMBOLS].sort(() => Math.random() - 0.5);
      const selected = shuffled.slice(0, count);
      
      return selected.map((item, index) => ({
        ...item,
        id: index,
        position: getRandomPosition(),
        rotation: getRandomRotation(),
        size: getRandomSize(),
      }));
    };

    setSymbols(generateSymbols());
  }, [count]);

  const memoizedSymbols = useMemo(() => symbols, [symbols]);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {memoizedSymbols.map((symbol) => (
        <div
          key={symbol.id}
          className={`absolute ${getColorClass(symbol.color)} font-mono ${symbol.size} opacity-15 ${symbol.rotation}`}
          style={{
            ...symbol.position,
          }}
        >
          {symbol.symbol}
        </div>
      ))}
    </div>
  );
};

export default DynamicCodingSymbols;
