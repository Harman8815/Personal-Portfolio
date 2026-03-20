"use client";

import React, { useEffect, useState } from "react";
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
import {
  leetCodeBadges,
  interviewBitBadges,
} from "../../../data/achievementsPageData.js";

gsap.registerPlugin(ScrollTrigger);

const AchievementsPage = () => {
  const [activeTab, setActiveTab] = useState("mastery");
  const [isLoading, setIsLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [modalContent, setModalContent] = useState(null);

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
    if (!isLoading) {
      ScrollTrigger.refresh();
    }
  }, [activeTab, isLoading]);

  const tabs = [
    {
      id: "mastery",
      label: "Coding Mastery",
      icon: <Trophy className="w-4 h-4" />,
    },
    {
      id: "activity",
      label: "Development Activity",
      icon: <Activity className="w-4 h-4" />,
    },
    {
      id: "impact",
      label: "Impact & Milestones",
      icon: <Zap className="w-4 h-4" />,
    },
    {
      id: "awards",
      label: "Awards & Badges",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  if (isLoading) {
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
    <div className="min-h-screen bg-[#020617] pt-32 pb-20 px-6 md:px-12 selection:bg-cyan-500/30">
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
            </motion.div>

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
                    className={`relative flex items-center gap-3 px-8 py-4 rounded-2xl text-[10px] font-mono uppercase tracking-[0.2em] transition-all duration-500 ${
                      activeTab === tab.id
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
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-32"
          >
            {activeTab === "mastery" && (
              <div className="space-y-16">
                <section className="relative w-full">
                  <div className="flex items-center gap-6 mb-16 max-w-[80%] mx-auto">
                    <div className="p-4 rounded-2xl bg-cyan-500/10 text-cyan-400">
                      <Trophy className="w-8 h-8" />
                    </div>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                      Coding Mastery
                    </h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <CardProvider
                    openCardModal={openCardModal}
                    closeModal={closeModal}
                  >
                    <div className="relative min-h-[800px] space-y-8">
                      <div className="relative h-[500px]">
                        <DraggableCard id="leetcode" className="ml-0">
                          <LeetCodeCard />
                        </DraggableCard>
                      </div>

                      <div className="relative h-[500px]">
                        <DraggableCard id="gfg" className="ml-4">
                          <GFGCard />
                        </DraggableCard>
                      </div>

                      <div className="relative h-[500px]">
                        <DraggableCard id="interviewbit" className="ml-8">
                          <InterviewBitCard />
                        </DraggableCard>
                      </div>
                    </div>
                  </CardProvider>
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
                  <GitHubHeatmap />
                </section>

                <section>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      {
                        label: "Coding Hours",
                        value: 3500,
                        icon: <Clock className="w-8 h-8" />,
                        color: "text-cyan-400",
                      },
                      {
                        label: "Tech Explored",
                        value: 24,
                        icon: <BookOpen className="w-8 h-8" />,
                        color: "text-blue-400",
                      },
                      {
                        label: "Features Shipped",
                        value: 180,
                        icon: <Rocket className="w-8 h-8" />,
                        color: "text-purple-400",
                      },
                      {
                        label: "Active Months",
                        value: 36,
                        icon: <Calendar className="w-8 h-8" />,
                        color: "text-emerald-400",
                      },
                    ].map((stat, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-12 rounded-[3rem] bg-white/5 border border-white/10 text-center group hover:bg-white/10 transition-all"
                      >
                        <div
                          className={`inline-flex p-5 rounded-3xl bg-white/5 ${stat.color} mb-8 group-hover:scale-110 transition-transform`}
                        >
                          {stat.icon}
                        </div>
                        <div className="text-6xl font-black text-white mb-4">
                          <Counter value={stat.value} />
                        </div>
                        <div className="text-[10px] font-mono text-slate-500 uppercase tracking-[0.3em]">
                          {stat.label}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>
              </div>
            )}

            {activeTab === "impact" && (
              <div className="space-y-32">
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
                    {[
                      {
                        title: "Open Source Contributions",
                        value: "850+",
                        description: "Commits across 50+ repositories",
                        icon: <Github className="w-8 h-8" />,
                        color: "text-purple-400",
                        bgGradient: "from-purple-500/10 to-pink-500/10"
                      },
                      {
                        title: "Technical Articles",
                        value: "42",
                        description: "Published on dev.to and medium",
                        icon: <BookOpen className="w-8 h-8" />,
                        color: "text-blue-400",
                        bgGradient: "from-blue-500/10 to-cyan-500/10"
                      },
                      {
                        title: "Mentorship Hours",
                        value: "320+",
                        description: "Helping developers grow their skills",
                        icon: <Trophy className="w-8 h-8" />,
                        color: "text-emerald-400",
                        bgGradient: "from-emerald-500/10 to-green-500/10"
                      },
                      {
                        title: "Code Reviews",
                        value: "1.2k",
                        description: "Constructive feedback on pull requests",
                        icon: <Code2 className="w-8 h-8" />,
                        color: "text-orange-400",
                        bgGradient: "from-orange-500/10 to-red-500/10"
                      },
                      {
                        title: "Workshops Conducted",
                        value: "28",
                        description: "Technical workshops and webinars",
                        icon: <Rocket className="w-8 h-8" />,
                        color: "text-pink-400",
                        bgGradient: "from-pink-500/10 to-rose-500/10"
                      },
                      {
                        title: "Community Recognition",
                        value: "15+",
                        description: "Awards and acknowledgments",
                        icon: <Award className="w-8 h-8" />,
                        color: "text-yellow-400",
                        bgGradient: "from-yellow-500/10 to-amber-500/10"
                      }
                    ].map((milestone, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-[3rem] bg-gradient-to-br bg-white/5 border border-white/10 group hover:bg-white/10 transition-all duration-500"
                        style={{
                          backgroundImage: `linear-gradient(135deg, ${milestone.bgGradient})`
                        }}
                      >
                        <div className="flex items-start justify-between mb-6">
                          <div className={`inline-flex p-4 rounded-2xl bg-white/5 ${milestone.color} group-hover:scale-110 transition-transform`}>
                            {milestone.icon}
                          </div>
                          <div className="text-4xl font-black text-white">
                            <Counter value={parseInt(milestone.value.replace(/[^0-9]/g, ''))} suffix={milestone.value.replace(/[0-9]/g, '')} />
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-3">
                          {milestone.title}
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                          {milestone.description}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </section>

                <section>
                  <div className="p-16 rounded-[4rem] bg-gradient-to-br from-purple-500/10 via-pink-500/5 to-transparent border border-white/10">
                    <div className="text-center mb-12">
                      <h3 className="text-4xl font-black text-white uppercase tracking-tighter mb-6">
                        Career Milestones
                      </h3>
                      <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Key achievements and recognition throughout the professional journey
                      </p>
                    </div>
                    <div className="space-y-6">
                      {[
                        {
                          year: "2024",
                          title: "Senior Full Stack Developer",
                          company: "Tech Innovation Labs",
                          achievement: "Led architecture redesign serving 1M+ users"
                        },
                        {
                          year: "2023",
                          title: "Technical Lead",
                          company: "Digital Solutions Inc",
                          achievement: "Mentored team of 12 developers, improved code quality by 40%"
                        },
                        {
                          year: "2022",
                          title: "Full Stack Developer",
                          company: "StartupHub",
                          achievement: "Built MVP that secured $2M Series A funding"
                        }
                      ].map((milestone, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -50 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex gap-6 p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                        >
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center">
                              <span className="text-lg font-bold text-purple-400">{milestone.year}</span>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="text-xl font-bold text-white mb-1">{milestone.title}</h4>
                            <p className="text-purple-400 text-sm mb-2">{milestone.company}</p>
                            <p className="text-slate-400">{milestone.achievement}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>
              </div>
            )}

            {activeTab === "awards" && (
              <div className="space-y-32">
                <section>
                  <div className="flex items-center gap-6 mb-16">
                    <div className="p-4 rounded-2xl bg-amber-500/10 text-amber-400">
                      <Award className="w-8 h-8" />
                    </div>
                    <h2 className="text-5xl font-black text-white uppercase tracking-tighter">
                      Awards & Badges
                    </h2>
                    <div className="flex-1 h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                  </div>

                  <div className="grid grid-cols-1 gap-12">
                    <div className="p-12 rounded-[3rem] bg-[#282828] border border-white/10">
                      <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                          <LogoWithLoading
                            src="https://leetcode.com/_next/static/images/logo-dark-c96c407d175e36c81e236fcf903997f7.png"
                            alt="LC"
                            fallbackIcon={<Code2 className="w-6 h-6" />}
                          />
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
                    </div>

                    <div className="p-12 rounded-[3rem] bg-[#0170fe] border border-white/10">
                      <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-4">
                          <LogoWithLoading
                            src="https://www.interviewbit.com/assets/interviewbit/logo-640x640-3435678.png"
                            alt="IB"
                            className="bg-white"
                            fallbackIcon={<Brain className="w-6 h-6" />}
                          />
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
                    </div>
                  </div>
                </section>
              </div>
            )}
          </motion.div>
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
                href="https://github.com"
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
                href="https://leetcode.com"
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
    </div>
  );
};

export default AchievementsPage;
