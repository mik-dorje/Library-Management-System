import {
    useState,
    createContext,
    FC,
    ReactNode,
    useMemo,
    useContext,
} from "react";

export const TitleContext = createContext<ITitleContext>({
    title: "",
    setTitle: () => {},
});

interface ITitleContext {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
}

const TitleProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState("");

    const providerValue = useMemo(
        () => ({
            title,
            setTitle,
        }),
        [title]
    );

    return (
        <TitleContext.Provider value={providerValue}>
            {children}
        </TitleContext.Provider>
    );
};

export const useTitle = () => {
    return useContext(TitleContext);
};

export default TitleProvider;
