"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { usePaginatedQuery, useQuery } from "convex/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import AchievementCard from "./AchievementCard";

const ITEMS_PER_PAGE = 9;
const MAX_PAGE_BUTTONS = 7;

interface Achievement {
  _id: Id<"achievements">;
  title: string;
  description: string;
  slug: string;
  date: number;
  photoUrl: string | null;
}

export default function AchievementGrid() {
  const [pageIndex, setPageIndex] = useState(0);
  const [allResults, setAllResults] = useState<Achievement[]>([]);
  const [isPageLoading, setIsPageLoading] = useState(false);

  // Fetch all achievements to get total count
  const allAchievements = useQuery(api.achievements.getAllAchievements);
  const total = allAchievements?.length ?? 0;

  // Fetch page data
  const paginatedQuery = usePaginatedQuery(
    api.achievements.achievementsPaginated,
    { paginationOpts: { cursor: null, numItems: ITEMS_PER_PAGE } },
    { initialNumItems: ITEMS_PER_PAGE }
  );

  const { results, status, loadMore } = paginatedQuery;

  // Keep track of all loaded results
  useEffect(() => {
    if (results?.length) {
      setAllResults((prev) => {
        const newResults = [...prev];
        // Replace items at current page index
        const startIndex = pageIndex * ITEMS_PER_PAGE;
        results.forEach((result, i) => {
          newResults[startIndex + i] = result;
        });
        return newResults;
      });
    }
  }, [results, pageIndex]);

  const totalPages = Math.ceil(total / ITEMS_PER_PAGE);

  // Get current page results
  const startIndex = pageIndex * ITEMS_PER_PAGE;
  const displayedResults = allResults.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
      {[...Array(ITEMS_PER_PAGE)].map((_, i) => (
        <div
          key={i}
          className='flex flex-col bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 animate-pulse'>
          <div className='h-40 bg-gray-200 dark:bg-gray-700' />
          <div className='p-4 space-y-3'>
            <div className='flex items-center gap-1.5'>
              <div className='h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-700' />
              <div className='h-3 bg-gray-200 dark:bg-gray-700 rounded w-24' />
            </div>
            <div className='h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4' />
            <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-full' />
            <div className='pt-3 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center'>
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-8' />
              <div className='h-4 bg-gray-200 dark:bg-gray-700 rounded w-20' />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Reset pagination state when changing pages
  const handlePageChange = async (newPage: number) => {
    if (newPage < 0 || newPage >= totalPages) return;

    const targetIndex = newPage * ITEMS_PER_PAGE;

    // If we don't have the results for this page yet, load more until we get there
    if (targetIndex >= allResults.length && loadMore) {
      setIsPageLoading(true);
      try {
        let currentLength = allResults.length;
        while (currentLength <= targetIndex) {
          await loadMore(ITEMS_PER_PAGE);
          currentLength += ITEMS_PER_PAGE;
        }
      } finally {
        setIsPageLoading(false);
      }
    }

    setPageIndex(newPage);
  };

  // Jump to page handler (for numbered buttons)
  const jumpToPage = (targetPage: number) => {
    handlePageChange(targetPage);
  };

  // Handlers for prev/next buttons
  const goPrev = () => {
    handlePageChange(pageIndex - 1);
  };

  const goNext = () => {
    if (pageIndex + 1 < totalPages) {
      handlePageChange(pageIndex + 1);
    }
  };

  // Render page number buttons with ellipsis logic
  const renderPageButtons = () => {
    if (!totalPages) return null;

    // If total pages is small, render all
    if (totalPages <= MAX_PAGE_BUTTONS) {
      return Array.from({ length: totalPages }, (_, i) => renderPageButton(i));
    }

    // If many pages, show first 2, last 2, current +/-1, and ellipsis in between
    const buttons = [];
    const startPage = Math.max(1, pageIndex - 1);
    const endPage = Math.min(totalPages - 2, pageIndex + 1);

    buttons.push(renderPageButton(0)); // First page

    if (startPage > 2)
      buttons.push(
        <span key='start-ellipsis' className='px-2 select-none'>
          ...
        </span>
      );

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(renderPageButton(i));
    }

    if (endPage < totalPages - 3)
      buttons.push(
        <span key='end-ellipsis' className='px-2 select-none'>
          ...
        </span>
      );

    buttons.push(renderPageButton(totalPages - 1)); // Last page

    return buttons;
  };

  // Single page button renderer
  const renderPageButton = (pageNum: number) => (
    <PaginationItem key={pageNum}>
      <button
        onClick={() => jumpToPage(pageNum)}
        disabled={pageNum === pageIndex}
        className={`px-3 py-1 rounded-md border ${
          pageNum === pageIndex
            ? "bg-blue-500 text-white cursor-default"
            : "hover:bg-primary/10"
        }`}
        aria-current={pageNum === pageIndex ? "page" : undefined}>
        {pageNum + 1}
      </button>
    </PaginationItem>
  );

  return (
    <div className='space-y-8'>
      {status === "LoadingFirstPage" || isPageLoading ? (
        <LoadingSkeleton />
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {displayedResults.map((achievement: Achievement, idx: number) => (
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
      )}

      <div className='flex justify-center items-center gap-2 flex-wrap'>
        <Pagination>
          <PaginationContent className='gap-2 flex flex-wrap justify-center'>
            <PaginationItem>
              <button
                onClick={goPrev}
                disabled={pageIndex === 0 || isPageLoading}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  pageIndex === 0 || isPageLoading
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}>
                <ChevronLeft className='h-4 w-4' />
              </button>
            </PaginationItem>

            {renderPageButtons()}

            <PaginationItem>
              <button
                onClick={goNext}
                disabled={pageIndex + 1 >= totalPages || isPageLoading}
                className={`p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  pageIndex + 1 >= totalPages || isPageLoading
                    ? "opacity-50 pointer-events-none"
                    : ""
                }`}>
                <ChevronRight className='h-4 w-4' />
              </button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
