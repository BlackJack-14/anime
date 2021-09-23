import { Paper, CircularProgress } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Widget.css";
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

const Widget = ({ data, ok, genre }) => {
    const [Suggest, setSuggest] = useState()
    useEffect(async () => {
        setSuggest(undefined)
        setTimeout(() => { "" }, 1000)
        const fetching = async () => {
            setSuggest(undefined)
            if (ok === "true") {
                setSuggest(undefined)
                setTimeout(async () => {
                    const a = await fetch(`https://api.jikan.moe/v3/anime/${data.id}`, { timeout: 2000 })
                    const b = await a.json()
                    if (a.ok) {
                        setTimeout(() => { "" }, 1000)
                        const c = await b
                        setSuggest(c)
                    }
                    else if (!a.ok) {
                        setTimeout(() => { fetching() }, 1000);
                    }
                }, 4000);
            }
        }
        fetching()
    }, []);

    return (
        <div>
            {ok === "true" ?
                Suggest !== undefined ?
                    Suggest.image_url !== undefined ? (
                        <Link className="link" to={`/Suggested/anime/${data.ratting}/${data.id}`}>
                            <Paper className="main" elevation={3} >
                                <img src={Suggest.image_url} alt={`Poster of ${Suggest.title}` || "DATA UNAVAILABLE"} />
                                {Suggest.title_english || Suggest.title || "DATA UNAVAILABLE"}
                                <h5 className="epp" >Episodes: {Suggest.episodes}</h5>
                                <h5>{Suggest.rated === "G" ?
                                    ("Age Rating: All Ages")
                                    : Suggest.rated === "pg" ?
                                        ("Age Rating: Children")
                                        : Suggest.rated === "R" ?
                                            ("Age Rating: 17+")
                                            : Suggest.rated === "R+" ?
                                                ("Age Rating: 18+")
                                                : Suggest.rated === "Rx" ?
                                                    ("Age Rating: 18+")
                                                    : ""}</h5>
                                <StarRatings
                                    rating={data.ratting / 2}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="22px"
                                    starSpacing="2px"
                                />
                            </Paper>
                        </Link>

                    ) : (
                        <Link className="link" to={""}>
                            <Paper className="main" elevation={3} >
                                <h2>Failed Loading data please reload</h2>
                                <CircularProgress size="80px" />
                            </Paper>
                        </Link>
                    ) : (
                        <Link className="link" to={""}>
                            <Paper className="main" elevation={3} >
                                {console.log(Suggest)}
                                <CircularProgress size="100px" />
                            </Paper>
                        </Link>
                    )
                : genre === "yes" ? (
                    data !== undefined ? (
                        <Link className="linkm" to={`/detail/anime/${data.mal_id}`}>
                            <Paper className="mainm" elevation={3} >
                                <img className="imagem" src={data.image_url} alt={`Poster of ${data.title}`} />
                                {data.title}
                                <h5 className="epp" >Episodes: {data.episodes}</h5>
                                <h6>{data.r18 === true ? ("Age Rating: 18+") : ""}</h6>
                                <StarRatings
                                    rating={data.score / 2}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="22px"
                                    starSpacing="2px"
                                />
                            </Paper>
                        </Link>
                    ) : (<CircularProgress size="medium" />))
                    : (
                        <Link className="link" to={`/detail/anime/${data.mal_id}`}>
                            <Paper className="main" elevation={3} >
                                <img src={data.image_url} alt={`Poster of ${data.title}`} />
                                {data.title}
                                <h5 className="epp" >Episodes: {data.episodes}</h5>
                                <h5>{data.rated === "G" ?
                                    ("Age Rating: All Ages")
                                    : data.rated === "pg" ?
                                        ("Age Rating: Children")
                                        : data.rated === "R" ?
                                            ("Age Rating: 17+")
                                            : data.rated === "R+" ?
                                                ("Age Rating: 18+")
                                                : data.rated === "Rx" ?
                                                    ("Age Rating: 18+")
                                                    : ""}</h5>
                                <StarRatings
                                    rating={data.score / 2}
                                    starRatedColor="gold"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="22px"
                                    starSpacing="2px"
                                />
                            </Paper>
                        </Link>
                    )}
        </div>
    );
}

export default Widget;
