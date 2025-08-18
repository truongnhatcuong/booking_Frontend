import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React from "react";

interface SearchFormProps {
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
  placeholder: string;
  resetPage?: boolean;
}
const SearchForm = ({
  search,
  setPage,
  setSearch,
  placeholder,
  resetPage = true,
}: SearchFormProps) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (resetPage) {
      setPage?.(1);
    }
  };
  return (
    <div className="relative w-full sm:w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder={placeholder}
        className="pl-8 w-lg"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchForm;
