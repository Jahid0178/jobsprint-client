import { Input } from "../ui/input";

const SearchBar = () => {
  return (
    <Input
      placeholder="Search by company name..."
      onChange={(e) => console.log(e.target.value)}
    />
  );
};

export default SearchBar;
