import React, {useEffect, useState} from 'react';
import {RouteComponentProps} from "react-router";
import getAllSubordinates from "../api/Employees";

interface MatchParams {
    name: string;
}

interface Props extends RouteComponentProps<MatchParams>{}

const EmployeeList = (props: Props) => {
    const [subordinates, setSubordinates] = useState<string[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getAllSubordinates(props.match.params.name)
            .then(subs => {
                setSubordinates(subs);
                setLoading(false);
            });
    }, [props.match.params.name]);

    const renderList = () => {
        return subordinates.length
            ? subordinates.map((sub: string, i) => <p key={i}> {sub} </p>)
            : <p> No subordinates have been found </p>
    };

    return (
        <React.Fragment>
            <h1> Employee overview </h1>
            <h3> Subordinates of employee {props.match.params.name}: </h3>
            <div>
                {loading
                    ? <p> Please wait, loading list... </p>
                    : renderList()
                }
            </div>
        </React.Fragment>
    );
};

export default EmployeeList;
