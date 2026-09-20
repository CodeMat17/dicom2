"use client";

import { api } from "@/convex/_generated/api";
import { cardRise } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import AchievementCard from "./AchievementCard";

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 5;

/** Shared look for every pagination control. */
const pageBtn =
  "flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/10 px-3 text-sm text-white/55 transition-all duration-300 hover:border-white/25 hover:bg-white/10 hover:text-white";

export default function AchievementGrid() {
  const [currentPage, setCurrentPage] = useState(0);
  const achievements = useQuery(api.achievements.getAllAchievementsWithPhotos);

  const paginationData = useMemo(() => {
    if (!achievements) return null;
    const totalPages = Math.ceil(achievements.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return {
      totalPages,
      startIndex,
      endIndex,
      currentItems: achievements.slice(startIndex, endIndex),
      totalItems: achievements.length,
    };
  }, [achievements, currentPage]);

  const handlePageChange = useCallback(
    (page: number) => {
      if (!paginationData) return;
      if (page >= 0 && page < paginationData.totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [paginationData]
  );

  const renderPageNumbers = useCallback(() => {
    if (!paginationData) return null;
    const { totalPages } = paginationData;
    const pages = [];
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(0, currentPage - halfVisible);
    const endPage = Math.min(totalPages - 1, startPage + MAX_VISIBLE_PAGES - 1);
    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
      startPage = Math.max(0, endPage - MAX_VISIBLE_PAGES + 1);
    }

    if (startPage > 0) {
      pages.push(
        <button
          key="first"
          onClick={() => handlePageChange(0)}
          className={pageBtn}
          aria-label="First page"
        >
          1
        </button>
      );
      if (startPage > 1)
        pages.push(
          <span key="start-ellipsis" className="select-none px-1 text-white/25">
            …
          </span>
        );
    }

    for (let i = startPage; i <= endPage; i++) {
      const isCurrent = i === currentPage;
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={cn(
            pageBtn,
            "relative",
            isCurrent &&
              "border-transparent text-ink-900 hover:text-ink-900 font-semibold"
          )}
          aria-current={isCurrent ? "page" : undefined}
        >
          {isCurrent && (
            <motion.span
              layoutId="page-pill"
              className="absolute inset-0 rounded-xl bg-gold shadow-gold"
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
            />
          )}
          <span className="relative z-10">{i + 1}</span>
        </button>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2)
        pages.push(
          <span key="end-ellipsis" className="select-none px-1 text-white/25">
            …
          </span>
        );
      pages.push(
        <button
          key="last"
          onClick={() => handlePageChange(totalPages - 1)}
          className={pageBtn}
          aria-label="Last page"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  }, [currentPage, handlePageChange, paginationData]);

  if (!achievements || !paginationData) {
    return (
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <div
            key={i}
            className="shimmer overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]"
          >
            <div className="aspect-[16/10] bg-white/[0.06]" />
            <div className="space-y-3 p-5">
              <div className="h-5 w-4/5 rounded-lg bg-white/[0.06]" />
              <div className="h-3 w-2/3 rounded bg-white/[0.06]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  const isFirst = currentPage === 0;
  const isLast = currentPage >= paginationData.totalPages - 1;

  return (
    <div className="space-y-12">
      {/* Re-keying on the page index replays the stagger on each change,
          so paging feels like a transition rather than a content swap. */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial="hidden"
          animate="visible"
          exit={{ opacity: 0, y: -12, transition: { duration: 0.2 } }}
          variants={{ visible: { transition: { staggerChildren: 0.06 } } }}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {paginationData.currentItems.map((achievement, idx) => (
            <motion.div key={achievement._id} variants={cardRise}>
              <AchievementCard
                id={achievement._id}
                index={idx}
                image={achievement.photoUrl || "/achievement.png"}
                title={achievement.title}
                desc={achievement.description}
                date={achievement.date}
                slug={achievement.slug}
              />
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {paginationData.totalPages > 1 && (
        <div className="flex flex-col items-center gap-5">
          <p className="text-sm text-white/30">
            Showing {paginationData.startIndex + 1}–
            {Math.min(paginationData.endIndex, paginationData.totalItems)} of{" "}
            {paginationData.totalItems} achievements
          </p>

          <nav
            className="flex flex-wrap items-center justify-center gap-2"
            aria-label="Pagination"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={isFirst}
              className={cn(pageBtn, isFirst && "pointer-events-none opacity-30")}
              aria-label="Previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {renderPageNumbers()}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={isLast}
              className={cn(pageBtn, isLast && "pointer-events-none opacity-30")}
              aria-label="Next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
