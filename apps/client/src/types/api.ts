export interface BackendTableColumn {
  id: string;
  header: string;
  dataType: "text" | "date" | "number" | "status";
  isNameColumn?: boolean;
  icon?: string;
}

export interface BackendTableSpecification {
  tableTitle: string;
  requestedRowCount?: number;
  columns: BackendTableColumn[];
  actions: { id: string; label: string; icon: string }[];
  userPromptAnalysis: {
    originalPrompt: string;
    inferredColumns?: string[];
    specificRequestsHandled?: string[];
  };
  requestMockData: boolean;
  mockDataDetails?: string;
}

export interface CellData {
  value: string | number;
  icon?: string;
}

export type MockDataRow = Record<string, CellData>;

export type MockDataOutput = Array<MockDataRow>;

export interface BackendFullOrchestrationResult {
  tableSpecification: BackendTableSpecification;
  mockData?: MockDataOutput;
}

export type ServerSuccessResponse = {
  success: true;
  data: BackendFullOrchestrationResult;
};

export type ServerErrorResponse = {
  success: false;
  message: string;
};

export type EdenSuccessData = ServerSuccessResponse | ServerErrorResponse;
