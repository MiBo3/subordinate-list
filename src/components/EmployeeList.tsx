import React from 'react';

interface Props {
    employees: string[];
}

const EmployeeList = (props: Props) => {
    return (
        <div>
            {props.employees.map((employee, i) => {
                return (
                    <p key={i}>{ employee }</p>
                )
            })}
        </div>
    );
};

export default EmployeeList;
