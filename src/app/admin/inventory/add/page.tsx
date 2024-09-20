import AdminAddPetForm from "@components/admin/AdminInventoryAddPet";
import React from "react";

function AdminInventoryAddPage() {
    return (
        <div>
            <p className="text-4xl font-bold">Add New Pet</p>
            <p className="text-md text-gray-500 mb-8">
                Add a new Pet to the inventory
            </p>
            <AdminAddPetForm className="h-full" />
        </div>
    );
}

export default AdminInventoryAddPage;
