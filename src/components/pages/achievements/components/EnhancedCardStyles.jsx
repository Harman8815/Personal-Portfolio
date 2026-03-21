"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './EnhancedCardStyles.css';

const colorClasses = [
  'color-red',
  'color-green', 
  'color-yellow',
  'color-purple',
  'color-orange'
];

export const EnhancedCardWrapper = ({ children, className = "", variant = "default", randomColor = false, ...props }) => {
  const [colorClass, setColorClass] = useState('');

  useEffect(() => {
    if (randomColor) {
      const randomIndex = Math.floor(Math.random() * colorClasses.length);
      setColorClass(colorClasses[randomIndex]);
    }
  }, [randomColor]);

  const getVariantClasses = () => {
    switch (variant) {
      case "impact":
        return "enhanced-impact-card";
      case "award":
        return "enhanced-award-card";
      default:
        return "enhanced-default-card";
    }
  };

  return (
    <motion.div 
      className={`enhanced-card ${getVariantClasses()} ${colorClass} ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: props.delay || 0 }}
      {...props}
    >
      <div className="scan-lines" />
      <div className="particles" />
      <div className="noise-overlay" />
      {children}
    </motion.div>
  );
};
