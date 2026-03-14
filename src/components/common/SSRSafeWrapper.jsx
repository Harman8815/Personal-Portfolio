"use client";

import React, { useEffect, useState } from 'react';

const SSRSafeWrapper = ({ children, fallback = null }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return fallback;
  }

  return children;
};

export default SSRSafeWrapper;
