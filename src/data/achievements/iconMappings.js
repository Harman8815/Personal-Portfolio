import React from 'react';
import {
  Trophy,
  BookOpen,
  Rocket,
  Activity,
  Zap,
  Award,
  Calendar,
  Clock,
  ExternalLink,
  Code2,
  Brain,
  Github,
} from 'lucide-react';

export const iconMap = {
  Trophy,
  BookOpen,
  Rocket,
  Activity,
  Zap,
  Award,
  Calendar,
  Clock,
  ExternalLink,
  Code2,
  Brain,
  Github,
};

export const getIcon = (iconName, className = "w-8 h-8") => {
  const IconComponent = iconMap[iconName];
  return IconComponent ? <IconComponent className={className} /> : null;
};

// Custom logo icons for platforms
export const getCustomIcon = (platform, className = "w-8 h-8") => {
  const icons = {
    leetcode: (
      <img 
        src="https://cdn.iconscout.com/icon/free/png-512/free-leetcode-logo-icon-svg-download-png-2944960.png"
        alt="LeetCode"
        className={className}
        style={{ objectFit: 'contain' }}
      />
    ),
    interviewbit: (
      <img 
        src="https://ibassets.s3.amazonaws.com/static-assets/ib-logo-square.png"
        alt="InterviewBit"
        className={className}
        style={{ objectFit: 'contain' }}
      />
    ),
    gfg: (
      <img 
        src="https://upload.wikimedia.org/wikipedia/commons/e/eb/GeeksForGeeks_logo.png"
        alt="GeeksForGeeks"
        className={className}
        style={{ objectFit: 'contain' }}
      />
    ),
  };
  
  return icons[platform] || null;
};
