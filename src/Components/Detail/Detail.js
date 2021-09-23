import { Button, CircularProgress, Fade, IconButton, LinearProgress, Paper } from '@material-ui/core';
import HighlightOffRoundedIcon from '@material-ui/icons/HighlightOffRounded';
import React, { useState, useEffect } from 'react';
import { Redirect, useParams } from 'react-router';
import "./Detail.css"
import getVideoId from 'get-video-id';
import YouTube from 'react-youtube';
import Related from './Related';
import { Link } from 'react-router-dom';
import { Alert, Rating } from '@material-ui/lab';
import Recomended from './Recomended';

const Detail = () => {
    const [animedata, setanimedata] = useState()
    const [recommendations, setrecomendations] = useState()
    const [show, setshow] = useState();
    const [NumberOfRecommended, setNumberOfRecommended] = useState(4);
    const [id, setid] = useState()
    const [displa, setdispla] = useState(true)
    const [dis, setdis] = useState(false)
    const ID = useParams()
    const opts = {
        playerVars: {
            autoplay: 0,
        }
    }
    useEffect(async () => {
        if (ID.type === "manga") {
            setshow("false")
            setanimedata(undefined)
            await fetch(`https://api.jikan.moe/v3/manga/${ID.id}`).then(response => response.json()).then((data) => { setanimedata(data) })
            setshow("true")

        }
        else if (ID.type === "anime") {
            await setshow("false")
            setanimedata(undefined)
            await fetch(`https://api.jikan.moe/v3/anime/${ID.id}`)
                .then(response => response.json())
                .then((data) => {
                    setanimedata(data)
                    if (data.trailer_url != null) {
                        const ida = getVideoId(data.trailer_url)
                        setid(ida.id)
                    }
                })
            await fetch(`https://api.jikan.moe/v3/anime/${ID.id}/recommendations`)
                .then(response => response.json())
                .then((data) => { setrecomendations(data.recommendations) })
            setshow("true")
        }
    }, [ID]);
    const loadmore = () => {
        setdis(true)
        setNumberOfRecommended(NumberOfRecommended + 4)
        setTimeout(() => { setdis(false) }, 2000);
    }
    return (
        <div className="Main">
            <Fade in={displa} timeout={2000} >
                <Alert className="sti" variant="filled" severity="warning" color="info" action={
                    <IconButton
                        aria-label="close"
                        color="inherit"
                        size="large"
                        onClick={() => { setdispla(false) }}>
                        <HighlightOffRoundedIcon fontSize="inherit" />
                    </IconButton>
                }>DATA MIGHT LOAD SLOW DUE TO SERVER CONECTIVITY</Alert>
            </Fade>
            <Paper elevation={3} className="main_content">
                {show === "true" ? (
                    ID.type === "anime" ? (
                        animedata !== undefined ? (
                            <div className="mai" >
                                {ID.ratting !== undefined ? (
                                    ID.ratting > 10 ? (
                                        <Redirect to="/" />
                                    ) : ""
                                ) : ("")}
                                <h1 className="title">
                                    {animedata.title_english || animedata.title}
                                </h1>
                                <img src={animedata.image_url} alt={animedata.title_english || "N/A"} />
                                {animedata.score !== undefined ? (
                                    <Rating size="large" name="read-only" value={ID.ratting || animedata.score / 2} className="star" readOnly />
                                ) : ("")}
                                <Paper className="detail" elevation={3}>

                                    {animedata.aired === "undefined" ? animedata.aired.string !== "undefined" ? (<h6>Aired: {animedata.aired.string || "N/A"} </h6>) : ("") : ("")}

                                    <h6 className="detail_main">Status<h2> {animedata.status || "N/A"}</h2> </h6>
                                    <h6 className="detail_main">Duration<h2> {animedata.duration || "N/A"}</h2> </h6>
                                    <h6 className="detail_main">Age Rating<h2> {animedata.rating || "N/A"}</h2> </h6>
                                    <h6 className="detail_main">Source<h2> {animedata.source || "N/A"}</h2> </h6>
                                    <h6 className="detail_main">Episodes<h2> {animedata.episodes || "N/A"}</h2> </h6>
                                </Paper>
                                <h4 className="summary" >
                                    <span>{animedata.synopsis}</span>
                                </h4>
                                <div className="main_genre">
                                    <Paper className="lol" elevation={3}>
                                        <h1>Genres</h1>
                                        <h5 className="genre_main">
                                            {animedata.genres.map((index) => <Link to={`/genres/${index.name}`} className="genre" >{index.name}</Link>)}
                                        </h5>
                                    </Paper>
                                </div>
                                {animedata.trailer_url != null ? (
                                    <YouTube className="youtube" videoId={id} opts={opts} />
                                ) : ("Trailer Not Available")
                                }
                                <div className="related">
                                    <h2 className="relate" >
                                        {animedata.related['Adaptation'] != null ? (
                                            <div className="widiget">
                                                <h2>ADAPTATION</h2>
                                                <h3 className="widgetInner">
                                                    {animedata.related['Adaptation'].map((index) =>
                                                        <Related classname="rela" data={index} key={index.mal_id} />)}
                                                </h3>
                                            </div>
                                        ) : ("")}
                                        {animedata.related['Side story'] != null ? (
                                            <div className="widiget">
                                                <h2>SIDE STORY</h2>
                                                <h3 className="widgetInner">{animedata.related['Side story'].map((index) =>
                                                    <Related classname="rela" data={index} key={index.mal_id} />)}
                                                </h3>
                                            </div>
                                        ) : ("")}
                                        {animedata.related['Parent story'] != null ? (
                                            <div className="widiget">
                                                <h2>PARENT STORY</h2>
                                                <h3 className="widgetInner" >
                                                    {animedata.related['Parent story'].map((index) =>
                                                        <Related classname="rela" data={index} key={index.mal_id} />)}
                                                </h3>
                                            </div>
                                        ) : ("")}
                                        {animedata.related['Sequel'] != null ? (
                                            <div className="widiget">
                                                <h2>SEQUEL</h2>
                                                <h3 className="widgetInner" >
                                                    {animedata.related['Sequel'].map((index) =>
                                                        <Related classname="rela" data={index} key={index.mal_id} />)}
                                                </h3>
                                            </div>
                                        ) : ("")}
                                        {animedata.related['Prequel'] != null ? (
                                            <div className="widiget">
                                                <h2>PREQUEL</h2>
                                                <h3 className="widgetInner" >
                                                    {animedata.related['Prequel'].map((index) =>
                                                        <Related classname="rela" data={index} key={index.mal_id} />)}
                                                </h3>
                                            </div>
                                        ) : ("")}
                                    </h2>
                                    {recommendations !== undefined ? (
                                        <div className="widiget">
                                            <h2>SIMILAR</h2>
                                            <h3 className="XX" >
                                                {recommendations.map((item, index) =>
                                                    index < NumberOfRecommended && (
                                                        <Recomended data={item} key={index} />))}
                                            </h3>
                                        </div>
                                    ) : (
                                        <CircularProgress size="100px" />
                                    )}
                                </div>
                                {dis === false ? (
                                    <Button onClick={loadmore} variant="contained" color="primary">LOAD MORE</Button>
                                ) : (
                                    <CircularProgress size="50px" />
                                )}
                            </div>
                        ) : ("")
                    ) :
                        ID.type === "manga" ?
                            animedata.published !== undefined ? (
                                <div className="mai" >
                                    <h1 className="title">
                                        {animedata.title_english || animedata.title}
                                    </h1>
                                    <img src={animedata.image_url} alt={animedata.title_english} />
                                    <Rating size="large" className="star" name="read-only" value={ID.score || animedata.score / 2} readOnly />
                                    <Paper className="detail" elevation={3}>
                                        <h6 className="detail_main">Published<h2> {animedata.published.string}</h2> </h6>
                                        <h6 className="detail_main">Status <h2>{animedata.status || "N/A"} </h2></h6>
                                        <h6 className="detail_main">Chapters <h2>{animedata.chapters || 0} </h2></h6>
                                        <h6 className="detail_main">Volumes <h2>{animedata.volumes || 0}</h2> </h6>
                                    </Paper>
                                    <h4 className="summary" >
                                        <span>{animedata.synopsis}</span>
                                    </h4>
                                    <div className="related">
                                        <h2 className="relate" >
                                            {animedata.related['Adaptation'] != null ? (
                                                <div className="widiget">
                                                    <h2>ADAPTATION</h2>
                                                    <h3 className="widgetInner">
                                                        {animedata.related['Adaptation'].map((index) =>
                                                            <Related data={index} key={index.mal_id} />)}
                                                    </h3>
                                                </div>
                                            ) : ("")}
                                            {animedata.related['Side story'] != null ? (
                                                <div className="widiget">
                                                    <h2>SIDE STORY</h2>
                                                    <h3 className="widgetInner">
                                                        {animedata.related['Side story'].map((index) =>
                                                            <Related data={index} key={index.mal_id} />)}
                                                    </h3>
                                                </div>
                                            ) : ("")}
                                            {animedata.related['Parent story'] != null ? (
                                                <div className="widiget">
                                                    <h2>PARENT STORY</h2>
                                                    <h3 className="widgetInner">
                                                        {animedata.related['Parent story'].map((index) =>
                                                            <Related data={index} key={index.mal_id} />)}
                                                    </h3>
                                                </div>
                                            ) : ("")}
                                            {animedata.related['Sequel'] != null ? (
                                                <div className="widiget">
                                                    <h2>SEQUEL</h2>
                                                    <h3 className="widgetInner" >
                                                        {animedata.related['Sequel'].map((index) =>
                                                            <Related data={index} key={index.mal_id} />)}
                                                    </h3>
                                                </div>
                                            ) : ("")}
                                            {animedata.related['Prequel'] != null ? (
                                                <div className="widiget">
                                                    <h2>PREQUEL</h2>
                                                    <h3 className="widgetInner" >
                                                        {animedata.related['Prequel'].map((index) =>
                                                            <Related data={index} key={index.mal_id} />)}
                                                    </h3>
                                                </div>
                                            ) : ("")}
                                        </h2>
                                    </div>
                                </div>
                            ) : ("")
                            : (<div>
                                <LinearProgress />
                                <Button>
                                    <Link to="/">
                                        Go Back Home
                                    </Link>
                                </Button>
                            </div>))
                    : (<div>
                        <LinearProgress />
                        <Button>
                            <Link to="/">
                                Go Back Home
                            </Link>
                        </Button>
                    </div>)
                }
            </Paper>
        </div >
    );
}

export default Detail;
