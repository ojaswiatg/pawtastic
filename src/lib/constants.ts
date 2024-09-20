import { EPetGender, EPetGenderUI } from "./enums";

export const PET_GENDER_UI_MAP: { [key in EPetGender]: EPetGenderUI } = {
    [EPetGender.MALE]: EPetGenderUI.MALE,
    [EPetGender.FEMALE]: EPetGenderUI.FEMALE,
};
