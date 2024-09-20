import { z } from "zod";

import { EPetCategory, EPetGender, EPetSize } from "./enums";

export const PetSchema = z.object({
    id: z.string().nullish(),
    sku: z.string(),
    breed: z.string(),
    gender: z.nativeEnum(EPetGender),
    size: z.nativeEnum(EPetSize),
    category: z.nativeEnum(EPetCategory),
    price: z.number(),
    discount: z.number(),
    name: z.string().nullish(),
    color: z.string().nullish(),
    vaccinated: z.boolean().nullish(),
    dewormed: z.boolean().nullish(),
    info: z.string().nullish(),
    description: z.string().nullish(),
});

export const AddPetFormSchema = z.object({
    sku: z.string(),
    name: z.string(),
    category: z.nativeEnum(EPetCategory),
    breed: z.string(),
    size: z.nativeEnum(EPetSize),
    gender: z.nativeEnum(EPetGender),
    color: z.string().nullish(),
    vaccinated: z.boolean(),
    dewormed: z.boolean(),
    price: z.number(),
    discount: z.number(),
    info: z.string().nullish(),
    description: z.string().nullish(),
});

export type TPetSchema = z.infer<typeof PetSchema>;
