import { AlertTriangleIcon } from "lucide-react";

interface ErrorMessageProps {
  message: string | null;
  title?: string;
}

export const ErrorMessage = ({
  message = "An error has occurred",
  title = "Error",
}: ErrorMessageProps) => {
  return (
    <div
      className="bg-red-50 border border-red-300 text-red-700 p-4 rounded-md w-full max-w-3xl mx-auto mt-8"
      role="alert"
    >
      <div className="flex">
        <div className="py-1">
          <AlertTriangleIcon className="h-6 w-6 text-red-500 mr-3" />
        </div>
        <div>
          <p className="font-bold">{title}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    </div>
  );
};
