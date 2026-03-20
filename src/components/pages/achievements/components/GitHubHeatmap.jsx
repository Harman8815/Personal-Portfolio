import React, { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, TrendingUp, ChevronDown } from "lucide-react";
import { BackgroundLayer } from "./UIComponents";

export const GitHubHeatmap = ({ githubData }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [hoveredDay, setHoveredDay] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const heatmapRef = useRef(null);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Get available years from contributions data
  const availableYears = useMemo(() => {
    if (!githubData?.contributions) return [new Date().getFullYear()];
    
    const years = new Set();
    githubData.contributions.forEach(contrib => {
      years.add(new Date(contrib.date).getFullYear());
    });
    
    return Array.from(years).sort((a, b) => b - a);
  }, [githubData]);

  // Generate GitHub-like heatmap data structure
  const heatmapData = useMemo(() => {
    // Get contributions for selected year or generate mock data
    let yearContributions = [];
    
    if (githubData?.contributions) {
      yearContributions = githubData.contributions.filter(contrib => {
        return new Date(contrib.date).getFullYear() === selectedYear;
      });
    } else {
      // Generate mock data for the selected year
      yearContributions = Array.from({ length: 365 }, (_, i) => ({
        date: new Date(selectedYear, 0, 1).getTime() + (i * 24 * 60 * 60 * 1000),
        count: Math.floor(Math.random() * 10),
        level: Math.floor(Math.random() * 5)
      })).map((contrib, i) => ({
        ...contrib,
        date: new Date(contrib.date).toISOString().split('T')[0]
      }));
    }

    // Sort contributions chronologically
    yearContributions.sort((a, b) => new Date(a.date) - new Date(b.date));

    // Create a map for quick lookup
    const contribMap = new Map();
    yearContributions.forEach(contrib => {
      contribMap.set(contrib.date, contrib);
    });

    // Get the start and end dates for the selected year
    const startDate = new Date(selectedYear, 0, 1); // January 1st
    const endDate = new Date(selectedYear, 11, 31); // December 31st
    
    // Find the first Sunday on or before January 1st (GitHub starts weeks on Sunday)
    const firstSunday = new Date(startDate);
    firstSunday.setDate(startDate.getDate() - startDate.getDay());
    
    // Generate all weeks from first Sunday to end of year
    const weeks = [];
    let currentDate = new Date(firstSunday);
    
    while (currentDate <= endDate || weeks.length === 0 || weeks[weeks.length - 1].some(day => day !== null)) {
      const week = [];
      
      // Generate 7 days for the week (Sunday to Saturday)
      for (let dayOfWeek = 0; dayOfWeek < 7; dayOfWeek++) {
        const dateStr = currentDate.toISOString().split('T')[0];
        
        // Only include days within the selected year
        if (currentDate.getFullYear() === selectedYear) {
          const contrib = contribMap.get(dateStr);
          week.push(contrib || { date: dateStr, count: 0, level: 0 });
        } else {
          week.push(null);
        }
        
        currentDate.setDate(currentDate.getDate() + 1);
      }
      
      weeks.push(week);
    }

    // Ensure we have exactly 53 weeks (GitHub standard)
    while (weeks.length < 53) {
      weeks.push(Array(7).fill(null));
    }
    while (weeks.length > 53) {
      weeks.pop();
    }

    return weeks;
  }, [githubData, selectedYear]);

  // Calculate current streak from contributions (optimized reverse read)
 const currentStreak = useMemo(() => {
  const allContributions = githubData?.contributions || contributions;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // ❗ Remove future dates
  const validContribs = allContributions.filter(c => {
    const d = new Date(c.date);
    d.setHours(0, 0, 0, 0);
    return d <= today;
  });

  // Convert to map for O(1) lookup
  const contribMap = new Map(
    validContribs.map(c => [
      new Date(c.date).toISOString().split("T")[0],
      c.count
    ])
  );

  let streak = 0;
  let currentDate = new Date(today);

  while (true) {
    const key = currentDate.toISOString().split("T")[0];
    const count = contribMap.get(key) || 0;

    console.log("Checking:", key, "Count:", count);

    if (count > 0) {
      streak++;
    } else {
      break;
    }

    // Move to previous day
    currentDate.setDate(currentDate.getDate() - 1);
  }

  console.log("Final streak:", streak);
  return streak;
}, [githubData, selectedYear]);

  const stats = githubData ? [
    { label: "Total Commits", value: Number(githubData.stats.totalContributions).toLocaleString() || "0", color: "text-green-400" },
    { label: "Current Year", value: Number(githubData.stats.currentYearContributions).toLocaleString() || "0", color: "text-purple-400" },
    { label: "Current Streak", value: currentStreak.toString(), color: "text-orange-400" },
    { label: "Longest Streak", value: Number(githubData.stats.longestStreak).toString() || "0", color: "text-yellow-400" },
  ] : [
    { label: "Commits", value: "1,240", color: "text-green-400" },
    { label: "PRs", value: "84", color: "text-purple-400" },
    { label: "Issues", value: "62", color: "text-orange-400" },
    { label: "Stars", value: "156", color: "text-yellow-400" },
  ];

  const getContributionLevel = (contrib) => {
    if (!contrib || contrib.count === 0) return 0;
    
    // GitHub uses 5 levels: 0 (no contributions), 1-4 (increasing intensity)
    if (contrib.count >= 20) return 4;
    if (contrib.count >= 10) return 3;
    if (contrib.count >= 5) return 2;
    if (contrib.count >= 1) return 1;
    return 0;
  };

  const getContributionColor = (level) => {
    const colors = [
      "rgba(29, 39, 52, 0.94)",      // Level 0 - extremely dark gray (50% darker)
      "rgba(34, 197, 94, 0.4)",     // Level 1 - brighter green
      "rgba(34, 197, 94, 0.6)",     // Level 2 - medium green
      "rgba(34, 197, 94, 0.8)",     // Level 3 - dark green
      "rgba(34, 197, 94, 1.0)",     // Level 4 - very dark green (full opacity)
    ];
    return colors[level] || colors[0];
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Generate month labels for the heatmap
  const monthLabels = useMemo(() => {
    const labels = [];
    const firstWeek = heatmapData[0];
    if (!firstWeek) return labels;
    
    let currentMonth = -1;
    heatmapData.forEach((week, weekIndex) => {
      const firstDay = week.find(day => day !== null);
      if (firstDay) {
        const month = new Date(firstDay.date).getMonth();
        if (month !== currentMonth) {
          currentMonth = month;
          labels.push({ month, weekIndex });
        }
      }
    });
    
    return labels;
  }, [heatmapData]);

  return (
    <div className="w-full p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
      <BackgroundLayer type="grid" />

      <div className="flex flex-col lg:flex-row gap-12 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-4 rounded-2xl bg-white/5 text-white">
              <Github className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-4xl font-black text-white uppercase tracking-tighter">
                Contribution Activity
              </h3>
              <p className="text-slate-400 font-light">
                {selectedYear} contributions overview
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors"
              >
                <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-2">
                  {stat.label}
                </div>
                <div className={`text-3xl font-black ${stat.color}`}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between mb-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                {selectedYear} Activity
              </div>
              
              {/* Year Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-white/10 hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm font-bold text-white">
                    {selectedYear}
                  </span>
                  <ChevronDown className={`w-3 h-3 text-white transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isDropdownOpen && (
                  <div className="absolute top-full mt-2 right-0 bg-[#0f172a] border border-white/20 rounded-lg shadow-xl z-50 min-w-[80px]">
                    {availableYears.map(year => (
                      <button
                        key={year}
                        onClick={() => {
                          setSelectedYear(year);
                          setIsDropdownOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-white/10 transition-colors ${
                          year === selectedYear ? 'text-cyan-400 font-bold' : 'text-white'
                        }`}
                      >
                        {year}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* GitHub-style Heatmap */}
            <div className="relative" ref={heatmapRef}>
              {/* Month labels */}
              <div className="flex text-xs text-slate-500 mb-2 ml-8">
                {Array.from({ length: 53 }, (_, i) => {
                  const monthLabel = monthLabels.find(label => label.weekIndex === i);
                  return (
                    <div 
                      key={i} 
                      className="flex-1 min-w-[11px]"
                    >
                      {monthLabel && months[monthLabel.month]}
                    </div>
                  );
                })}
              </div>

              <div className="flex gap-1">
                {/* Weekday labels */}
                <div className="flex flex-col gap-1 text-xs text-slate-500 mr-2">
                  {weekdays.map((day, i) => (
                    <div key={day} className="h-3 flex items-center">
                      {i % 2 === 1 ? day : ''}
                    </div>
                  ))}
                </div>

                {/* Contribution grid */}
                <div className="flex gap-1">
                  {heatmapData.map((week, weekIndex) => (
                    <div key={weekIndex} className="flex flex-col gap-1">
                      {week.map((contrib, dayIndex) => {
                        const level = getContributionLevel(contrib);
                        return (
                          <motion.div
                            key={`${weekIndex}-${dayIndex}`}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001 }}
                            className="w-3 h-3 rounded-sm hover:scale-150 transition-transform cursor-pointer relative"
                            style={{
                              backgroundColor: contrib ? getContributionColor(level) : 'transparent',
                            }}
                            onMouseEnter={(e) => {
                              // Debug log
                              console.log('Hover enter:', { contrib, hasDate: !!contrib?.date, hasCount: !!contrib?.count });
                              
                              // More permissive hover condition - allow hover on any non-null contrib
                              if (contrib && (contrib.date || contrib.count === 0)) {
                                const rect = e.target.getBoundingClientRect();
                                const containerRect = heatmapRef.current?.getBoundingClientRect();
                                setHoveredDay({
                                  data: contrib,
                                  mouseX: e.clientX,
                                  mouseY: e.clientY,
                                  relativeX: rect.left + rect.width / 2 - (containerRect?.left || 0)
                                });
                              }
                            }}
                            onMouseMove={(e) => {
                              if (hoveredDay && contrib && hoveredDay.data.date === contrib.date) {
                                const rect = e.target.getBoundingClientRect();
                                const containerRect = heatmapRef.current?.getBoundingClientRect();
                                setHoveredDay(prev => ({
                                  ...prev,
                                  mouseX: e.clientX,
                                  mouseY: e.clientY,
                                  relativeX: rect.left + rect.width / 2 - (containerRect?.left || 0)
                                }));
                              }
                            }}
                            onMouseLeave={() => setHoveredDay(null)}
                          />
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>

              {/* Legend */}
              <div className="flex items-center justify-between mt-4">
                <div className="text-xs text-slate-500">
                  Less
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      className="w-3 h-3 rounded-sm"
                      style={{ backgroundColor: getContributionColor(level) }}
                    />
                  ))}
                </div>
                <div className="text-xs text-slate-500">
                  More
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-80 space-y-6">
          <div className="p-8 rounded-[2.5rem] bg-gradient-to-br from-green-500/10 to-emerald-500/5 border border-white/10">
            <div className="text-[10px] font-mono text-green-500 uppercase tracking-widest mb-4">
              Current Streak
            </div>
            <div className="text-6xl font-black text-white mb-2">
              {currentStreak}
            </div>
            <div className="text-sm text-slate-400">
              Days of consistent commits
            </div>
            <div className="mt-8 flex items-center gap-2 text-green-400 font-bold">
              <TrendingUp className="w-4 h-4" />
              <span>Active contributor</span>
            </div>
          </div>

          <div className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10">
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-6">
              Top Languages
            </div>
            <div className="space-y-4">
              {[
                { name: "TypeScript", value: 45, color: "#3178c6" },
                { name: "Rust", value: 30, color: "#dea584" },
                { name: "Go", value: 15, color: "#00add8" },
                { name: "Python", value: 10, color: "#3776ab" },
              ].map((lang) => (
                <div key={lang.name} className="flex items-center gap-4">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: lang.color }}
                  />
                  <div className="flex-1 text-xs font-bold text-white uppercase tracking-widest">
                    {lang.name}
                  </div>
                  <div className="text-xs font-mono text-slate-500">
                    {lang.value}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tooltip that follows mouse cursor */}
      {hoveredDay && (
        <div 
          className="fixed z-50 bg-[#0f172a] border border-white/20 rounded-lg p-3 shadow-xl pointer-events-none"
          style={{
            left: `${hoveredDay.relativeX+80}px`,
            top: `${hoveredDay.mouseY - 80}px`,
          }}
        >
          <div className="text-xs font-bold text-white mb-1">
            {new Date(hoveredDay.data.date).toLocaleDateString('en-US', { 
              weekday: 'short', 
              year: 'numeric', 
              month: 'short', 
              day: 'numeric' 
            })}
          </div>
          <div className="text-xs text-slate-400">
            {hoveredDay.data.count} {hoveredDay.data.count === 1 ? 'commit' : 'commits'}
          </div>
          {hoveredDay.data.count > 0 && (
            <div className="text-xs text-green-400 mt-1">
              Active day
            </div>
          )}
        </div>
      )}
    </div>
  );
};
