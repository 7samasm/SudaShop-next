import * as yup from "yup";
export const validationSchema = yup.object({
  title: yup
    .string()
    .required("title is requierd")
    .max(40, "title must be < 40 chars")
    .min(2, "title must be > 2 chars"),
  description: yup
    .string()
    .required("description is requierd")
    .min(6, "description must be more than 6"),
  price: yup
    .number()
    .required("price is requierd")
    .positive("only positive values are allowed"),
});

export const inputs: {
  name: "title" | "description" | "price";
  label: string;
  type: string;
}[] = [
  { name: "title", label: "Title", type: "text" },
  { name: "description", label: "Description", type: "text" },
  { name: "price", label: "Price", type: "number" },
];
