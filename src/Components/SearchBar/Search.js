import { AppBar, Toolbar, IconButton, Typography, InputBase } from '@material-ui/core';
import React, { useState } from 'react';
import { Link } from "react-router-dom";
import "./Search.css";
import SearchIcon from '@material-ui/icons/Search';
import { Redirect } from 'react-router';

const Search = ({ input, setinput }) => {
    const [redirect, setredirect] = useState();
    const [inde, setinde] = useState();
    const change = (event) => { setinde(event.target.value) }
    const submit = async (event) => {
        event.preventDefault()
        await setinput(inde)
        setredirect('True')
        setTimeout(() => { }, 1000);
    }
    return (
        <AppBar className="App_Header" color="secondary" position="sticky" >
            <Toolbar className="App_Header" >
                <Typography className="Title">
                    <Link className="Link" to="/">Anime Life</Link>
                </Typography>
                <div className="Search">
                    <form onSubmit={event => submit(event)}>
                        <InputBase value={inde} onChange={event => change(event)} className="App_Input" />
                        <IconButton disabled={!inde} type="submit" >
                            <SearchIcon className="icon" />
                        </IconButton>
                    </form>
                    {redirect === 'True' ? (
                        <Redirect to={`/Search/${input}`} />
                    ) : ("")}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Search;
