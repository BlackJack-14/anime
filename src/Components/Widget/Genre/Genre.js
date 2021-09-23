import {
    LinearProgress, Select, MenuItem, Paper, Button, Fade, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from '@material-ui/lab';
import Widget from "../Widget"
import "./Genre.css";
const useStyles = makeStyles(() => ({
    backDrop: {
        backdropFilter: "blur(12px)",
        backgroundColor: 'rgba(0,0,30,0.4)'
    },
}));

export default function Genre() {
    const classes = useStyles();
    const ID = useParams()
    const [DATA, setDATA] = useState();
    const [Sort, setSort] = useState()
    const [Open, setOpen] = useState("true")
    const genre = {
        Action: 1,
        Adventure: 2,
        Cars: 3,
        Comedy: 4,
        Dementia: 5,
        Demons: 6,
        Mystery: 7,
        Drama: 8,
        Ecchi: 9,
        Fantasy: 10,
        Game: 11,
        Hentai: 12,
        Historical: 13,
        Horror: 14,
        Kids: 15,
        Magic: 16,
        "Martial-Arts": 17,
        Mecha: 18,
        Music: 19,
        Parody: 20,
        Samurai: 21,
        Romance: 22,
        School: 23,
        "Sci-Fi": 24,
        Shoujo: 25,
        "Shoujo-Ai": 26,
        Shounen: 27,
        "Shounen-Ai": 28,
        Space: 29,
        Sports: 30,
        "Supper-Power": 31,
        Vampire: 32,
        Yaoi: 33,
        Yuri: 34,
        Harem: 35,
        "Slice-Of-Life": 36,
        Suppernatural: 37,
        Military: 38,
        Police: 39,
        Psychological: 40,
        Thriller: 41,
        Seinen: 42,
        Josei: 43
    }
    const yy = [
        { value: "Action" },
        { value: "Adventure" },
        { value: "Cars" },
        { value: "Comedy" },
        { value: "Dementia" },
        { value: "Demons" },
        { value: "Mystery" },
        { value: "Drama" },
        { value: "Ecchi" },
        { value: "Fantasy" },
        { value: "Game" },
        { value: "Hentai" },
        { value: "Historical" },
        { value: "Horror" },
        { value: "Kids" },
        { value: "Magic" },
        { value: "Martial-Arts" },
        { value: "Mecha" },
        { value: "Music" },
        { value: "Parody" },
        { value: "Samurai" },
        { value: "Romance" },
        { value: "School" },
        { value: "Sci-Fi" },
        { value: "Shoujo" },
        { value: "Shoujo-Ai" },
        { value: "Shounen" },
        { value: "Shounen-Ai" },
        { value: "Space" },
        { value: "Sports" },
        { value: "Supper-Power" },
        { value: "Vampire" },
        { value: "Yaoi" },
        { value: "Yuri" },
        { value: "Harem" },
        { value: "Slice-Of-Life" },
        { value: "Suppernatural" },
        { value: "Military" },
        { value: "Police" },
        { value: "Psychological" },
        { value: "Thriller" },
        { value: "Seinen" },
        { value: "Josei" }
    ]
    const y = genre[ID.name]
    const handleClose = () => { setOpen(false) }
    const fetching = async () => {
        setOpen(true)
        setDATA(undefined)
        const a = await fetch(`https://api.jikan.moe/v3/genre/anime/${genre[ID.name]}`)
        if (a.ok) {
            const b = await a.json()
            setDATA(b)
        }
        else if (!a.ok) {
            setTimeout(() => { fetching() }, 2000);
        }
    }
    useEffect(() => {
        fetching()
    }, [ID.name])

    return (
        <Paper className="main_content" elevation={3}>
            <Paper className="main_conten" elevation={3}>
                <h1 className="h1" >Genre :
                    <Select className="kok" value={y - 1} >
                        {yy.map((index, name) => (
                            <MenuItem component={Link} to={`/genres/${index.value}`} key={name} value={name}>
                                {index.value}
                            </MenuItem>
                        ))}
                    </Select>
                </h1>
                <h2 className="h1" >
                    Sort:
                    <Select className="kok" value={Sort} defaultValue={"Relative"} onChange={(event) => { setSort(event.target.value) }}>
                        <MenuItem value="Relative">Relative</MenuItem>
                        <MenuItem value="Default">Most Liked</MenuItem>
                        <MenuItem value="Default-opp">Least Liked</MenuItem>
                        <MenuItem value="New-first">Latest</MenuItem>
                        <MenuItem value="Old-first">Oldest</MenuItem>
                    </Select>
                </h2>
            </Paper>
            {DATA !== undefined ?
                ID.name === "Hentai" ?
                    (<span>
                        <Dialog
                            BackdropProps={{
                                classes: {
                                    root: classes.backDrop,
                                },
                            }}
                            TransitionComponent={Fade}
                            timeout={8000}
                            open={Open}>
                            <DialogTitle>
                                <Alert severity="warning" color="error" variant="filled"><AlertTitle>CONTENT WARNING 18+</AlertTitle></Alert>
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    This page includes 18+ content
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    Yes I am 18 above
                                </Button>
                                <Button>
                                    <Link autoFocus to="/" color="primary">
                                        No I am a minor
                                    </Link>
                                </Button>
                            </DialogActions>
                        </Dialog>
                        {Sort === "Default" ? (
                            <span className="content">
                                {[...DATA.anime].sort((a, b) => { return b.score - a.score }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                            </span>
                        ) :
                            Sort === "Default-opp" ? (
                                <span className="content">
                                    {[...DATA.anime].sort((a, b) => { return a.score - b.score }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                </span>
                            ) :
                                Sort === "New-first" ? (
                                    <span className="content">
                                        {[...DATA.anime].sort((a, b) => { return new Date(b.airing_start) - new Date(a.airing_start) }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>

                                ) : Sort === "Old-first" ? (
                                    <span className="content">
                                        {[...DATA.anime].sort((a, b) => { return new Date(a.airing_start) - new Date(b.airing_start) }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>
                                ) : (
                                    <span className="content">
                                        {DATA.anime.map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>
                                )}
                    </span>
                    ) : (
                        Sort === "Default" ? (
                            <span className="content">
                                {[...DATA.anime].sort((a, b) => { return b.score - a.score }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                            </span>
                        ) :
                            Sort === "Default-opp" ? (
                                <span className="content">
                                    {[...DATA.anime].sort((a, b) => { return a.score - b.score }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                </span>
                            ) :
                                Sort === "New-first" ? (
                                    <span className="content">
                                        {[...DATA.anime].sort((a, b) => { return new Date(b.airing_start) - new Date(a.airing_start) }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>

                                ) : Sort === "Old-first" ? (
                                    <span className="content">
                                        {[...DATA.anime].sort((a, b) => { return new Date(a.airing_start) - new Date(b.airing_start) }).map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>
                                ) : (
                                    <span className="content">
                                        {DATA.anime.map((index) => <Widget ok="false" genre="yes" key={index.rank} data={index} />)}
                                    </span>
                                )
                    ) : (<LinearProgress />)}
        </Paper >
    )
}
