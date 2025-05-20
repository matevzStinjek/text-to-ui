export const mockDataExamples = [
  {
    llmInput: `{{
      "columns": [
        {{ "id": "dealName", "header": "Deal Name", "dataType": "text" }},
        {{ "id": "companyName", "header": "Company", "dataType": "text" }},
        {{ "id": "stage", "header": "Stage", "dataType": "status" }},
        {{ "id": "value", "header": "Value", "dataType": "number" }},
        {{ "id": "expectedCloseDate", "header": "Expected Close Date", "dataType": "date" }}
      ],
      "rowCount": 2,
      "mockDataDetails": "Sales opportunities for a B2B software company. Deal stages: 'Prospecting', 'Qualification', 'Proposal', 'Negotiation', 'Closed Won', 'Closed Lost'. Value is a numerical amount representing deal size."
    }}`,
    output: `[
      {{
        "dealName": "Project Phoenix Implementation",
        "companyName": "Innovatech Solutions",
        "stage": "Proposal",
        "value": 85000,
        "expectedCloseDate": "2025-08-10"
      }},
      {{
        "dealName": "Synergy Platform Upgrade",
        "companyName": "Global Connect Corp",
        "stage": "Negotiation",
        "value": 150000,
        "expectedCloseDate": "2025-07-25"
      }}
    ]`,
  },
  {
    llmInput: `{{
      "columns": [
        {{ "id": "documentName", "header": "Document Name", "dataType": "text" }},
        {{ "id": "dateAdded", "header": "Date Added", "dataType": "date" }},
        {{ "id": "fileType", "header": "File Type", "dataType": "text" }}
      ],
      "rowCount": 3,
      "mockDataDetails": "Company documents such as reports, presentations, and spreadsheets. File types could be PDF, DOCX, XLSX."
    }}`,
    output: `[
      {{
        "documentName": "Q2 Financial Summary.xlsx",
        "dateAdded": "2025-04-18",
        "fileType": "XLSX"
      }},
      {{
        "documentName": "Annual Marketing Strategy.pptx",
        "dateAdded": "2025-01-20",
        "fileType": "PPTX"
      }},
      {{
        "documentName": "Employee Onboarding Guide.pdf",
        "dateAdded": "2024-11-05",
        "fileType": "PDF"
      }}
    ]`,
  },
  {
    llmInput: `{{
      "columns": [
        {{ "id": "taskDescription", "header": "Task", "dataType": "text" }},
        {{ "id": "priority", "header": "Priority", "dataType": "status" }},
        {{ "id": "dueDate", "header": "Due Date", "dataType": "date" }}
      ],
      "rowCount": 2,
      "mockDataDetails": "Project tasks with priorities: 'High', 'Medium', 'Low'. Due dates should be upcoming."
    }}`,
    output: `[
      {{
        "taskDescription": "Develop API endpoint for user authentication",
        "priority": "High",
        "dueDate": "2025-06-15"
      }},
      {{
        "taskDescription": "Update documentation for new feature",
        "priority": "Medium",
        "dueDate": "2025-06-22"
      }}
    ]`,
  },
  {
    llmInput: `{{
      "columns": [
        {{ "id": "productName", "header": "Product Name", "dataType": "text" }},
        {{ "id": "price", "header": "Price", "dataType": "number" }},
        {{ "id": "stockQuantity", "header": "Stock Quantity", "dataType": "number" }}
      ],
      "rowCount": 3,
      "mockDataDetails": "Consumer electronics products.Price is a numerical value.Stock quantity is an integer."
    }}`,
    output: `[
      {{
        "productName": "Wireless Noise-Cancelling Headphones",
        "price": 249.99,
        "stockQuantity": 150
      }},
      {{
        "productName": "Smart Fitness Tracker Watch",
        "price": 129.50,
        "stockQuantity": 300
      }},
      {{
        "productName": "Ultra HD 4K Webcam",
        "price": 89.00,
        "stockQuantity": 75
      }}
    ]`,
  },
];
