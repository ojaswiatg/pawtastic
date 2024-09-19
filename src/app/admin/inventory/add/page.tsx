import AdminAddPetForm from "@components/admin/AdminInventoryAddPet";
import React from "react";

function AdminInventoryAddPage() {
    return (
        <div>
            <p className="text-2xl">Add New Item</p>
            <p className="text-md text-gray-500">Add a new Pet</p>
            <AdminAddPetForm className="mt-4 h-full" />
        </div>
    );
}

export default AdminInventoryAddPage;
