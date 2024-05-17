import { IInitalFilterValue } from "../GenericTable/hooks/useServerSidePagination";

import SearchBar from "../SearchBar";

interface IPaginatedSearchBarProps {
	initialFilterList: IInitalFilterValue;
	handleServerSideTableChange: (pagination: IInitalFilterValue) => void;
	filterKey: string;
	triggerMode?: "CHANGE" | "SUBMIT";
}

const PaginatedSearchBar = ({
	initialFilterList,
	handleServerSideTableChange,
	filterKey,
	triggerMode = "CHANGE",
}: IPaginatedSearchBarProps) => {
	let debounceTimer: NodeJS.Timeout;

	const handleInputChange = (query: string) => {
		clearTimeout(debounceTimer);

		debounceTimer = setTimeout(() => {
			handleServerSideTableChange({
				...initialFilterList,
				[filterKey]: query,
			});
		}, 300);
	};

	const handleSubmit = (query: string) => {
		handleServerSideTableChange({
			...initialFilterList,
			[filterKey]: query,
		});
	};

	const searchBarProps: any =
		triggerMode === "CHANGE"
			? { onInputChange: handleInputChange }
			: { onSubmit: handleSubmit };

	return <SearchBar {...searchBarProps} />;
};

export default PaginatedSearchBar;
