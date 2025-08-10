import React from "react";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
    return (
        <>
            {/* Admin dashboard header is already inside DashboardHome */}
            <Outlet />
        </>
    );
}
