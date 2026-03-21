"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { CardProvider } from "./context/Context";
import {
  Skeleton,
  BackgroundLayer,
  DraggableCard,
  Counter,
  LogoWithLoading,
  BadgeGrid,
} from "./components/UIComponents";
import { LeetCodeCard, GFGCard, InterviewBitCard } from "./components/Cards";
import { GitHubHeatmap } from "./components/GitHubHeatmap";
import { UnifiedModal } from "./components/UnifiedModal";
import { EnhancedCardWrapper } from "./components/EnhancedCardStyles";
import {
  CodeBracketOpen,
  CodeBracketClose,
  CodeSlash,
  CodeBrackets,
  CodeCurly,
  CodeSquare,
  CodeFunction,
  CodeConst,
  CodeLet,
  CodeReturn,
  CodeExport,
  CodeAsync,
  CodeAwait
} from "./components/CodingSymbols";
import { useGitHubData } from "../../../hooks/useGitHubData";
import {
  leetCodeBadges,
  interviewBitBadges,
  achievementsTabs,
  careerMilestones,
  impactData,
  getIcon,
  getCustomIcon,
} from "../../../data/achievements/index.js";
import "./components/AchievementsBackground.css";

gsap.registerPlugin(ScrollTrigger);

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState("mastery");
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState(null);

  const { data: githubData, isLoading: githubLoading, error: githubError } = useGitHubData();

  if (githubError) {
    console.error('GitHub data fetch error:', githubError);
  }

  if (githubData) {
    console.log('GitHub data loaded:', githubData.stats);
  }

  const openBadgeModal = (badge) => {
    setModalType("badge");
    setModalContent(badge);
    setModalOpen(true);
  };

  const openCardModal = (cardId) => {
    setModalType("card");
    setModalContent(cardId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setModalType(null);
      setModalContent(null);
    }, 300);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isLoading && !githubLoading) {
      ScrollTrigger.refresh();
    }
  }, [activeTab, isLoading, githubLoading]);

  const tabs = achievementsTabs.map(tab => ({
    ...tab,
    icon: getIcon(tab.icon, "w-4 h-4")
  }));

  if (isLoading || githubLoading) {
    return (
      <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 md:px-12">
        <div className="max-w-7xl mx-auto space-y-20">
          <div className="text-center space-y-6">
            <Skeleton className="h-12 w-48 mx-auto rounded-full" />
            <Skeleton className="h-24 w-full max-w-4xl mx-auto" />
            <Skeleton className="h-6 w-full max-w-2xl mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Skeleton className="h-[500px] rounded-[3rem]" />
            <Skeleton className="h-[500px] rounded-[3rem]" />
            <Skeleton className="h-[500px] rounded-[3rem]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 md:px-12 selection:bg-cyan-500/30 relative overflow-hidden">
      {/* Background Design Effects */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Floating Geometric Shapes */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-full blur-3xl opacity-30"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-tl from-purple-500/5 to-transparent rounded-full blur-2xl opacity-20"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-blue-500/5 to-transparent rounded-full blur-3xl opacity-25"></div>

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-purple-400/20 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/4 left-1/2 w-2 h-2 bg-blue-400/25 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 right-1/3 w-1 h-1 bg-indigo-400/30 rounded-full animate-pulse"></div>

        {/* Light Beams */}
        <div className="absolute top-0 left-1/4 w-px h-64 bg-gradient-to-b from-cyan-400/20 to-transparent transform rotate-45"></div>
        <div className="absolute top-0 right-1/4 w-px h-48 bg-gradient-to-b from-purple-400/15 to-transparent transform -rotate-45"></div>
        <div className="absolute bottom-0 left-1/3 w-px h-56 bg-gradient-to-t from-blue-400/20 to-transparent transform rotate-45"></div>

        {/* Orbital Rings */}
        <div className="absolute top-1/3 left-1/2 w-64 h-64 border border-cyan-400/10 rounded-full animate-spin-slow"></div>
        <div className="absolute bottom-1/3 right-1/2 w-48 h-48 border border-purple-400/10 rounded-full animate-spin-slow-reverse"></div>
      </div>

      <BackgroundLayer type="mesh" />

      <AnimatePresence>
        {!isLoading && (
          <>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
              className="max-w-7xl mx-auto mb-24 text-center relative"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-sm">
                <Activity className="w-4 h-4 text-cyan-400 animate-pulse" />
                <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-[0.4em]">
                  Data-Driven Evolution
                </span>
              </div>

              <h1 className="text-7xl md:text-9xl font-black text-white uppercase tracking-tighter mb-8 leading-[0.85]">
                Achieve
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600">
                  ments
                </span>
              </h1>

              <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed">
                A cinematic visualization of technical growth, competitive
                mastery, and the measurable impact of engineering excellence.
              </p>
            </motion.div> {/* ✅ FIX: this was missing */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-7xl mx-auto mb-24 sticky top-32 z-50"
            >
              <div className="flex flex-wrap justify-center gap-4 p-3 rounded-[2rem] bg-[#0f172a]/80 border border-white/10 backdrop-blur-2xl w-fit mx-auto shadow-2xl">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${activeTab === tab.id
                      ? "text-white"
                      : "text-slate-500 hover:text-slate-300"
                      }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute inset-0 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                    <span className="relative z-10">{tab.icon}</span>
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>

            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-7xl mx-auto space-y-32"
            >
              {activeTab === "mastery" && (
                <div className="space-y-16">
                  <section className="relative w-full overflow-hidden">
                    {/* Background Coding Symbols */}
                    <div className="absolute inset-0 pointer-events-none z-0">
                      {/* Floating Code Brackets */}
                      <div className="absolute top-10 left-10 text-cyan-500/10 font-mono text-6xl opacity-20">
                        {'< />'}
                      </div>
                      <div className="absolute top-20 right-10 text-cyan-500/10 font-mono text-6xl opacity-20 rotate-12">
                        {'</>'}
                      </div>
                      {/* ... */}
                    </div>

                    <div className="flex items-center gap-6 mb-16 max-w-[80%] mx-auto relative z-10">
                      <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                        <Trophy className="w-8 h-8" />
                      </div>
                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                        Coding Mastery
                      </h2>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div className="space-y-8 max-w-7xl mx-auto relative z-10">
                      {/* Row 1: LeetCode (2 columns width) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EnhancedCardWrapper 
                          key="leetcode"
                          variant="impact"
                          delay={0}
                          className="relative h-[500px] sm:h-[550px] p-6 sm:p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500 lg:col-span-2"
                          style={{ '--card-bg': 'rgba(255,255,255,0.05)' }}
                        >
                          <LeetCodeCard />
                        </EnhancedCardWrapper>
                      </div>

                      {/* Row 2: GFG and InterviewBit (50:50 ratio) */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <EnhancedCardWrapper 
                          key="gfg"
                          variant="impact"
                          delay={0.2}
                          className="relative h-[500px] sm:h-[550px] p-6 sm:p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                          style={{ '--card-bg': 'rgba(255,255,255,0.05)' }}
                        >
                          <GFGCard />
                        </EnhancedCardWrapper>

                        <EnhancedCardWrapper 
                          key="interviewbit"
                          variant="impact"
                          delay={0.4}
                          className="relative h-[500px] sm:h-[550px] p-6 sm:p-8 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                          style={{ '--card-bg': 'rgba(255,255,255,0.05)' }}
                        >
                          <InterviewBitCard />
                        </EnhancedCardWrapper>
                      </div>
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "activity" && (
                <div className="space-y-32">
                  <section>
                    <div className="flex items-center gap-6 mb-16">
                      <div className="p-4 rounded-2xl bg-green-500/10 text-green-400">
                        <Github className="w-8 h-8" />
                      </div>
                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                        Development Activity
                      </h2>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <GitHubHeatmap githubData={githubData} />
                  </section>

                  <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                      {(githubData
                        ? [
                          {
                            label: "Total Contributions",
                            value: Number(githubData.stats.totalContributions) || 0,
                            icon: <Github className="w-8 h-8" />,
                            color: "text-cyan-400",
                          },
                          {
                            label: "2026 Contributions",
                            value: Number(githubData.stats.currentYearContributions) || 0,
                            icon: <Calendar className="w-8 h-8" />,
                            color: "text-green-400",
                          },
                          {
                            label: "Current Streak",
                            value: Number(githubData.stats.currentStreak) || 0,
                            icon: <Zap className="w-8 h-8" />,
                            color: "text-orange-400",
                          },
                          {
                            label: "Longest Streak",
                            value: Number(githubData.stats.longestStreak) || 0,
                            icon: <Trophy className="w-8 h-8" />,
                            color: "text-purple-400",
                          },
                          {
                            label: "Repositories",
                            value: Number(githubData.stats.repositories) || 0,
                            icon: <Code2 className="w-8 h-8" />,
                            color: "text-blue-400",
                          },
                          {
                            label: "Followers",
                            value: Number(githubData.stats.followers) || 0,
                            icon: <Activity className="w-8 h-8" />,
                            color: "text-pink-400",
                          },
                          {
                            label: "Following",
                            value: Number(githubData.stats.following) || 0,
                            icon: <Rocket className="w-8 h-8" />,
                            color: "text-indigo-400",
                          },
                        ]
                        : Array(8).fill(null).map((_, i) => ({
                          label: "Loading",
                          value: null,
                          icon: <div className="w-8 h-8 bg-white/10 rounded-lg animate-pulse" />,
                          color: "text-slate-400",
                        })))
                        .map((stat, i) => (
                          <EnhancedCardWrapper
                            key={i}
                            variant="stat"
                            delay={i * 0.1}
                            className="relative p-6 rounded-[3rem] bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-500"
                            style={{ '--card-bg': 'rgba(255,255,255,0.05)' }}
                          >
                            <div className="flex items-center gap-4">
                              <div className="p-2 rounded-xl bg-white/10">
                                {stat.icon}
                              </div>
                              <div className="flex-1">
                                <div className="text-[9px] font-mono text-slate-500 uppercase tracking-widest mb-1">
                                  {stat.label}
                                </div>
                                <div className="text-4xl font-bold text-white">
                                  {stat.value !== null ? stat.value.toLocaleString() : "---"}
                                </div>
                              </div>
                            </div>
                          </EnhancedCardWrapper>
                        ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "impact" && (
                <div className="space-y-16">
                  <section>
                    <div className="flex items-center gap-6 mb-16">
                      <div className="p-4 rounded-2xl bg-purple-500/10 text-purple-400">
                        <Zap className="w-8 h-8" />
                      </div>
                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                        Impact & Milestones
                      </h2>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                      {impactData.map((milestone, i) => (
                        <EnhancedCardWrapper 
                          key={milestone.id} 
                          variant="impact"
                          delay={i * 0.1}
                          className="p-8 rounded-[3rem] bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500"
                          style={{
                            '--card-bg': milestone.bgGradient ? `linear-gradient(135deg, ${milestone.bgGradient})` : 'rgba(255,255,255,0.05)',
                            backgroundImage: `linear-gradient(135deg, ${milestone.bgGradient}), var(--card-bg)`
                          }}
                        >
                          <div className="flex items-start justify-between mb-6">
                            <div className={`inline-flex p-4 rounded-2xl bg-white/5 ${milestone.color || 'text-white'} group-hover:scale-110 transition-transform`}>
                              {getIcon(milestone.icon)}
                            </div>
                            <div className="text-4xl font-black text-white">
                              {milestone.value}
                            </div>
                          </div>
                          <h3 className="text-xl font-bold text-white mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-slate-400 text-sm leading-relaxed">
                            {milestone.description}
                          </p>
                        </EnhancedCardWrapper>
                      ))}
                    </div>
                  </section>
                </div>
              )}

              {activeTab === "awards" && (
                <div className="space-y-16">
                  <section>
                    <div className="flex items-center gap-6 mb-16">
                      <div className="p-4 rounded-2xl bg-orange-500/10 text-orange-400">
                        <Award className="w-8 h-8" />
                      </div>
                      <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                        Awards & Badges
                      </h2>
                      <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                    </div>

                    <div className="grid grid-cols-1 gap-8">
                      {/* Row 1: LeetCode Badges */}
                      <EnhancedCardWrapper 
                        variant="award"
                        className="p-12 rounded-[3rem] bg-[#282828] border border-white/10"
                        style={{ '--card-bg': '#282828' }}
                      >
                        <div className="flex items-center justify-between mb-12">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-[#1a1a1a] flex items-center justify-center">
                              {getCustomIcon('leetcode', 'w-full h-full')}
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">
                                LeetCode Badges
                              </div>
                              <div className="text-[12px] text-white/50">
                                {leetCodeBadges.length} Achievements
                              </div>
                            </div>
                          </div>
                          <Award className="w-8 h-8 text-[#ffa116]" />
                        </div>
                        <BadgeGrid
                          badges={leetCodeBadges}
                          onBadgeClick={openBadgeModal}
                          maxDisplay={50}
                        />
                      </EnhancedCardWrapper>

                      {/* Row 2: InterviewBit Badges */}
                      <EnhancedCardWrapper 
                        variant="award"
                        className="p-12 rounded-[3rem] bg-[#0170fe] border border-white/10"
                        style={{ '--card-bg': '#0170fe' }}
                      >
                        <div className="flex items-center justify-between mb-12">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-white flex items-center justify-center">
                              {getCustomIcon('interviewbit', 'w-8 h-8')}
                            </div>
                            <div>
                              <div className="text-2xl font-bold text-white">
                                InterviewBit Badges
                              </div>
                              <div className="text-[12px] text-white/70">
                                Topic Mastery
                              </div>
                            </div>
                          </div>
                          <Award className="w-8 h-8 text-white" />
                        </div>
                        <BadgeGrid
                          badges={interviewBitBadges}
                          onBadgeClick={openBadgeModal}
                          maxDisplay={50}
                        />
                      </EnhancedCardWrapper>
                    </div>
                  </section>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <UnifiedModal
        isOpen={modalOpen}
        type={modalType}
        content={modalContent}
        onClose={closeModal}
      />

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="mt-48 p-20 rounded-[4rem] bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-transparent border border-white/10 text-center relative overflow-hidden"
      >
        <BackgroundLayer type="dots" />
        <div className="relative z-10">
          <h3 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8">
            Infinite Evolution
          </h3>
          <p className="text-slate-400 mb-12 max-w-3xl mx-auto text-xl font-light leading-relaxed">
            These metrics are just the beginning. Every line of code, every
            solved challenge, and every deployed feature is a step towards
            technical perfection.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/harman8815?utm_source=portfolio&utm_medium=achievements&utm_campaign=social_links"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-12 py-6 rounded-full bg-white text-black font-black uppercase text-sm tracking-[0.3em] shadow-[0_0_30px_rgba(255,255,255,0.3)]"
            >
              <Github size={20} />
              Explore_GitHub
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="https://leetcode.com/harman8815?utm_source=portfolio&utm_medium=achievements&utm_campaign=social_links&referral=harman8815"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 px-12 py-6 rounded-full bg-white/5 text-white border border-white/10 font-black uppercase text-sm tracking-[0.3em] hover:bg-white/10"
            >
              <ExternalLink size={20} />
              View_LeetCode
            </motion.a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AchievementsPage;
