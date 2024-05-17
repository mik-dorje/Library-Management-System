import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

import {
	IGenericPaginatedRequest,
	IGenericPaginatedResponse,
} from "@/schema/http.schema";

const {
	getAuthorPaginated,
	addAuthor,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
	getAllAuthor,
} = protectedApiList.author;

export const useGetAuthorPaginated = (
	requestData: IGenericPaginatedRequest,
) => {
	return useQuery({
		queryKey: [getAuthorPaginated.queryKeyName, requestData],
		queryFn: () => {
			return performApiAction<IGenericPaginatedResponse<any[]>>(
				getAuthorPaginated,
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

export const useAddAuthor = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(addAuthor, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getAuthorPaginated.queryKeyName],
			});
			queryClient.invalidateQueries({
				queryKey: [getAuthorById.queryKeyName],
			});
		},
	});
};

export const useUpdateAuthor = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(updateAuthor, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getAuthorPaginated.queryKeyName],
			});
			queryClient.invalidateQueries({
				queryKey: [getAuthorById.queryKeyName],
			});
		},
	});
};

export const useGetAllAuthor = () => {
	return useQuery({
		queryKey: [getAllAuthor.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getAllAuthor, {
				disableSuccessToast: true,
			});
		},
	});
};

export const useGetAuthorById = (id: string, enabled?: boolean) => {
	return useQuery({
		queryKey: [getAuthorById.queryKeyName, id],
		queryFn: () => {
			return performApiAction<any>(getAuthorById, {
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

export const useDeleteAuthor = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: { id: string }) => {
			return performApiAction(deleteAuthor, {
				requestData: id,
				disableSuccessToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getAuthorPaginated.queryKeyName],
			});
		},
	});
};
