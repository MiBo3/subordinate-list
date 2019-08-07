import React, {useState} from 'react';
import './App.css';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import EmployeeList from "./components/EmployeeList";
import getAllSubordinates from "./api/Employees";

const App = () => {
    const [value, setValue] = useState<string>('');
    const [employees, setEmployees] = useState<string[] | undefined>(undefined);

    const handleClick = (e: any) => {
        e.preventDefault();
        getAllSubordinates(value)
            .then((data) => setEmployees(data))
            .catch((err) => console.warn(err));
    };

    const handleChange = (e: any) => {
        setValue(e.target.value);
    };

    return (
        <React.Fragment>
            <h1>
                Employee Explorer
            </h1>

            <Form>
                <Form.Control type="text" placeholder="Enter employee name" value={value} onChange={handleChange}/>
                <Button variant="primary" type="submit" onClick={handleClick} disabled={!value.length}>
                    Search
                </Button>
                { employees && (
                    <EmployeeList employees={employees}/>
                )}
            </Form>
        </React.Fragment>
    )
};

export default App;
