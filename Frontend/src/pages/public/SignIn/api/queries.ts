import { useMutation } from "@tanstack/react-query";

import performApiAction from "@/utils/http/perform-api-action";
import { publicApiList } from "@/api";
import { ISignInRequest, ISignInResponse } from "@/schema/auth.schema";

const { signUserIn } = publicApiList.auth;

export const useSignUserIn = () => {
	return useMutation({
		mutationFn: (requestData: ISignInRequest) => {
			return performApiAction<ISignInResponse>(signUserIn, {
				requestData,
				disableSuccessToast: true,
			});
		},
	});
};
