import React, {FormEvent, useState} from 'react';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import {RouteComponentProps, withRouter} from "react-router";
import {FormControlProps} from "react-bootstrap";

type Props = RouteComponentProps;

const SearchC = ({history}: Props) => {
    const [value, setValue] = useState<string>('');

    const handleClick = (e: FormEvent<FormControlProps>) => {
        e.preventDefault();
        history.push('/overview/' + value);
    };

    const handleChange = (e: FormEvent<FormControlProps>) => {
        setValue((e.target as HTMLInputElement).value);
    };

    return (
        <React.Fragment>
            <h1> Employee Explorer </h1>
            <Form>
                <Form.Control type="text" placeholder="Enter employee name" value={value} onChange={handleChange}/>
                <Button variant="primary" type="submit" onClick={handleClick} disabled={!value.length}>
                    Search
                </Button>
            </Form>
        </React.Fragment>
    );
};

export const Search = withRouter(SearchC);
