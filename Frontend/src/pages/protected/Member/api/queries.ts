import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { protectedApiList } from "@/api";
import performApiAction from "@/utils/http/perform-api-action";

import {
	IGenericPaginatedRequest,
	IGenericPaginatedResponse,
} from "@/schema/http.schema";

const {
	getMemberPaginated,
	addMember,
	getMemberById,
	updateMember,
	deleteMember,
	getAllMember,
} = protectedApiList.member;

export const useGetMemberPaginated = (
	requestData: IGenericPaginatedRequest,
) => {
	return useQuery({
		queryKey: [getMemberPaginated.queryKeyName, requestData],
		queryFn: () => {
			return performApiAction<IGenericPaginatedResponse<any[]>>(
				getMemberPaginated,
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

export const useAddMember = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(addMember, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getMemberPaginated.queryKeyName],
			});
			queryClient.invalidateQueries({
				queryKey: [getMemberById.queryKeyName],
			});
		},
	});
};

export const useUpdateMember = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (requestData: any) => {
			return performApiAction(updateMember, {
				requestData,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getMemberPaginated.queryKeyName],
			});
			queryClient.invalidateQueries({
				queryKey: [getMemberById.queryKeyName],
			});
		},
	});
};

export const useGetAllMember = () => {
	return useQuery({
		queryKey: [getAllMember.queryKeyName],
		queryFn: () => {
			return performApiAction<any>(getAllMember, {
				disableSuccessToast: true,
			});
		},
	});
};

export const useGetMemberById = (id: string, enabled?: boolean) => {
	return useQuery({
		queryKey: [getMemberById.queryKeyName, id],
		queryFn: () => {
			return performApiAction<any>(getMemberById, {
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

export const useDeleteMember = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: { id: string }) => {
			return performApiAction(deleteMember, {
				requestData: id,
				disableSuccessToast: true,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [getMemberPaginated.queryKeyName],
			});
		},
	});
};
