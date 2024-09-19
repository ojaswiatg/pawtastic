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

function AdminInventoryPage() {
    return (
        <div>
            <AdminInventoryTable />
            <Dialog>
                <DialogTrigger className="flex items-center mt-8 ml-auto bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-3 py-6 rounded-full">
                    <div className="i-mdi-plus h-6 w-6" />
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New Item</DialogTitle>
                        <DialogDescription>Add a new Pet</DialogDescription>
                    </DialogHeader>
                    <AdminInventoryAddPet />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default AdminInventoryPage;
