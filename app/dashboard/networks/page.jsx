"use client";
import DashboardLayout from "../dashboardLayout";
import { Button } from "@/components/ui/button";
import { usePopup } from "@/context/PopupContext";

export default function NetworksPage(){
    const { openPopup } = usePopup();
    return <DashboardLayout>
        <div className="flex items-center justify-between">

        <h3 className="text-xl font-semibold py-2">Networks</h3>
            <Button onClick={() => openPopup("Create new Network", <div>Hello</div>)}>Create new Network</Button>
        </div>
    </DashboardLayout>
}