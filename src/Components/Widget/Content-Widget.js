import React from 'react';
import Widget from './Widget';
import "./Top.css"
import { LinearProgress } from '@material-ui/core';

const ContentWidget = ({ Data, search, input, suggest }) => {
    return (
        <div className="Top_main" >
            <h3 className="Heading" >
                {search === 'true' ? (
                    input === "" ? (
                        "Enter Anime Name in Search Field"
                    ) : (
                        `Search Results for ${input}`)
                ) :
                    suggest === 'true' ?
                        ('Suggested Anime By Admin')
                        : ("Top Anime")
                }
            </h3>
            {Data.request_hash !== undefined ? (
                <div className="Content">
                    {search === 'true' ? (
                        <span className="Content" >
                            {Data.results.map((index) => <Widget ok="false" key={index.mal_id} data={index} />)}
                        </span>
                    )
                        : (
                            <span className="Content">
                                {Data.top.map((index) => <Widget ok="false" key={index.rank} data={index} />)}
                            </span>
                        )}
                </div>
            ) : suggest === 'true' ? (
                <span className="Content" >
                    {[...Data].sort((a, b) => { return b.ratting - a.ratting }).map((index) => <Widget ok="true" key={index.id} data={index} />)}
                </span>
            ) : (
                <LinearProgress />
            )}
        </div>
    );
}

export default ContentWidget;
