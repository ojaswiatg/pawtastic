"use client";

import { Button } from "@components/ui/button";
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
    ColumnDef,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { filter, includes } from "lodash-es";
import { ChevronDown } from "lucide-react";
import * as React from "react";
import { useEffect, useState } from "react";

// Mock data
const data: Pet[] = [
    {
        sku: "DOG001",
        breed: "Labrador",
        gender: "male",
        size: "large",
        category: "dog",
        price: 500,
        discount: 0,
    },
    {
        sku: "CAT001",
        breed: "Siamese",
        gender: "female",
        size: "small",
        category: "cat",
        price: 300,
        discount: 10,
    },
    {
        sku: "DOG002",
        breed: "German Shepherd",
        gender: "male",
        size: "large",
        category: "dog",
        price: 600,
        discount: 5,
    },
    {
        sku: "CAT002",
        breed: "Persian",
        gender: "female",
        size: "medium",
        category: "cat",
        price: 400,
        discount: 0,
    },
    {
        sku: "DOG003",
        breed: "Chihuahua",
        gender: "female",
        size: "small",
        category: "dog",
        price: 300,
        discount: 15,
    },
];

export type Pet = {
    sku: string;
    breed: string;
    gender: string;
    size: string;
    category: string;
    price: number;
    discount: number;
};

const columns: ColumnDef<Pet>[] = [
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
        state: {
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

    useEffect(() => {
        filterTableData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    return (
        <div className="w-full">
            <div className="flex items-center py-4 space-x-2">
                <Input
                    placeholder="Filter by SKU"
                    value={filters.sku}
                    onChange={(event) =>
                        setFilters({ ...filters, sku: event.target.value })
                    }
                    className="max-w-sm"
                />
                <Input
                    placeholder="Filter breed..."
                    value={filters.breed}
                    onChange={(event) =>
                        setFilters({ ...filters, breed: event.target.value })
                    }
                    className="max-w-sm"
                />
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
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                    </SelectContent>
                </Select>
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
                        <SelectItem value="small">Small</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                </Select>
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
                        <SelectItem value="cat">Cat</SelectItem>
                        <SelectItem value="dog">Dog</SelectItem>
                    </SelectContent>
                </Select>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
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
            </div>
            <div className="rounded-md border">
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
