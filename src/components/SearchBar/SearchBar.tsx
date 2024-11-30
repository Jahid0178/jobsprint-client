import { Input } from "../ui/input";

interface SearchBarProps {
  name: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onChange, name, type }: SearchBarProps) => {
  return (
    <Input
      name={name}
      placeholder="Search by company name..."
      onChange={(e) => onChange(e)}
      type={type}
    />
  );
};

export default SearchBar;
