import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";

interface ISearchBarProps {
    onInputChange?: (value: string) => void;
    onSubmit?: (value: string) => void;
}

const SearchBar = ({ onInputChange, onSubmit }: ISearchBarProps) => {
    return (
        <Input
            suffix={<SearchOutlined />}
            placeholder="Search"
            className="w-[250px]"
            onChange={(event) => onInputChange?.(event.target.value)}
            onPressEnter={(event: any) => onSubmit?.(event.target.value || "")}
        />
    );
};

export default SearchBar;
