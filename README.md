My work of a datatable plugin for OpenClassroom's jQuery -> REACT convesion project.

DataTable Component - React Plugin
This is a flexible and reusable React component that allows users to display tabular data with features such as pagination, sorting, and searching. The plugin was developed as part of the OpenClassrooms project to convert a jQuery plugin into React.

Description
The DataTable component is designed to handle large datasets efficiently, offering features like customizable columns, dynamic search, and pagination. It is easy to integrate into any React project and allows for full control over the data rendering.

Features
Pagination: Navigate through large datasets by controlling the number of entries per page.
Sorting: Sort data by clicking on any column header.
Searching: Filter table data dynamically through a search input field.
Column Customization: Define which data fields to display in the table.
Accessibility: The component follows accessibility standards, ensuring proper labels for form elements.
Installation
To use the DataTable component in your project, you can install it via npm:

```bash
npm install data-table-nathalie
```

## How to used

```jsx
import { DataTable } from "data-table-nathalie";

const MyComponent: React.FC = () => {
    const columns = [
        { title: "First Name", field: "firstName" },
        { title: "Last Name", field: "lastName" },
        { title: "Start Date", field: "startDate" },
        { title: "Department", field: "department" },
        { title: "Date of Birth", field: "dateOfBirth" },
        { title: "Street", field: "street" },
        { title: "City", field: "city" },
        { title: "State", field: "state" },
        { title: "Zip Code", field: "zipCode" },
    ];

    const employees = [
      { firstName: "John", lastName: "Doe", startDate: "01/01/2020", department: "HR", dateOfBirth: "01/01/1990", street: "123 Main St", city: "Anytown", state: "CA", zipCode: "12345" },
      // More employee objects...
    ];

    return (
        <DataTable
            columns={columns}
            data={employees}
        />
    );
}

export default MyComponent;

```

If you use Typescript, be sure to convert your data array to an simple object

```jsx
<DataTable
  columns={columns}
  data={employees.map((employee) => ({ ...employee }))}
/>
```

Props
columns (required)
An array of objects defining the columns for the table.

```jsx
{
  title: string; // Column header name
  field: string; // Data field associated with this column
}
```

data (required)
An array of objects containing the data to be displayed in the table.

```jsx
{
  [key: string]: string | number;   // Key-value pairs matching column field names
}
```

Accessibility (a11y)
The component includes appropriate label elements for the search input and select elements, ensuring compliance with accessibility standards. The DataTable ensures all interactive elements are keyboard-navigable and screen reader-friendly.

Changelog
v1.0.1: Improved accessibility by adding labels to form elements (select and input).
v1.0.0: Initial release of data-table-nathalie.
