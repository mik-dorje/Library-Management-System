import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

import {
	IGenericPaginatedRequest,
	IGenericPaginatedResponse,
} from "@/schema/http.schema";

const {
	getTransactionPaginated,
	addTransaction,
	getTransactionById,
	updateTransaction,
	deleteTransaction,
	getAllTransacion,
} = protectedApiList.transaction;

export const useGetTransactionPaginated = (
	requestData: IGenericPaginatedRequest,
) => {
	return useQuery({
		queryKey: [getTransactionPaginated.queryKeyName, requestData],
		queryFn: () => {
			return performApiAction<IGenericPaginatedResponse<any[]>>(
				getTransactionPaginated,
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

export const useAddTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(addTransaction, {
				requestData,
				disableFailureToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getTransactionPaginated.queryKeyName],
			});
		},
	});
};

export const useUpdateTransaction = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(updateTransaction, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getTransactionPaginated.queryKeyName],
			});
		},
	});
};

export const useGetAllTransaction = () => {
	return useQuery({
		queryKey: [getAllTransacion.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getAllTransacion, {
				disableSuccessToast: true,
			});
		},
	});
};

export const useGetTransactionById = (id: string, enabled?: boolean) => {
	return useQuery({
		queryKey: [getTransactionById.queryKeyName, id],
		queryFn: () => {
			return performApiAction<any>(getTransactionById, {
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

export const useDeleteTransaction = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: { id: string }) => {
			return performApiAction(deleteTransaction, {
				requestData: id,
				disableSuccessToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getTransactionPaginated.queryKeyName],
			});
		},
	});
};
