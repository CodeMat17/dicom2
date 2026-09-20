"use client";

// Paging happens in the browser over a list the server already rendered, so
// the first page is in the HTML and turning a page costs no request.
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import AchievementCard from "./AchievementCard";
import type { Id } from "@/convex/_generated/dataModel";

export type GridAchievement = {
  _id: Id<"achievements">;
  title: string;
  description: string;
  slug: string;
  date?: number;
  photoUrl: string | null;
};

const ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 5;

/** Shared look for every pagination control. */
const pageBtn =
  "flex h-10 min-w-10 items-center justify-center rounded-xl border border-white/15 px-3 text-sm text-white/80 transition-all duration-300 hover:border-white/30 hover:bg-white/10 hover:text-white";

export default function AchievementGrid({
  achievements,
}: {
  achievements: GridAchievement[];
}) {
  const [currentPage, setCurrentPage] = useState(0);

  const paginationData = useMemo(() => {
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
      if (page >= 0 && page < paginationData.totalPages) {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    },
    [paginationData.totalPages]
  );

  const pageNumbers = useMemo(() => {
    const { totalPages } = paginationData;
    const halfVisible = Math.floor(MAX_VISIBLE_PAGES / 2);
    let startPage = Math.max(0, currentPage - halfVisible);
    const endPage = Math.min(totalPages - 1, startPage + MAX_VISIBLE_PAGES - 1);
    if (endPage - startPage < MAX_VISIBLE_PAGES - 1) {
      startPage = Math.max(0, endPage - MAX_VISIBLE_PAGES + 1);
    }
    return { startPage, endPage, totalPages };
  }, [currentPage, paginationData]);

  const isFirst = currentPage === 0;
  const isLast = currentPage >= paginationData.totalPages - 1;

  const pageButton = (index: number) => {
    const isCurrent = index === currentPage;
    return (
      <li key={index}>
        <button
          type="button"
          onClick={() => handlePageChange(index)}
          className={cn(
            pageBtn,
            isCurrent &&
              "border-transparent bg-gold font-semibold text-ink-900 shadow-gold hover:bg-gold hover:text-ink-900"
          )}
          aria-current={isCurrent ? "page" : undefined}
          aria-label={`Page ${index + 1}`}
        >
          {index + 1}
        </button>
      </li>
    );
  };

  return (
    <div className="space-y-12">
      <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {paginationData.currentItems.map((achievement, idx) => (
          <li key={achievement._id}>
            <AchievementCard
              id={achievement._id}
              index={idx}
              image={achievement.photoUrl || "/achievement.png"}
              title={achievement.title}
              desc={achievement.description}
              date={achievement.date}
              slug={achievement.slug}
            />
          </li>
        ))}
      </ul>

      {paginationData.totalPages > 1 && (
        <div className="flex flex-col items-center gap-5">
          <p aria-live="polite" className="text-sm text-white/70">
            Showing {paginationData.startIndex + 1}–
            {Math.min(paginationData.endIndex, paginationData.totalItems)} of{" "}
            {paginationData.totalItems} achievements
          </p>

          <nav aria-label="Achievements pagination">
            <ul className="flex flex-wrap items-center justify-center gap-2">
              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={isFirst}
                  className={cn(pageBtn, isFirst && "opacity-40")}
                >
                  <ChevronLeft aria-hidden className="h-4 w-4" />
                  <span className="sr-only">Previous page</span>
                </button>
              </li>

              {pageNumbers.startPage > 0 && (
                <>
                  {pageButton(0)}
                  {pageNumbers.startPage > 1 && (
                    <li
                      aria-hidden
                      className="select-none px-1 text-white/70"
                    >
                      …
                    </li>
                  )}
                </>
              )}

              {Array.from(
                { length: pageNumbers.endPage - pageNumbers.startPage + 1 },
                (_, i) => pageNumbers.startPage + i
              ).map(pageButton)}

              {pageNumbers.endPage < pageNumbers.totalPages - 1 && (
                <>
                  {pageNumbers.endPage < pageNumbers.totalPages - 2 && (
                    <li
                      aria-hidden
                      className="select-none px-1 text-white/70"
                    >
                      …
                    </li>
                  )}
                  {pageButton(pageNumbers.totalPages - 1)}
                </>
              )}

              <li>
                <button
                  type="button"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={isLast}
                  className={cn(pageBtn, isLast && "opacity-40")}
                >
                  <ChevronRight aria-hidden className="h-4 w-4" />
                  <span className="sr-only">Next page</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
}
