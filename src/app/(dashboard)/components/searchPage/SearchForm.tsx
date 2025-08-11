import React from "react";

interface SearchFormProps {
  search: string;
  setSearch: (search: string) => void;
  setPage: (page: number) => void;
}
const SearchForm = ({ search, setPage, setSearch }: SearchFormProps) => {
  const handleSearch = (e: any) => {
    setSearch(e.target.value);
    setPage(1);
  };
  return (
    <>
      <input
        type="text"
        placeholder="Tìm phòng..."
        value={search}
        onChange={handleSearch}
        className="border px-3 py-2 rounded-md shadow-sm w-64"
      />
    </>
  );
};

export default SearchForm;
