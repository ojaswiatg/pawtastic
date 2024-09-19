import AdminInventoryAddPet from "@components/admin/AdminInventoryAddPet";
import AdminInventoryTable from "@components/admin/AdminInventoryTable";
import React from "react";

function AdminInventory() {
    return (
        <div>
            <AdminInventoryTable />
            <AdminInventoryAddPet />
        </div>
    );
}

export default AdminInventory;
