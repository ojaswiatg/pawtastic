import AdminInventoryAddPet from "@components/admin/AdminInventoryAddPet";
import AdminInventoryTable from "@components/admin/AdminInventoryTable";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@components/ui/dialog";
import React from "react";

function AdminInventory() {
    return (
        <div>
            <Dialog>
                <DialogTrigger className="flex items-center ml-auto bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2 rounded-md">
                    <div className="i-mdi-plus h-4 w-4" />
                    <p className="ml-1">Add New</p>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Item</DialogTitle>
                        <DialogDescription>Add a new Pet</DialogDescription>
                    </DialogHeader>
                    <AdminInventoryAddPet />
                </DialogContent>
            </Dialog>
            <AdminInventoryTable />
        </div>
    );
}

export default AdminInventory;
