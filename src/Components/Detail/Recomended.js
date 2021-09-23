
import React, { useEffect, useState } from 'react'
import Widget from '../Widget/Widget'
import "./Related.css"
export default function Recomended({ data }) {
    const [content, setcontent] = useState()
    const fetchd = () => {
        setTimeout(() => {
            setTimeout(async () => {
                const a = await fetch(`https://api.jikan.moe/v3/anime/${data.mal_id}`)
                if (a.ok) {
                    const b = await a.json()
                    setTimeout(() => { "" }, 1000);
                    const cont = <Widget data={b} ok="false" genre="yes" />
                    setcontent(cont)
                }
                else if (!a.ok) {
                    setTimeout(() => { setTimeout(() => { fetchd() }, 3000) }, 2000);
                }
            }, 5000)
        }, 1000);
    }
    useEffect(async () => {
        setTimeout(() => {
            fetchd()
        }, 800);
    }, [data.mal_id]);
    return (
        <span className="contentxx">
            {content}
        </span>
    )
}
