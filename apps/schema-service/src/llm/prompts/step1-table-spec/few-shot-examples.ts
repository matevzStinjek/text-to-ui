export const tableSpecExamples = [
  {
    userInput: "build me a crm table",
    output: `{{
      "tableTitle": "CRM Opportunities",
      "requestedRowCount": 10,
      "columns": [
        {{ "id": "dealName", "header": "Deal Name", "dataType": "text", "isNameColumn": true }},
        {{ "id": "companyName", "header": "Company", "dataType": "text" }},
        {{ "id": "stage", "header": "Stage", "dataType": "status", "icon": "BarChartIcon" }},
        {{ "id": "value", "header": "Value", "dataType": "number" }},
        {{ "id": "expectedCloseDate", "header": "Expected Close Date", "dataType": "date" }},
        {{ "id": "assignee", "header": "Assignee", "dataType": "text", "icon": "UserIcon" }}
      ],
      "actions": [
        {{ "id": "viewOpportunity", "label": "View", "icon": "EyeIcon" }},
        {{ "id": "editOpportunity", "label": "Edit", "icon": "PencilIcon" }},
        {{ "id": "logActivity", "label": "Log Activity", "icon": "PlusCircleIcon" }}
      ],
      "userPromptAnalysis": {{
        "originalPrompt": "build me a crm table",
        "inferredColumns": ["dealName", "companyName", "stage", "value", "expectedCloseDate", "assignee"],
        "specificRequestsHandled": []
      }},
      "requestMockData": true,
      "mockDataDetails": "Sales opportunities for a B2B software company, including deal stages like 'Prospecting' (MapPinIcon), 'Qualification' (SearchIcon), 'Proposal' (FileTextIcon), 'Closed Won' (CheckCircleIcon), 'Closed Lost' (XCircleIcon). Deals with values over 100,000 should have a DollarSignIcon."
    }}`,
  },
  {
    userInput:
      "Table with 5 rows displaying company documents. Each table item should contain documents' names, dates when they was added and actions to delete them. the icon for name should be a star",
    output: `{{
      "tableTitle": "Company Documents",
      "requestedRowCount": 5,
      "columns": [
        {{ "id": "documentName", "header": "Document Name", "dataType": "text", "isNameColumn": true, "icon": "StarIcon" }},
        {{ "id": "dateAdded", "header": "Date Added", "dataType": "date" }},
        {{ "id": "fileType", "header": "File Type", "dataType": "text", "icon": "FileIcon" }},
        {{ "id": "lastModifiedBy", "header": "Last Modified By", "dataType": "text" }}
      ],
      "actions": [
        {{ "id": "deleteDocument", "label": "Delete", "icon": "TrashIcon" }},
        {{ "id": "downloadDocument", "label": "Download", "icon": "DownloadIcon" }},
        {{ "id": "viewDetails", "label": "Details", "icon": "InfoIcon" }}
      ],
      "userPromptAnalysis": {{
        "originalPrompt": "Table with 5 rows displaying company documents. Each table item should contain documents' names, dates when they was added and actions to delete them. the icon for name should be a star",
        "inferredColumns": ["fileType", "lastModifiedBy"],
        "specificRequestsHandled": ["row count set to 5", "name column icon is 'StarIcon'", "delete action added", "dateAdded column added"]
      }},
      "requestMockData": true,
      "mockDataDetails": "Various company documents such as 'Q1 Financial Report.pdf' (FileTextIcon), 'Marketing Strategy Q3.docx' (FileIcon), 'Employee Handbook.pdf' (BookIcon). PDF files should have FileTextIcon, DOCX should have FileIcon, XLSX should have BarChartIcon, PPTX should have BarChart2Icon."
    }}`,
  },
  {
    userInput:
      "Show me my top 10 tasks for today. Include priority, due date, and an option to mark as complete. Priority should have an icon.",
    output: `{{
      "tableTitle": "Today's Top 10 Tasks",
      "requestedRowCount": 10,
      "columns": [
        {{ "id": "taskDescription", "header": "Task", "dataType": "text", "isNameColumn": true }},
        {{ "id": "priority", "header": "Priority", "dataType": "status", "icon": "FlagIcon" }},
        {{ "id": "dueDate", "header": "Due Date", "dataType": "date" }},
        {{ "id": "project", "header": "Project", "dataType": "text" }}
      ],
      "actions": [
        {{ "id": "markComplete", "label": "Mark Complete", "icon": "CheckSquareIcon" }},
        {{ "id": "editTask", "label": "Edit", "icon": "PencilIcon" }},
        {{ "id": "viewTask", "label": "View Details", "icon": "EyeIcon" }}
      ],
      "userPromptAnalysis": {{
        "originalPrompt": "Show me my top 10 tasks for today. Include priority, due date, and an option to mark as complete. Priority should have an icon.",
        "inferredColumns": ["project"],
        "specificRequestsHandled": ["row count set to 10", "priority column has icon", "due date column added", "mark as complete action added"]
      }},
      "requestMockData": true,
      "mockDataDetails": "Project tasks with priorities like 'High' (AlertTriangleIcon), 'Medium' (AlertCircleIcon), 'Low' (CircleIcon). Due dates should be today. Example tasks: 'Finalize report presentation', 'Client follow-up call'. Overdue tasks should display a ClockIcon with the date."
    }}`,
  },
  {
    userInput:
      "List of users with their email and role. Add edit and delete buttons. Usernames should have a little person icon.",
    output: `{{
      "tableTitle": "User List",
      "requestedRowCount": 7,
      "columns": [
        {{ "id": "userName", "header": "Username", "dataType": "text", "isNameColumn": true, "icon": "UserIcon" }},
        {{ "id": "emailAddress", "header": "Email Address", "dataType": "text" }},
        {{ "id": "role", "header": "Role", "dataType": "text" }},
        {{ "id": "lastLogin", "header": "Last Login", "dataType": "date" }}
      ],
      "actions": [
        {{ "id": "editUser", "label": "Edit", "icon": "UserEditIcon" }},
        {{ "id": "deleteUser", "label": "Delete", "icon": "UserMinusIcon" }},
        {{ "id": "resetPassword", "label": "Reset Password", "icon": "KeyIcon" }}
      ],
      "userPromptAnalysis": {{
        "originalPrompt": "List of users with their email and role. Add edit and delete buttons. Usernames should have a little person icon.",
        "inferredColumns": ["lastLogin"],
        "specificRequestsHandled": ["username column has 'UserIcon'", "email and role columns added", "edit and delete actions added"]
      }},
      "requestMockData": true,
      "mockDataDetails": "User accounts with roles like 'Admin' (ShieldIcon), 'Editor' (PencilIcon), 'Viewer' (EyeIcon). Usernames are typical usernames, emails are valid email formats, last login dates are recent. Users who haven't logged in for more than a week should show an AlertCircleIcon with the date."
    }}`,
  },
  {
    userInput: "I need a simple table of 3 products: name and price. Action to add to cart.",
    output: `{{
      "tableTitle": "Product Listing",
      "requestedRowCount": 3,
      "columns": [
        {{ "id": "productName", "header": "Product Name", "dataType": "text", "isNameColumn": true }},
        {{ "id": "price", "header": "Price", "dataType": "text" }}
      ],
      "actions": [
        {{ "id": "addToCart", "label": "Add to Cart", "icon": "ShoppingCartIcon" }}
      ],
      "userPromptAnalysis": {{
        "originalPrompt": "I need a simple table of 3 products: name and price. Action to add to cart.",
        "specificRequestsHandled": ["row count set to 3", "name and price columns added", "add to cart action added"]
      }},
      "requestMockData": true,
      "mockDataDetails": "Consumer products with names and prices, e.g., 'Wireless Headphones' (HeadphonesIcon), 'Coffee Maker' (CoffeeIcon), 'Yoga Mat'. Products on sale should show a TagIcon next to the price."
    }}`,
  },
];
