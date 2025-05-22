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
      "mockDataDetails": "Sales opportunities for a B2B software company. Deal stages: 'Prospecting' (MapPinIcon), 'Qualification' (SearchIcon), 'Proposal' (FileTextIcon), 'Negotiation' (HandshakeIcon), 'Closed Won' (CheckCircleIcon), 'Closed Lost' (XCircleIcon). Value is a numerical amount representing deal size."
    }}`,
    output: `[
      {{
        "dealName": {{ "value": "Project Phoenix Implementation" }},
        "companyName": {{ "value": "Innovatech Solutions" }},
        "stage": {{ "value": "Proposal", "icon": "FileTextIcon" }},
        "value": {{ "value": 85000 }},
        "expectedCloseDate": {{ "value": "2025-08-10" }}
      }},
      {{
        "dealName": {{ "value": "Synergy Platform Upgrade" }},
        "companyName": {{ "value": "Global Connect Corp" }},
        "stage": {{ "value": "Negotiation", "icon": "HandshakeIcon" }},
        "value": {{ "value": 150000 }},
        "expectedCloseDate": {{ "value": "2025-07-25" }}
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
      "mockDataDetails": "Company documents. PDF files should have FileTextIcon, DOCX files should have FileIcon, XLSX files should have BarChartIcon, and PPTX files should have BarChart2Icon."
    }}`,
    output: `[
      {{
        "documentName": {{ "value": "Q2 Financial Summary.xlsx", "icon": "BarChartIcon" }},
        "dateAdded": {{ "value": "2025-04-18" }},
        "fileType": {{ "value": "XLSX", "icon": "TableIcon" }}
      }},
      {{
        "documentName": {{ "value": "Annual Marketing Strategy.pptx", "icon": "BarChart2Icon" }},
        "dateAdded": {{ "value": "2025-01-20" }},
        "fileType": {{ "value": "PPTX", "icon": "PresentationIcon" }}
      }},
      {{
        "documentName": {{ "value": "Employee Onboarding Guide.pdf", "icon": "FileTextIcon" }},
        "dateAdded": {{ "value": "2024-11-05" }},
        "fileType": {{ "value": "PDF", "icon": "FileIcon" }}
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
      "mockDataDetails": "Project tasks with priorities: 'High' (AlertTriangleIcon), 'Medium' (AlertCircleIcon), 'Low' (CircleIcon). Overdue tasks should display a ClockIcon with the date."
    }}`,
    output: `[
      {{
        "taskDescription": {{ "value": "Develop API endpoint for user authentication" }},
        "priority": {{ "value": "High", "icon": "AlertTriangleIcon" }},
        "dueDate": {{ "value": "2025-06-15", "icon": "ClockIcon" }}
      }},
      {{
        "taskDescription": {{ "value": "Update documentation for new feature" }},
        "priority": {{ "value": "Medium", "icon": "AlertCircleIcon" }},
        "dueDate": {{ "value": "2025-06-22", "icon": "ClockIcon" }}
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
      "mockDataDetails": "Consumer electronics products with names like 'Wireless Headphones' (HeadphonesIcon), 'Smart Watch' (SmartphoneIcon), 'Coffee Maker' (CoffeeIcon)."
    }}`,
    output: `[
      {{
        "productName": {{ "value": "Wireless Noise-Cancelling Headphones", "icon": "HeadphonesIcon" }},
        "price": {{ "value": 249.99 }},
        "stockQuantity": {{ "value": 150 }}
      }},
      {{
        "productName": {{ "value": "Smart Fitness Tracker Watch", "icon": "SmartphoneIcon" }},
        "price": {{ "value": 129.50 }},
        "stockQuantity": {{ "value": 300 }}
      }},
      {{
        "productName": {{ "value": "Professional Coffee Maker", "icon": "CoffeeIcon" }},
        "price": {{ "value": 89.00 }},
        "stockQuantity": {{ "value": 75 }}
      }}
    ]`,
  },
];
