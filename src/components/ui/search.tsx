import { FC, ChangeEvent } from "react";
import { Search as SearchIcon } from "lucide-react";

interface SearchProps {
  values: {
    value: string;
    placeholder?: string;
  };
  options: {
    onChange: (value: string) => void;
  };
}

export const Search: FC<SearchProps> = ({
  values: { value, placeholder = "Search..." },
  options: { onChange },
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="relative bg-[#F1F4F8] rounded-lg h-[48px] flex flex-row items-center  focus:ring-1">
      <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-6 w-6 text-muted-foreground stroke-[#4F7A96]" />
      <input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-11 w-full focus:outline-none focus:border-primary-500 text-[#4F7A96] placeholder:text-[#4F7A96] placeholder:opacity-100 text-[16px] leading-[24px]"
      />
    </div>
  );
};
