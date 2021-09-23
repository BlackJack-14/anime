import React from 'react';
import { Redirect, useParams } from 'react-router';

const Redirection = () => {
    const id = useParams()
    return (
        <div>
            <Redirect to={`/genres/${id.name}`} />
        </div>
    );
}

export default Redirection;
