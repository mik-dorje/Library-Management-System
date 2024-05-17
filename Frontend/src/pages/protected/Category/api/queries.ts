import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

import {
	IGenericPaginatedRequest,
	IGenericPaginatedResponse,
} from "@/schema/http.schema";

const {
	getCategoryPaginated,
	addCategory,
	getCategoryById,
	updateCategory,
	deleteCategory,
	getAllCategory,
} = protectedApiList.category;

export const useGetCategoryPaginated = (
	requestData: IGenericPaginatedRequest,
) => {
	return useQuery({
		queryKey: [getCategoryPaginated.queryKeyName, requestData],
		queryFn: () => {
			return performApiAction<IGenericPaginatedResponse<any[]>>(
				getCategoryPaginated,
				{
					requestData,
					disableSuccessToast: true,
				},
			);
		},
		enabled: !!(requestData?.page && requestData?.row),
		staleTime: 0,
	});
};

export const useAddCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(addCategory, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getCategoryPaginated.queryKeyName],
			});
		},
	});
};

export const useUpdateCategory = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(updateCategory, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getCategoryPaginated.queryKeyName],
			});
		},
	});
};

export const useGetAllCategory = () => {
	return useQuery({
		queryKey: [getAllCategory.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getAllCategory, {
				disableSuccessToast: true,
			});
		},
	});
};

export const useGetCategoryById = (id: string, enabled?: boolean) => {
	return useQuery({
		queryKey: [getCategoryById.queryKeyName, id],
		queryFn: () => {
			return performApiAction<any>(getCategoryById, {
				pathVariables: {
					id,
				},
				disableSuccessToast: true,
			});
		},
		enabled: !!(id && enabled),
		staleTime: 0,
	});
};

export const useDeleteCategory = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: { id: string }) => {
			return performApiAction(deleteCategory, {
				requestData: id,
				disableSuccessToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getCategoryPaginated.queryKeyName],
			});
		},
	});
};
