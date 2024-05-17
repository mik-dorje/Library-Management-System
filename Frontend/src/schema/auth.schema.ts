export interface ISignInRequest {
	email: string;
	password: string;
}

export interface ISignInResponse {
	accessToken: string;
	result: any;
}

export interface IAuthUser {
	email: string;
}
