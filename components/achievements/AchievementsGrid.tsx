"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import AchievementCard from "./AchievementCard";

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 5;

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
        <PaginationItem key="first">
          <button
            onClick={() => handlePageChange(0)}
            className="px-3 py-1 rounded-lg border border-white/10 text-white/50 hover:bg-white/10 hover:text-white text-sm transition-all"
            aria-label="First page"
          >
            1
          </button>
        </PaginationItem>
      );
      if (startPage > 1)
        pages.push(<span key="start-ellipsis" className="px-2 text-white/25 select-none">…</span>);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-lg border text-sm transition-all ${
              i === currentPage
                ? "bg-[#179BD7] border-[#179BD7] text-white font-semibold"
                : "border-white/10 text-white/50 hover:bg-white/10 hover:text-white"
            }`}
            aria-current={i === currentPage ? "page" : undefined}
          >
            {i + 1}
          </button>
        </PaginationItem>
      );
    }

    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2)
        pages.push(<span key="end-ellipsis" className="px-2 text-white/25 select-none">…</span>);
      pages.push(
        <PaginationItem key="last">
          <button
            onClick={() => handlePageChange(totalPages - 1)}
            className="px-3 py-1 rounded-lg border border-white/10 text-white/50 hover:bg-white/10 hover:text-white text-sm transition-all"
            aria-label="Last page"
          >
            {totalPages}
          </button>
        </PaginationItem>
      );
    }

    return pages;
  }, [currentPage, handlePageChange, paginationData]);

  if (!achievements || !paginationData) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
          <div key={i} className="rounded-2xl overflow-hidden bg-white/5 animate-pulse border border-white/8">
            <div className="h-44 bg-white/10" />
            <div className="p-4 space-y-3">
              <div className="h-3 w-20 bg-white/10 rounded" />
              <div className="h-5 w-4/5 bg-white/10 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {paginationData.currentItems.map((achievement, idx) => (
          <AchievementCard
            key={achievement._id}
            id={achievement._id}
            index={idx}
            image={achievement.photoUrl || "/achievement.png"}
            title={achievement.title}
            desc={achievement.description}
            date={achievement.date}
            slug={achievement.slug}
          />
        ))}
      </div>

      <div className="flex flex-col items-center gap-4">
        <p className="text-sm text-white/30">
          Showing {paginationData.startIndex + 1}–{Math.min(paginationData.endIndex, paginationData.totalItems)} of {paginationData.totalItems} achievements
        </p>

        <Pagination>
          <PaginationContent className="gap-2 flex flex-wrap justify-center">
            <PaginationItem>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 0}
                className={`p-2 rounded-lg border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all ${
                  currentPage === 0 ? "opacity-30 pointer-events-none" : ""
                }`}
                aria-label="Previous page"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= paginationData.totalPages - 1}
                className={`p-2 rounded-lg border border-white/10 text-white/50 hover:bg-white/10 hover:text-white transition-all ${
                  currentPage >= paginationData.totalPages - 1 ? "opacity-30 pointer-events-none" : ""
                }`}
                aria-label="Next page"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
