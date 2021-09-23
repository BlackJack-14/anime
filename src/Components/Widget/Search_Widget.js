import { LinearProgress } from '@material-ui/core';
import Search from '../SearchBar/Search';
import React, { useEffect } from 'react';
import ContentWidget from './Content-Widget';
import { useParams } from 'react-router';

const SearchWidget = ({ SearchData, suggest, Input, usePathname, setInput, Anime_Data, Top_Data }) => {
    const x = useParams()
    const y = usePathname()
    useEffect(async () => {
        await setInput(x.input)
        await setTimeout(() => { }, 2000)
        SearchData()
    }, [y])

    return (
        <div>
            <Search input={Input} location={usePathname()} setinput={setInput} />
            {Anime_Data !== undefined ?
                (
                    <ContentWidget input={Input} Data={Anime_Data} search="true" suggest="false" />
                ) : ("")}
            {Top_Data !== undefined ?
                (
                    <ContentWidget Data={Top_Data} search="false" suggest="false" />
                ) : (
                    <LinearProgress />
                )}
            {suggest !== undefined ?
                (
                    <ContentWidget Data={suggest} suggest="true" search="false" />
                ) : (
                    <LinearProgress />
                )}
        </div>
    );
}

export default SearchWidget;
