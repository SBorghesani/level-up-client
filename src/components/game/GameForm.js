import React, { useState, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom'
import { createGame, getGameTypes, getGame, updateGame } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()
    const [editMode, toggleEditMode] = useState(false)
    const [gameTypes, setGameTypes] = useState([])
    const [currentGame, setCurrentGame] = useState({})
    const { gameId } = useParams()
    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */

    const getGameToEdit = () => {
        if (gameId) {
            toggleEditMode(true)
            getGame(gameId)
                .then(foundGame => setCurrentGame(foundGame))
        } else {
            setCurrentGame({
                skillLevel: 1,
                numberOfPlayers: 0,
                title: "",
                maker: "",
                gameTypeId: 0
            })
        }
    }
    console.log('gametypes',gameTypes)
    console.log(editMode)
    console.log(currentGame)
    useEffect(() => {
        getGameTypes().then(data => setGameTypes(data))
    }, [])

    useEffect(() => {
        getGameToEdit()
    }, {})

    const handleControlledInputChange = (event) => {
        const newGame = Object.assign({}, currentGame)
        newGame[event.target.name] = event.target.value
        setCurrentGame(newGame)
    }

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">
                {editMode ? 'Edit Game: ' : 'Register New Game: '}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame?.title}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <div className="form-group">
                <label htmlFor="gameType">Game Type: </label>
                <select type="text" name="gameTypeId" className="form-control"
                    placeholder="Game Type"
                    defaultValue="Choose a type of game"
                    onChange={handleControlledInputChange}>
                    <option>Choose a Game Type</option>
                    {
                        gameTypes.map(gt => <option name="gameTypeId" value={gt.id}>{gt.label}</option>)
                    }
                </select>
            </div>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Maker: </label>
                    <input type="text" name="maker" required autoFocus className="form-control"
                        value={currentGame?.maker}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                    defaultValue=
                        {
                            (editMode) ? currentGame.numberOfPlayers : 0
                        }
                        value={currentGame?.numberOfPlayers}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="skillLevel">Skill Level: </label>
                    <input type="number" name="skillLevel" required autoFocus className="form-control"
                        value={currentGame?.skillLevel}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        maker: currentGame.maker,
                        title: currentGame.title,
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        skillLevel: parseInt(currentGame.skillLevel),
                        gameTypeId: parseInt(currentGame.gameTypeId)
                    }
                    // Send POST request to your API
                    {
                        editMode ?
                            updateGame(game, gameId)
                                .then(() => {history.push('/games')})
                            : createGame(game)
                                .then(() => {history.push('/games')})
                    }
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}
