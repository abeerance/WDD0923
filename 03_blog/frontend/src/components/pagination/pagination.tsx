// src/components/pagination

import { NavLink } from "@/components/nav-link/nav-link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath?: string;
  searchParams?: Record<string, string>;
}

export const Pagination = ({
  currentPage,
  totalPages,
  basePath = "",
  searchParams = {},
}: PaginationProps) => {
  // Helper function to build URL with search params
  const buildUrl = (page: number) => {
    const params = new URLSearchParams(searchParams); // here we create new search params
    params.set("page", page.toString()); // here we set the page params with the new page the are getting from outside
    const queryString = params.toString(); // here we set the query string => searchParams e.g. limit=20&page=1
    return `${basePath}${queryString ? `?${queryString}` : ""}`; // here we create a whole new URL with the help of the helper function => e.g. http://127.0.0.1:8000/api/articles?limit=21&page=2
  };

  const hasPrevious = currentPage > 1; // if the current page has a previous page
  const hasNext = currentPage < totalPages; // if the last page is accessed and there is no next page

  return (
    <div className="flex items-center justify-center py-m gap-m">
      {/* Previous button */}
      {hasPrevious ? (
        <NavLink
          href={buildUrl(currentPage - 1)}
          className="py-2xs w-[100px] inline-flex items-center justify-center bg-gray-900/90 text-white px-xs rounded-md hover:bg-gray-700/90"
          textVariant="body-small"
          scroll={false}
        >
          Previous
        </NavLink>
      ) : (
        <div className="w-[100px]" />
      )}
      {/* Page indicator */}
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      {/* Next button */}
      {hasNext ? (
        <NavLink
          href={buildUrl(currentPage + 1)}
          className="py-2xs w-[100px] inline-flex items-center justify-center bg-gray-900/90 text-white px-xs rounded-md hover:bg-gray-700/90"
          textVariant="body-small"
          scroll={false}
        >
          Next
        </NavLink>
      ) : (
        <div className="w-[100px]" />
      )}
    </div>
  );
};
