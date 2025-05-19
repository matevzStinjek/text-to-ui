import { z } from "zod";

export const TableSpecificationSchema = z.object({
  tableTitle: z.string().min(1),
  requestedRowCount: z.number().optional(),
  columns: z.array(
    z.object({
      id: z.string().min(1),
      header: z.string().min(1),
      dataType: z.enum(["text", "date", "number", "status"]),
      isNameColumn: z.boolean().optional(),
      icon: z.string().optional(),
    })
  ),
  actions: z.array(
    z.object({
      id: z.string().min(1),
      label: z.string().min(1),
      icon: z.string().min(1),
    })
  ),
  userPromptAnalysis: z.object({
    originalPrompt: z.string(),
    inferredColumns: z.array(z.string()).optional(),
    specificRequestsHandled: z.array(z.string()).optional(),
  }),
  requestMockData: z.boolean(),
  mockDataDetails: z.string().optional(),
});

export type TableSpecification = z.infer<typeof TableSpecificationSchema>;
