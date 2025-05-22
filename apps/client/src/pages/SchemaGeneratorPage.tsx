import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { eden } from "@/lib/eden";
import type {
  BackendFullOrchestrationResult,
  ServerSuccessResponse,
  ServerErrorResponse,
} from "@/types/api";
import { PromptInputArea } from "@/components/PromptInputArea";
import { TablePlaceholder } from "@/components/TablePlaceholder";
import { GeneratedTableDisplay } from "@/components/GeneratedTableDisplay";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ErrorMessage } from "@/components/ErrorMessage";
import { hasProperty } from "@/lib/utils";

interface MutationError {
  message: string;
  status?: number;
  value?: unknown;
}

const SchemaGeneratorPage: React.FC = () => {
  const [prompt, setPrompt] = useState("");

  const mutation = useMutation<
    BackendFullOrchestrationResult,
    MutationError,
    string
  >({
    mutationFn: async (
      currentPrompt: string
    ): Promise<BackendFullOrchestrationResult> => {
      const response = await eden["generate-table"].post({
        prompt: currentPrompt,
      });

      const httpStatus = response.status;

      if (response.error) {
        const errorValue = response.error.value;
        let errorMessage = "API request failed.";
        if (
          hasProperty(errorValue, "message") &&
          typeof errorValue.message === "string"
        ) {
          errorMessage = errorValue.message;
        } else if (typeof errorValue === "string") {
          errorMessage = errorValue;
        }
        throw {
          message: errorMessage,
          status: httpStatus,
          value: errorValue,
        } as MutationError;
      }

      if (response.data === null) {
        throw {
          message: "Received an empty response from the server.",
          status: httpStatus,
        } as MutationError;
      }

      const serverResponse = response.data as
        | ServerSuccessResponse
        | ServerErrorResponse;

      if (serverResponse.success) {
        return serverResponse.data;
      } else {
        throw {
          message: serverResponse.message || "An error occurred on the server.",
          status: httpStatus,
          value: serverResponse,
        } as MutationError;
      }
    },
  });

  const handleGenerateSubmit = () => {
    if (prompt.trim()) {
      mutation.mutate(prompt);
    }
  };

  const isLoading = mutation.isPending;
  const displayData = mutation.data;
  const mutationErrorObject = mutation.error;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-8">
      <header className="w-full max-w-md mb-8">
        <PromptInputArea
          prompt={prompt}
          onPromptChange={setPrompt}
          onSubmit={handleGenerateSubmit}
          isLoading={isLoading}
        />
      </header>

      <main className="w-full flex-grow flex flex-col items-center justify-start">
        {isLoading && <LoadingIndicator />}

        {mutationErrorObject && (
          <ErrorMessage message={mutationErrorObject.message} />
        )}

        {!isLoading && !mutationErrorObject && displayData && (
          <GeneratedTableDisplay data={displayData} />
        )}

        {!isLoading && !mutationErrorObject && !displayData && (
          <TablePlaceholder />
        )}
      </main>
    </div>
  );
};

export default SchemaGeneratorPage;
