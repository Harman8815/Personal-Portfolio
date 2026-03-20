import React from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Star,
  Award,
  CheckCircle2,
  Eye,
  Code2,
  MessageSquare,
  Flame,
  Trophy,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
} from "recharts";
import { DraggableCard } from "./UIComponents";

export const JackrankCard = () => {
  const domains = [
    { name: "Problem Solving", rank: 120, stars: 5, score: 92 },
    { name: "React.js", rank: 42, stars: 5, score: 98 },
    { name: "Node.js", rank: 88, stars: 4, score: 85 },
    { name: "Python", rank: 210, stars: 4, score: 82 },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#10b981] border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center shadow-lg">
            <ShieldCheck className="w-8 h-8 text-[#10b981]" />
          </div>
          <div>
            <div className="text-xl font-bold text-white">Jackrank</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-bold text-white uppercase tracking-wider">
                Verified Developer
              </span>
              <span className="text-[10px] text-white/70">
                Global Rank: #842
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
            Skill Score
          </div>
          <div className="text-lg font-bold text-white">9,840</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-6 p-5 rounded-2xl bg-white border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Domain Proficiency
          </div>
          <div className="space-y-4">
            {domains.map((domain) => (
              <div key={domain.name} className="space-y-1">
                <div className="flex justify-between items-center">
                  <div className="text-xs font-bold text-slate-700">
                    {domain.name}
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-2.5 h-2.5 ${i < domain.stars ? "text-yellow-400 fill-yellow-400" : "text-slate-200"}`}
                      />
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${domain.score}%` }}
                      className="h-full bg-[#10b981] rounded-full"
                    />
                  </div>
                  <span className="text-[9px] font-bold text-slate-400">
                    #{domain.rank}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-6 space-y-4">
          <div className="p-5 rounded-2xl bg-white border border-slate-200">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
              Recent Certifications
            </div>
            <div className="space-y-2">
              {[
                {
                  name: "Frontend Developer (React)",
                  date: "Mar 2024",
                  level: "Advanced",
                },
                {
                  name: "Backend Developer (Node)",
                  date: "Feb 2024",
                  level: "Intermediate",
                },
              ].map((cert) => (
                <div
                  key={cert.name}
                  className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100"
                >
                  <Award className="w-5 h-5 text-[#10b981]" />
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-slate-700">
                      {cert.name}
                    </div>
                    <div className="text-[8px] text-slate-400">
                      {cert.date} • {cert.level}
                    </div>
                  </div>
                  <div className="px-1.5 py-0.5 rounded bg-[#10b981]/10 text-[7px] font-bold text-[#10b981]">
                    VERIFIED
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#ecfdf5] border border-emerald-100 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-emerald-700">
                Skills Verified
              </div>
              <div className="text-[9px] text-emerald-600">
                12 Skills across 4 domains
              </div>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-white bg-emerald-500 flex items-center justify-center"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const LeetCodeCard = () => {
  const solvedData = [
    { name: "Easy", value: 450, total: 600, color: "#00B8A3" },
    { name: "Medium", value: 820, total: 1200, color: "#FFC01E" },
    { name: "Hard", value: 180, total: 400, color: "#EF4743" },
  ];

  const ratingData = [
    { month: "Jan", rating: 1850 },
    { month: "Feb", rating: 1920 },
    { month: "Mar", rating: 1880 },
    { month: "Apr", rating: 2050 },
    { month: "May", rating: 2180 },
    { month: "Jun", rating: 2245 },
  ];

  const totalSolved = solvedData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#282828] border border-white/5 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center border border-white/10">
            <img
              src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcf903997f7.png"
              alt="LC"
              className="w-7 h-7 object-contain"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-xl font-bold text-white">LeetCode</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-[#ffa116]/20 text-[9px] font-bold text-[#ffa116] uppercase">
                Guardian
              </span>
              <span className="text-[10px] text-white/50">
                Top 1.2% • Rank: #12,450
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
            Contest Rating
          </div>
          <div className="text-lg font-bold text-[#ffa116]">2,245</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1">
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#282828] border border-white/5 flex flex-col h-full">
          <div className="relative flex-1 mb-6 min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={solvedData}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={60}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {solvedData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-white">{totalSolved}</div>
              <div className="text-[8px] font-mono text-slate-500 uppercase tracking-widest">
                Solved
              </div>
            </div>
          </div>
          <div className="w-full space-y-3 flex-shrink-0">
            {solvedData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest">
                  <span style={{ color: item.color }}>{item.name}</span>
                  <span className="text-white font-bold">
                    {item.value}
                    <span className="text-slate-600 ml-1">/{item.total}</span>
                  </span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                      width: `${(item.value / item.total) * 100}%`,
                    }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-8 flex flex-col h-full space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
            <div className="p-5 rounded-2xl bg-[#282828] border border-white/5 flex flex-col h-full">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 flex-shrink-0">
                Rating History
              </div>
              <div className="flex-1 min-h-[100px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={ratingData}>
                    <defs>
                      <linearGradient
                        id="colorRating"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ffa116"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ffa116"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" hide />
                    <YAxis hide domain={["dataMin - 100", "dataMax + 100"]} />
                    <Area
                      type="monotone"
                      dataKey="rating"
                      stroke="#ffa116"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRating)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#282828] border border-white/5 flex flex-col h-full">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest mb-4 flex-shrink-0">
                Community
              </div>
              <div className="space-y-3 flex-1">
                {[
                  {
                    label: "Views",
                    value: "12.4k",
                    icon: <Eye className="w-3 h-3" />,
                  },
                  {
                    label: "Solutions",
                    value: "142",
                    icon: <Code2 className="w-3 h-3" />,
                  },
                  {
                    label: "Discuss",
                    value: "84",
                    icon: <MessageSquare className="w-3 h-3" />,
                  },
                ].map((stat, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-400">
                      {stat.icon}
                      <span className="text-[9px] font-mono uppercase tracking-widest">
                        {stat.label}
                      </span>
                    </div>
                    <span className="text-xs font-bold text-white">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-3 flex-shrink-0">
            {[
              { label: "Submissions", value: "4.2k" },
              { label: "Beats", value: "98.5%" },
              { label: "Points", value: "12.5k" },
              { label: "Streak", value: "45" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#282828] border border-white/5 text-center"
              >
                <div className="text-sm font-bold text-white">{stat.value}</div>
                <div className="text-[7px] font-mono text-slate-500 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const GFGCard = () => {
  const gfgData = [
    { name: "School", value: 45, color: "#2f8d46" },
    { name: "Basic", value: 120, color: "#5cb85c" },
    { name: "Easy", value: 340, color: "#8bc34a" },
    { name: "Medium", value: 180, color: "#ffc107" },
    { name: "Hard", value: 42, color: "#f44336" },
  ];

  const totalSolved = gfgData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#004d26] border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <img
              src="https://media.geeksforgeeks.org/gfg-gg-logo.svg"
              alt="GFG"
              className="w-8 h-8"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-xl font-bold text-white">GeeksForGeeks</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-bold text-white uppercase">
                Master
              </span>
              <span className="text-[10px] text-white/70">Rank: #4,210</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
            Institute Rank
          </div>
          <div className="text-lg font-bold text-white">#12</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 p-5 rounded-2xl bg-[#f8f9fa] border border-slate-200">
          <div className="flex justify-between items-center mb-4">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Problems Solved
            </div>
            <div className="text-xl font-bold text-[#2f8d46]">
              {totalSolved}
            </div>
          </div>
          <div className="space-y-3">
            {gfgData.map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-600 uppercase">
                  <span>{item.name}</span>
                  <span>{item.value}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(item.value / 400) * 100}%` }}
                    className="h-full rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                PotD Streak
              </div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-[#2f8d46]">124</div>
                <Flame className="w-5 h-5 text-orange-500 mb-1" />
              </div>
              <div className="mt-4 flex gap-0.5">
                {[1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1].map((active, i) => (
                  <div
                    key={i}
                    className={`h-4 flex-1 rounded-sm ${active ? "bg-[#2f8d46]" : "bg-slate-200"}`}
                  />
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#f8f9fa] border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Contest Rating
              </div>
              <div className="text-3xl font-bold text-[#2f8d46]">1,845</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-1">
                Top 5% Globally
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Monthly Score", value: "1,450" },
              { label: "Total Score", value: "12.8k" },
              { label: "Contests", value: "42" },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-[#f8f9fa] border border-slate-200 text-center"
              >
                <div className="text-sm font-bold text-[#2f8d46]">
                  {stat.value}
                </div>
                <div className="text-[7px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const InterviewBitCard = () => {
  const topics = [
    { name: "Arrays", progress: 95 },
    { name: "Strings", progress: 88 },
    { name: "Hashing", progress: 75 },
    { name: "Linked Lists", progress: 92 },
    { name: "Stacks & Queues", progress: 80 },
  ];

  return (
    <div className="flex flex-col gap-4 h-full">
      <div className="flex items-center justify-between p-5 rounded-2xl bg-[#0170fe] border border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
            <img
              src="https://www.interviewbit.com/assets/interviewbit/logo-640x640-3435678.png"
              alt="IB"
              className="w-8 h-8"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <div className="text-xl font-bold text-white">InterviewBit</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-white/20 text-[9px] font-bold text-white uppercase">
                Level 18
              </span>
              <span className="text-[10px] text-white/70 font-mono">
                Elite Status
              </span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[9px] font-mono text-white/50 uppercase tracking-widest">
            Global Rank
          </div>
          <div className="text-lg font-bold text-white">#1,840</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        <div className="md:col-span-5 p-5 rounded-2xl bg-white border border-slate-200">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
            Topic Mastery
          </div>
          <div className="space-y-3">
            {topics.map((topic) => (
              <div key={topic.name} className="space-y-1">
                <div className="flex justify-between text-[9px] font-bold text-slate-600 uppercase">
                  <span>{topic.name}</span>
                  <span>{topic.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${topic.progress}%` }}
                    className="h-full bg-[#0170fe] rounded-full"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-7 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Streak
              </div>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-bold text-[#0170fe]">48</div>
                <div className="text-xs font-bold text-slate-400 mb-1">
                  Days
                </div>
              </div>
              <div className="mt-4 flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-white bg-slate-50 flex items-center justify-center"
                  >
                    <Trophy className="w-4 h-4 text-[#0170fe]" />
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200">
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                Coins & Points
              </div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                    Coins
                  </span>
                  <span className="text-sm font-bold text-[#0170fe]">
                    4,250
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-bold text-slate-500 uppercase">
                    Points
                  </span>
                  <span className="text-sm font-bold text-[#0170fe]">
                    12,450
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <div className="text-lg font-bold text-[#0170fe]">92%</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                Accuracy
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-slate-200 text-center">
              <div className="text-lg font-bold text-[#0170fe]">156</div>
              <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">
                Problems
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
