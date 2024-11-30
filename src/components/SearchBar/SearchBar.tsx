import { Input } from "../ui/input";

interface SearchBarProps {
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange, name }: SearchBarProps) => {
  return (
    <Input
      name={name}
      placeholder="Search by company name..."
      onChange={(e) => onChange(e)}
    />
  );
};

export default SearchBar;
