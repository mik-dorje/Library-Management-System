import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

import {
	IGenericPaginatedRequest,
	IGenericPaginatedResponse,
} from "@/schema/http.schema";

const {
	getBookPaginated,
	addBook,
	getBookById,
	updateBook,
	deleteBook,
	getAllBook,
} = protectedApiList.book;

export const useGetBookPaginated = (requestData: IGenericPaginatedRequest) => {
	return useQuery({
		queryKey: [getBookPaginated.queryKeyName, requestData],
		queryFn: () => {
			return performApiAction<IGenericPaginatedResponse<any[]>>(
				getBookPaginated,
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

export const useAddBook = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(addBook, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getBookPaginated.queryKeyName],
			});
		},
	});
};

export const useUpdateBook = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(updateBook, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getBookPaginated.queryKeyName],
			});
		},
	});
};

export const useGetAllBook = () => {
	return useQuery({
		queryKey: [getAllBook.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getAllBook, {
				disableSuccessToast: true,
			});
		},
	});
};

export const useGetBookById = (id: string) => {
	return useQuery({
		queryKey: [getBookById.queryKeyName, id],
		queryFn: () => {
			return performApiAction<any>(getBookById, {
				pathVariables: {
					id,
				},
				disableSuccessToast: true,
			});
		},
		enabled: !!(id && id !== ""),
		staleTime: 0,
	});
};

export const useDeleteBook = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: { id: string }) => {
			return performApiAction(deleteBook, {
				requestData: id,
				disableSuccessToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getBookPaginated.queryKeyName],
			});
		},
	});
};
