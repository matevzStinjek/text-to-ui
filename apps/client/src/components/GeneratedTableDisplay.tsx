import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BackendFullOrchestrationResult } from "@/types/api";
import { getLucideIcon } from "@/components/icons";
import { cn, formatCellValue } from "@/lib/utils";

interface GeneratedTableDisplayProps {
  data: BackendFullOrchestrationResult;
}

export const GeneratedTableDisplay: React.FC<GeneratedTableDisplayProps> = ({
  data,
}) => {
  if (!data) {
    return null;
  }

  const { tableSpecification, mockData } = data;

  const getCellClass = (dataType: string) => {
    switch (dataType) {
      case "status":
        return "font-medium";
      case "number":
        return "text-right font-mono";
      case "date":
        return "text-muted-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
        {tableSpecification.tableTitle}
      </h2>
      {tableSpecification.columns.length > 0 ? (
        <div className="border rounded-lg overflow-x-auto shadow">
          <Table>
            <TableHeader className="bg-gray-50">
              <TableRow>
                {tableSpecification.columns.map((col) => {
                  const IconComponent = getLucideIcon(col.icon);
                  return (
                    <TableHead
                      key={col.id}
                      className={cn(
                        "px-4 py-3 text-sm font-medium text-gray-600",
                        col.dataType === "number" && "text-right"
                      )}
                    >
                      <div
                        className={cn(
                          "flex items-center",
                          col.dataType === "number"
                            ? "justify-end"
                            : "justify-start"
                        )}
                      >
                        {IconComponent && (
                          <IconComponent className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                        )}
                        {col.header}
                      </div>
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockData && mockData.length > 0 ? (
                mockData.map((row, rowIndex) => (
                  <TableRow key={rowIndex} className="hover:bg-gray-50">
                    {tableSpecification.columns.map((col) => {
                      const cellData = row[col.id]!;
                      const CellIconComponent = getLucideIcon(cellData.icon);
                      const cellClass = getCellClass(col.dataType);

                      return (
                        <TableCell
                          key={`${rowIndex}-${col.id}`}
                          className={cn(
                            "px-4 py-3 text-sm text-gray-700",
                            cellClass
                          )}
                        >
                          <div
                            className={cn(
                              "flex items-center",
                              col.dataType === "number"
                                ? "justify-end"
                                : "justify-start"
                            )}
                          >
                            {CellIconComponent && (
                              <CellIconComponent className="h-4 w-4 mr-2 text-muted-foreground shrink-0" />
                            )}
                            {col.dataType === "status" ? (
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100">
                                {formatCellValue(cellData.value, col.dataType)}
                              </span>
                            ) : (
                              formatCellValue(cellData.value, col.dataType)
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={tableSpecification.columns.length}
                    className="text-center px-4 py-10 text-gray-500"
                  >
                    No mock data available or requested.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          The generated table specification has no columns.
        </p>
      )}
    </div>
  );
};
