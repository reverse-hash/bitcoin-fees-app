import { number } from "yup";

export const satsSchema = number().integer().min(1).required();
