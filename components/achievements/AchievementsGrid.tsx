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

  // Fetch all achievements
  const achievements = useQuery(api.achievements.getAllAchievementsWithPhotos);

  // Calculate pagination values
  const paginationData = useMemo(() => {
    if (!achievements) return null;

    const totalPages = Math.ceil(achievements.length / ITEMS_PER_PAGE);
    const startIndex = currentPage * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentItems = achievements.slice(startIndex, endIndex);

    return {
      totalPages,
      startIndex,
      endIndex,
      currentItems,
      totalItems: achievements.length,
    };
  }, [achievements, currentPage]);

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
      {Array.from({ length: ITEMS_PER_PAGE }).map((_, i) => (
        <div
          key={i}
          className='flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 animate-pulse'>
          <div className='h-40 bg-gray-200 dark:bg-gray-700' />
          <div className='p-4 space-y-3'>
            <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
          </div>
        </div>
      ))}
    </div>
  );

  // Handle page change
  const handlePageChange = useCallback(
    (page: number) => {
      if (!paginationData) return;
      if (page >= 0 && page < paginationData.totalPages) {
        setCurrentPage(page);
        // Scroll to top of grid
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [paginationData]
  );

  // Navigation handlers
  const goPrev = useCallback(() => {
    handlePageChange(currentPage - 1);
  }, [currentPage, handlePageChange]);

  const goNext = useCallback(() => {
    handlePageChange(currentPage + 1);
  }, [currentPage, handlePageChange]);

  // Render page numbers
  const renderPageNumbers = useCallback(() => {
    if (!paginationData) return null;
    const { totalPages } = paginationData;

    const pages = [];
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);

    let startPage = Math.max(0, currentPage - halfVisible);
    const endPage = Math.min(totalPages - 1, startPage + MAX_VISIBLE_PAGES - 1);

    // Adjust start if we're near the end
    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
      startPage = Math.max(0, endPage - MAX_VISIBLE_PAGES + 1);
    }

    // First page
    if (startPage > 0) {
      pages.push(
        <PaginationItem key='first'>
          <button
            onClick={() => handlePageChange(0)}
            className='px-3 py-1 rounded-md border hover:bg-primary/10'
            aria-label='First page'>
            1
          </button>
        </PaginationItem>
      );
      if (startPage > 1) {
        pages.push(
          <span key='start-ellipsis' className='px-2 select-none'>
            ...
          </span>
        );
      }
    }

    // Numbered pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <button
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-md border ${
              i === currentPage
                ? "bg-blue-500 text-white"
                : "hover:bg-primary/10"
            }`}
            aria-current={i === currentPage ? "page" : undefined}>
            {i + 1}
          </button>
        </PaginationItem>
      );
    }

    // Last page
    if (endPage < totalPages - 1) {
      if (endPage < totalPages - 2) {
        pages.push(
          <span key='end-ellipsis' className='px-2 select-none'>
            ...
          </span>
        );
      }
      pages.push(
        <PaginationItem key='last'>
          <button
            onClick={() => handlePageChange(totalPages - 1)}
            className='px-3 py-1 rounded-md border hover:bg-primary/10'
            aria-label='Last page'>
            {totalPages}
          </button>
        </PaginationItem>
      );
    }

    return pages;
  }, [currentPage, handlePageChange, paginationData]);

  // Show loading state
  if (!achievements || !paginationData) {
    return (
      <div className='space-y-8'>
        <LoadingSkeleton />
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
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

      <div className='flex flex-col items-center gap-4'>
        <p className='text-sm text-gray-600 dark:text-gray-400'>
          Showing {paginationData.startIndex + 1} -{" "}
          {Math.min(paginationData.endIndex, paginationData.totalItems)} of{" "}
          {paginationData.totalItems} stories
        </p>

        <Pagination>
          <PaginationContent className='gap-2 flex flex-wrap justify-center'>
            <PaginationItem>
              <button
                onClick={goPrev}
                disabled={currentPage === 0}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentPage === 0 ? "opacity-50 pointer-events-none" : ""
                }`}
                aria-label='Previous page'>
                <ChevronLeft className='h-4 w-4' />
              </button>
            </PaginationItem>

            {renderPageNumbers()}

            <PaginationItem>
              <button
                onClick={goNext}
                disabled={currentPage >= paginationData.totalPages - 1}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  currentPage >= paginationData.totalPages - 1
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}
                aria-label='Next page'>
                <ChevronRight className='h-4 w-4' />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
