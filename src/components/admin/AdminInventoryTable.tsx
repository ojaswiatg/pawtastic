"use client";

import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Input } from "@components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@components/ui/table";
import {
    EPetCategory,
    EPetCategoryUI,
    EPetGender,
    EPetGenderUI,
    EPetSize,
    EPetSizeUI,
} from "@lib/enums";
import { TPetSchema } from "@lib/types";
import {
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { filter, includes, isEmpty } from "lodash-es";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

// Mock data
const data: TPetSchema[] = [
    {
        sku: "DOG001",
        breed: "Labrador",
        gender: EPetGender.MALE,
        size: EPetSize.LARGE,
        category: EPetCategory.DOG,
        price: 500,
        discount: 0,
    },
    {
        sku: "CAT001",
        breed: "Siamese",
        gender: EPetGender.FEMALE,
        size: EPetSize.SMALL,
        category: EPetCategory.CAT,
        price: 300,
        discount: 10,
    },
    {
        sku: "DOG002",
        breed: "German Shepherd",
        gender: EPetGender.MALE,
        size: EPetSize.LARGE,
        category: EPetCategory.DOG,
        price: 600,
        discount: 5,
    },
    {
        sku: "CAT002",
        breed: "Persian",
        gender: EPetGender.FEMALE,
        size: EPetSize.MEDIUM,
        category: EPetCategory.CAT,
        price: 400,
        discount: 0,
    },
    {
        sku: "DOG003",
        breed: "Chihuahua",
        gender: EPetGender.FEMALE,
        size: EPetSize.SMALL,
        category: EPetCategory.DOG,
        price: 300,
        discount: 15,
    },
    {
        sku: "DOG001",
        breed: "Labrador",
        gender: EPetGender.MALE,
        size: EPetSize.LARGE,
        category: EPetCategory.DOG,
        price: 500,
        discount: 0,
    },
    {
        sku: "CAT001",
        breed: "Siamese",
        gender: EPetGender.FEMALE,
        size: EPetSize.SMALL,
        category: EPetCategory.CAT,
        price: 300,
        discount: 10,
    },
    {
        sku: "DOG002",
        breed: "German Shepherd",
        gender: EPetGender.MALE,
        size: EPetSize.LARGE,
        category: EPetCategory.DOG,
        price: 600,
        discount: 5,
    },
    {
        sku: "CAT002",
        breed: "Persian",
        gender: EPetGender.FEMALE,
        size: EPetSize.MEDIUM,
        category: EPetCategory.CAT,
        price: 400,
        discount: 0,
    },
    {
        sku: "DOG003",
        breed: "Chihuahua",
        gender: EPetGender.FEMALE,
        size: EPetSize.SMALL,
        category: EPetCategory.DOG,
        price: 300,
        discount: 15,
    },
];

const columns: ColumnDef<TPetSchema>[] = [
    {
        accessorKey: "select",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
    },
    {
        accessorKey: "sku",
        header: "SKU",
        cell: ({ row }) => <div>{row.getValue("sku")}</div>,
    },
    {
        accessorKey: "breed",
        header: "Breed",
        cell: ({ row }) => <div>{row.getValue("breed")}</div>,
    },
    {
        accessorKey: "gender",
        header: "Gender",
        cell: ({ row }) => <div>{row.getValue("gender")}</div>,
    },
    {
        accessorKey: "size",
        header: "Size",
        cell: ({ row }) => <div>{row.getValue("size")}</div>,
    },
    {
        accessorKey: "category",
        header: "Category",
        cell: ({ row }) => <div>{row.getValue("category")}</div>,
    },
    {
        accessorKey: "price",
        header: "Price",
        cell: ({ row }) => <div>${row.getValue("price")}</div>,
    },
    {
        accessorKey: "discount",
        header: "Discount",
        cell: ({ row }) => <div>{row.getValue("discount")}%</div>,
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const pet = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <div className="i-mdi-dots-vertical" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="start">
                        <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => console.log(pet)}
                        >
                            <div className="i-mdi-delete h-4 w-4 text-red-500" />
                            <p className="ml-2">Delete</p>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            className="flex items-center"
                            onClick={() => console.log(pet)}
                        >
                            <div className="i-mdi-pencil h-4 w-4 text-gray-500" />
                            <p className="ml-2">Edit</p>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];

export default function AdminInventoryTable() {
    const [rowSelection, setRowSelection] = useState({});
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(
        {},
    );

    const [filters, setFilters] = useState({
        sku: "",
        breed: "",
        gender: "",
        size: "",
        category: "",
    });

    const [tableData, setTableData] = useState(data);

    const table = useReactTable({
        data: tableData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            rowSelection,
            columnVisibility,
        },
    });

    function filterTableData() {
        setTableData(
            filter(
                data,
                (record) =>
                    (filters.sku === "" ||
                        includes(
                            record.sku.toLowerCase().trim(),
                            filters.sku.toLowerCase().trim(),
                        )) &&
                    (filters.breed === "" ||
                        includes(
                            record.breed.toLowerCase().trim(),
                            filters.breed.toLowerCase().trim(),
                        )) &&
                    (filters.gender === "all" ||
                        filters.gender === "" ||
                        record.gender.toLowerCase().trim() ===
                            filters.gender.toLowerCase().trim()) &&
                    (filters.size === "all" ||
                        filters.size === "" ||
                        record.size.toLowerCase().trim() ===
                            filters.size.toLowerCase().trim()) &&
                    (filters.category === "all" ||
                        filters.category === "" ||
                        record.category.toLowerCase().trim() ===
                            filters.category.toLowerCase().trim()),
            ),
        );
    }

    function deleteBulk() {
        const selectedRows = table
            .getSelectedRowModel()
            .flatRows.map((row) => row.original);
        console.log("Selected Rows:", selectedRows);
    }

    useEffect(() => {
        filterTableData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <div className="w-full">
            <div className="flex items-center flex-wrap gap-2">
                <Input
                    placeholder="Filter by SKU"
                    value={filters.sku}
                    onChange={(event) =>
                        setFilters({ ...filters, sku: event.target.value })
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Filter by breed"
                    value={filters.breed}
                    onChange={(event) =>
                        setFilters({ ...filters, breed: event.target.value })
                    }
                    className="max-w-sm"
                />
                <div className="w-28">
                    <Select
                        onValueChange={(value) => {
                            setFilters({ ...filters, gender: value });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value={EPetGender.MALE}>
                                {EPetGenderUI.MALE}
                            </SelectItem>
                            <SelectItem value={EPetGender.FEMALE}>
                                {EPetGenderUI.FEMALE}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-28">
                    <Select
                        onValueChange={(value) => {
                            setFilters({ ...filters, size: value });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Size" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value={EPetSize.SMALL}>
                                {EPetSizeUI.SMALL}
                            </SelectItem>
                            <SelectItem value={EPetSize.MEDIUM}>
                                {EPetSizeUI.MEDIUM}
                            </SelectItem>
                            <SelectItem value={EPetSize.LARGE}>
                                {EPetSizeUI.LARGE}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <div className="w-28">
                    <Select
                        onValueChange={(value) => {
                            setFilters({ ...filters, category: value });
                        }}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value={EPetCategory.CAT}>
                                {EPetCategoryUI.CAT}
                            </SelectItem>
                            <SelectItem value={EPetCategory.DOG}>
                                {EPetCategoryUI.DOG}
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="w-28">
                        <Button variant="outline">
                            Columns <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

                {!isEmpty(rowSelection) ? (
                    <div className="ml-auto">
                        <Button
                            variant="destructive"
                            className="flex items-center"
                            onClick={deleteBulk}
                        >
                            <div className="i-mdi-delete h-4 w-4" />
                            <p className="ml-2">Delete</p>
                        </Button>
                    </div>
                ) : null}
            </div>

            <div className="rounded-md border mt-8">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext(),
                                                  )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
}
