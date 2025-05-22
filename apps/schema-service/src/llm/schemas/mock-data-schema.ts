import { z } from "zod";
import type { TableSpecification } from "./table-spec-schema";

export type MockDataArray = {
  [k: string]: number | string;
}[];

export function createItemSchemaFromTableSpec(columns: TableSpecification["columns"]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  columns.forEach((column) => {
    let type: z.ZodTypeAny;
    switch (column.dataType) {
      case "number":
        type = z.number().describe(column.header);
        break;
      case "date":
        type = z.string().datetime().describe(column.header);
        break;
      case "text":
      case "status":
      default:
        type = z.string().describe(column.header);
        break;
    }

    shape[column.id] = z.object({
      value: type,
      icon: z.string().optional(),
    });
  });

  return z.object(shape);
}
