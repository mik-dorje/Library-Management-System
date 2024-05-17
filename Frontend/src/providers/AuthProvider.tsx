import {
	useState,
	createContext,
	FC,
	useContext,
	useMemo,
	useEffect,
	useCallback,
} from "react";
import { useLocalStorage } from "usehooks-ts";

import TokenService from "@/services/token-storage";
import { IAuthUser } from "@/schema/auth.schema";
import { clearStorage } from "@/utils/storage.utils";
import { publicRoutePaths } from "@/router";

interface AuthContextStructure {
	isAuthenticated: boolean;
	authUser: IAuthUser | null;
	setAuthUser: React.Dispatch<React.SetStateAction<IAuthUser | null>>;
	signUserOut: () => void;
}

const AuthContext = createContext<AuthContextStructure>({
	isAuthenticated: false,
	authUser: null,
	setAuthUser: () => {},
	signUserOut: () => {},
});

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(
		!!TokenService.getAccessToken(),
	);
	const [authUser, setAuthUser] = useLocalStorage<IAuthUser | null>(
		"auth-user",
		null,
	);

	useEffect(() => {
		setIsAuthenticated(!!authUser);
	}, [authUser]);

	useEffect(() => {
		if (!isAuthenticated) {
			setAuthUser(null);
		}
	}, [isAuthenticated, setAuthUser]);

	const signUserOut = useCallback(() => {
		clearStorage();
		TokenService.clearToken();
		setAuthUser(null);
		window.location.replace(publicRoutePaths.signin);
	}, [setAuthUser]);

	const providerValue = useMemo(
		() => ({
			isAuthenticated,
			authUser,
			setAuthUser,
			signUserOut,
		}),
		[isAuthenticated, authUser, setAuthUser, signUserOut],
	);

	return (
		<AuthContext.Provider value={providerValue}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => {
	return useContext(AuthContext);
};

export default AuthProvider;
