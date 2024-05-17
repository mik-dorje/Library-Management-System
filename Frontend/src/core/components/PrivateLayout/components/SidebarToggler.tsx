import { Button } from "antd";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

import { useSidebar } from "@/providers/SidebarProvider";

const SidebarToggler = () => {
    const { isCollapsed, toggleIsCollapsed } = useSidebar();

    return (
        <Button
            icon={isCollapsed ? <CgChevronRight /> : <CgChevronLeft />}
            type="text"
            shape="circle"
            className="flex items-center justify-center bg-white text-lg shadow"
            size="small"
            onClick={() => toggleIsCollapsed()}
        />
    );
};

export default SidebarToggler;
