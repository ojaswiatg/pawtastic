"use client";

import {
    EPetCategory,
    EPetCategoryUI,
    EPetGender,
    EPetGenderUI,
    EPetSize,
    EPetSizeUI,
} from "@/lib/enums";
import { Button } from "@components/ui/button";
import { Checkbox } from "@components/ui/checkbox";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@components/ui/select";
import { Textarea } from "@components/ui/textarea";
import { cn } from "@lib/utils";
import { ChangeEvent, FormEvent, useState } from "react";

type TAdminInventoryAddPetProps = {
    className?: string;
};

const INFO_MAX_CHAR = 240;
const DESCRIPTION_MAX_CHAR = 4800;

export default function AdminAddPetForm({
    className,
}: TAdminInventoryAddPetProps) {
    const [petInfo, setPetInfo] = useState({
        name: "",
        breed: "",
        gender: "",
        size: "",
        sku: "",
        color: "",
        vaccinated: false,
        dewormed: false,
        info: "",
        description: "",
        category: "",
        price: "",
        discount: "",
    });

    const [infoCharCount, setInfoCharCount] = useState(0);
    const [descriptionCharCount, setDescriptionCharCount] = useState(0);

    const handleInputChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const { name, value } = e.target;
        const chars = value.trim().split(/\s+/);

        if (name === "info") {
            if (chars.length <= INFO_MAX_CHAR) {
                setPetInfo((prev) => ({ ...prev, [name]: value }));
                setInfoCharCount(value.length);
            }
        } else if (name === "description") {
            if (chars.length <= DESCRIPTION_MAX_CHAR) {
                setPetInfo((prev) => ({ ...prev, [name]: value }));
                setDescriptionCharCount(value.length);
            }
        } else {
            setPetInfo((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSelectChange = (name: string, value: string) => {
        setPetInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, checked: boolean | string) => {
        setPetInfo((prev) => ({ ...prev, [name]: checked }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(petInfo);
        // Handle form submission here
    };

    return (
        <form
            onSubmit={handleSubmit}
            className={cn(
                "min-w-[20rem] h-[32rem] overflow-y-scroll mx-auto p-1 grid gap-6",
                className,
            )}
        >
            <div>
                <p className="text-md text-gray-500">Basic information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                    <div className="space-y-2">
                        <Label htmlFor="sku">SKU</Label>
                        <Input
                            id="sku"
                            name="sku"
                            value={petInfo.sku}
                            onChange={handleInputChange}
                            placeholder="SKU"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            value={petInfo.name}
                            onChange={handleInputChange}
                            placeholder="Pet's name"
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-md text-gray-500">Pet details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                    <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                            name="category"
                            onValueChange={(value) =>
                                handleSelectChange("category", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={EPetCategory.CAT}>
                                    {EPetCategoryUI.CAT}
                                </SelectItem>
                                <SelectItem value={EPetCategory.DOG}>
                                    {EPetCategoryUI.DOG}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="breed">Breed</Label>
                        <Input
                            id="breed"
                            name="breed"
                            value={petInfo.breed}
                            onChange={handleInputChange}
                            placeholder="Pet's breed"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="size">Size</Label>
                        <Select
                            name="size"
                            onValueChange={(value) =>
                                handleSelectChange("size", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
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
                    <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select
                            name="gender"
                            onValueChange={(value) =>
                                handleSelectChange("gender", value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value={EPetGender.MALE}>
                                    {EPetGenderUI.MALE}
                                </SelectItem>
                                <SelectItem value={EPetGender.FEMALE}>
                                    {EPetGenderUI.FEMALE}
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="color">Color</Label>
                        <Input
                            id="color"
                            name="color"
                            value={petInfo.color}
                            onChange={handleInputChange}
                            placeholder="Pet's color"
                        />
                    </div>
                </div>
            </div>

            <div>
                <p className="text-md text-gray-500">Vaccination information</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                    <div className="flex items-center space-x-2 mt-2">
                        <Checkbox
                            id="vaccinated"
                            name="vaccinated"
                            checked={petInfo.vaccinated}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange("vaccinated", checked)
                            }
                        />
                        <Label htmlFor="vaccinated">Vaccinated</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="dewormed"
                            name="dewormed"
                            checked={petInfo.dewormed}
                            onCheckedChange={(checked) =>
                                handleCheckboxChange("dewormed", checked)
                            }
                        />
                        <Label htmlFor="dewormed">Dewormed</Label>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-md text-gray-500">Pricing</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                    <div className="space-y-2">
                        <Label htmlFor="price">Price</Label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                                $
                            </span>
                            <Input
                                id="price"
                                name="price"
                                type="number"
                                value={petInfo.price}
                                onChange={handleInputChange}
                                placeholder="Base price"
                                className="pl-7"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="discount">Discount</Label>
                        <div className="relative">
                            <Input
                                id="discount"
                                name="discount"
                                type="number"
                                value={petInfo.discount}
                                onChange={handleInputChange}
                                placeholder="0"
                                className="pr-7"
                            />
                            <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500">
                                %
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p className="text-md text-gray-500">Listing details</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mr-12">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="info">Additional Information</Label>
                        <Textarea
                            id="info"
                            name="info"
                            value={petInfo.info}
                            onChange={handleInputChange}
                            placeholder="Additional information"
                        />
                        <p
                            className={cn("text-sm text-gray-500 text-right", {
                                "text-red-500": infoCharCount > INFO_MAX_CHAR,
                            })}
                        >
                            {infoCharCount}/{INFO_MAX_CHAR}
                        </p>
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            name="description"
                            value={petInfo.description}
                            onChange={handleInputChange}
                            placeholder="Description with keywords"
                        />
                        <p
                            className={cn("text-sm text-gray-500 text-right", {
                                "text-red-500":
                                    descriptionCharCount > DESCRIPTION_MAX_CHAR,
                            })}
                        >
                            {descriptionCharCount}/{DESCRIPTION_MAX_CHAR}
                        </p>
                    </div>
                </div>
            </div>

            <div className="ml-auto w-fit mt-2">
                <Button type="submit" className="w-fit ml-auto mr-12">
                    <div className="i-mdi-plus h-4 w-4" />
                    <p className="ml-1">Add</p>
                </Button>
            </div>
        </form>
    );
}
