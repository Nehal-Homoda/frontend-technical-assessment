"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

type Props = {
  sortBy: string;
  setSortBy: (value: "TO_LOW" | "TO_HIGH" | "TITLE" | "") => void;
};

export default function SortDropdown({ sortBy, setSortBy }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="inline-flex items-center justify-between px-4 py-2 rounded-md border border-gray-300 shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1 transition-all duration-150 w-40"
        >
          Sort By
          <i className="ml-2 fa-solid fa-chevron-down text-xs text-gray-500"></i>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-44 rounded-md bg-white shadow-lg border border-gray-200"
      >
        <DropdownMenuItem
          onClick={() => setSortBy("TO_HIGH")}
          className="cursor-pointer px-5 py-2 text-sm hover:bg-primary-light-50 transition-colors"
        >
          Price - Low to High
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortBy("TO_LOW")}
          className="cursor-pointer px-5 py-2 text-sm hover:bg-primary-light-50 transition-colors"
        >
          Price - High to Low
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setSortBy("TITLE")}
          className="cursor-pointer px-5 py-2 text-sm hover:bg-primary-light-50 transition-colors"
        >
          Title
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
