import { useQuery } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

const { getDashboardData } = protectedApiList.dashboard;

// get test dashboard consultancy report

export const useGetDashboardData = () => {
	return useQuery({
		queryKey: [getDashboardData.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getDashboardData, {
				disableSuccessToast: true,
			});
		},
	});
};
