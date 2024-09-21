import React from "react";
import ReactDOM from "react-dom";

import { DataTable } from "./data-table-nathalie";
import { Column } from "./lib/types";

// Données fictives pour tester le tableau
const Employee: Record<string, string>[] = [
  {
    firstName: "John",
    lastName: "Doe",
    startDate: "2021-01-01",
    department: "Engineering",
    dateOfBirth: "1990-01-01",
    street: "123 Main St",
    city: "Anytown",
    state: "CA",
    zipCode: "12345",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    startDate: "2020-05-15",
    department: "Marketing",
    dateOfBirth: "1985-07-11",
    street: "456 Maple Dr",
    city: "Othertown",
    state: "NY",
    zipCode: "67890",
  },
];

const columns: Column[] = [
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

const Demo = () => (
  <div>
    <h1>Employee DataTable Demo</h1>
    <DataTable columns={columns} data={Employee} />
  </div>
);

ReactDOM.render(<Demo />, document.getElementById("root"));

export default Demo;
