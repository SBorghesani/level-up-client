import React from "react"
import { Route } from "react-router-dom"
import { GameList } from "./game/GameList.js"
import { EventList } from './event/EventList.js'
import { GameForm } from './game/GameForm.js'
import { EventForm } from './event/EventForm.js'
import { Profile } from './auth/Profile.js'

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/events">
                <EventList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <GameForm />
            </Route>
            <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route path="/profile">
                <Profile />
            </Route>
        </main>
    </>
}
