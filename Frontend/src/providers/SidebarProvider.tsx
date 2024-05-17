import React, { useState, useMemo, createContext, useContext } from "react";
import { useLocalStorage } from "usehooks-ts";

interface ISidebarContextStructure {
    showSidebar: boolean;
    toggleShowSidebar: (showSidebar?: boolean) => void;
    isCollapsed: boolean;
    toggleIsCollapsed: (isCollapsed?: boolean) => void;
    showHeader: boolean;
    toggleShowHeader: (showHeader?: boolean) => void;
}

export const SidebarContext = createContext<ISidebarContextStructure>({
    showSidebar: true,
    toggleShowSidebar: () => {},
    isCollapsed: false,
    toggleIsCollapsed: () => {},
    showHeader: true,
    toggleShowHeader: () => {},
});

const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
    const [isCollapsed, setIsCollapsed] = useLocalStorage(
        "is-sidebar-collapsed",
        false
    );
    const [showSidebar, setShowSidebar] = useState(true);
    const [showHeader, setShowHeader] = useState(true);

    const contextValue: ISidebarContextStructure = useMemo(
        () => ({
            showSidebar,
            toggleShowSidebar: (state?: boolean) =>
                setShowSidebar(state || !showSidebar),
            isCollapsed,
            toggleIsCollapsed: (state?: boolean) =>
                setIsCollapsed(state || !isCollapsed),
            showHeader,
            toggleShowHeader: (state?: boolean) =>
                setShowHeader(state || !showHeader),
        }),
        [isCollapsed, showSidebar, showHeader, setIsCollapsed]
    );

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    return useContext(SidebarContext);
};

export default SidebarProvider;
