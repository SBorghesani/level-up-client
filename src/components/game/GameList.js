import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { getGames } from "./GameManager.js"
import "./GameList.css"

export const GameList = (props) => {
    const history = useHistory()
    const [games, setGames] = useState([])

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>
            {
                games.map(game => {
                    return <section key={`game--${game.id}`} className="game">
                        <div className="game__title">{game.title} by {game.maker}</div>
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__skillLevel">Skill level is {game.skill_level}</div>
                        <div>
                            <button className="btn-edit" onClick={() => history.push(`/games/edit/${game.id}`)}>Edit</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}
