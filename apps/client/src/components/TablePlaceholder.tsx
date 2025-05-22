import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { TableIcon } from "lucide-react";

export const TablePlaceholder = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="border rounded-lg overflow-x-auto shadow">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-600">
                <div className="flex items-center">
                  <TableIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  Title
                </div>
              </TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-600">Col</TableHead>
              <TableHead className="px-4 py-3 text-sm font-medium text-gray-600">Col</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-4 py-3 text-sm text-gray-700">Name</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-4 py-3 text-sm text-gray-700">Name</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
            </TableRow>
            <TableRow className="hover:bg-gray-50">
              <TableCell className="px-4 py-3 text-sm text-gray-700">Name</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
              <TableCell className="px-4 py-3 text-sm text-gray-700">Cell</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
