import { z } from "zod";
import type { TableSpecification } from "./table-spec-schema";

export type MockDataArray = {
  [k: string]: number | string;
}[];

export function createItemSchemaFromTableSpec(columns: TableSpecification["columns"]) {
  const shape: Record<string, z.ZodTypeAny> = {};
  columns.forEach((column) => {
    switch (column.dataType) {
      case "number":
        shape[column.id] = z.number().describe(column.header); // Add descriptions for clarity
        break;
      case "date":
        shape[column.id] = z.string().datetime().describe(column.header); // Or z.date() if your LLM handles it well
        break;
      case "status": // Assuming status is text but could be an enum if you have predefined statuses
        shape[column.id] = z.string().describe(column.header);
        break;
      case "text":
      default:
        shape[column.id] = z.string().describe(column.header);
        break;
    }
  });
  return z.object(shape);
}
