import { Paper, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@material-ui/lab';
import "./Related.css";

const Related = ({ data }) => {
    const [DATA, setDATA] = useState()
    const [content, setcontent] = useState()
    const fetching = () => {
        if (data.type === "anime") {
            setTimeout(async () => {
                const a = await fetch(`https://api.jikan.moe/v3/anime/${data.mal_id}`)
                if (a.ok) {
                    const b = await a.json()
                    setDATA(b)
                    setTimeout(() => { "" }, 1000);
                    const cont = <span><img className="Image" src={b.image_url} alt={b.english_title} />
                        <Rating className="star" size="large" name="read-only" value={b.score / 2} readOnly />
                        <h4 className="title">{data.name}</h4>
                        <h5>Type: {data.type}</h5>
                        {b.episodes !== undefined ? (
                            <h5>Episodes: {b.episodes}</h5>
                        ) :
                            b.volumes !== undefined ? (
                                <h5>Volumes: {b.volumes}</h5>
                            ) : ("")
                        }
                        {b.aired !== undefined ? (
                            <h5 className="Date" >{b.aired.string || "na"}</h5>
                        ) : b.published !== undefined ? (
                            <h5 className="Date" >{b.published.string || "na"}</h5>
                        ) : ("")
                        }</span>
                    setcontent(cont)
                }
                else if (!a.ok) {
                    setTimeout(() => { fetching() }, 3000);
                }
            }, 5000);

        }
        else {
            setTimeout(async () => {
                const a = await fetch(`https://api.jikan.moe/v3/manga/${data.mal_id}`)
                if (a.ok) {
                    const b = await a.json()
                    setTimeout(() => { "" }, 1000);
                    const cont = <span><img className="Image" src={b.image_url} alt={b.english_title} />
                        <Rating className="star" size="large" name="read-only" value={b.score / 2} readOnly />
                        <h4 className="title">{data.name}</h4>
                        <h5>Type: {data.type}</h5>
                        {b.episodes !== undefined ? (
                            <h5>Episodes: {b.episodes}</h5>
                        ) :
                            b.volumes !== undefined ? (
                                <h5>Volumes: {b.volumes}</h5>
                            ) : ("")
                        }
                        {b.aired !== undefined ? (
                            <h5 className="Date" >{b.aired.string || "na"}</h5>
                        ) : b.published !== undefined ? (
                            <h5 className="Date" >{b.published.string || "na"}</h5>
                        ) : ("")
                        }</span>
                    setcontent(cont)
                    setDATA(b)
                }
                else if (!a.ok) {
                    setTimeout(() => { setTimeout(() => { fetching() }, 3000) }, 3000);
                }
            }, 5000);
        }

    }
    useEffect(async () => {
        fetching()
    }, [data.mal_id])

    return (
        <Paper className="paper" elevation={3}>
            {DATA !== undefined ? (
                data.type === "anime" ? (
                    <Link className="Link" to={`/detail/${data.type}/${data.mal_id}`}>
                        {content}
                    </Link>
                ) : (
                    <Link className="Link" to={`/detail/manga/${data.mal_id}`}>
                        {content}
                    </Link>
                )
            ) : (
                <CircularProgress className="progress" size="100px" />
            )}
        </Paper>
    );
}

export default Related;
