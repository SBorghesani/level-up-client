// import React, { useState, useEffect } from "react"
// import { getEvents } from "./EventManager.js"
// import { useHistory } from 'react-router-dom'

// export const EventList = (props) => {
//     const [ events, setEvents ] = useState([])
//     const history = useHistory()

//     useEffect(() => {
//         getEvents().then(data => setEvents(data))
//     }, [])

//     return (
//         <article className="events">
//             <button className="btn btn-2 btn-sep icon-create"
//                 onClick={() => {
//                     history.push({ pathname: "/events/new" })
//                 }}
//             >Register New Event</button>
//             {
//                 events.map(event => {
//                     return <section key={`event--${event.id}`} className="event">
//                         <div className="event__description">{event.description} by {event.organizer.user.first_name}</div>
//                     </section>
//                 })
//             }
//         </article>
//     )
// }

import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { getEvents, joinEvent, leaveEvent } from "./EventManager.js"


export const EventList = () => {
    const history = useHistory()
    const [ events, assignEvents ] = useState([])

    const eventFetcher = () => {
        getEvents()
            .then(data => assignEvents(data))
    }

    useEffect(() => {
        eventFetcher()
    }, [])

    return (
        <article className="events">
            <header className="events__header">
                <h1>Level Up Game Events</h1>
                <button className="btn btn-2 btn-sep icon-create"
                    onClick={() => {
                        history.push({ pathname: "/events/new" })
                    }}
                >Schedule New Event</button>
            </header>
            {
                events.map(event => {
                    return <section key={event.id} className="registration">
                        <div className="registration__game">{event.game.title}</div>
                        <div>{event.description}</div>
                        <div>
                            {event.date} @ {event.time}
                        </div>
                        {
                            event.joined
                                ? <button className="btn btn-3"
                                    onClick={() => leaveEvent(event.id).then(() => eventFetcher())}
                                    >Leave</button>
                                : <button className="btn btn-2"
                                    onClick={() => joinEvent(event.id).then(() => eventFetcher())}
                                    >Join</button>
                        }
                        <div>
                            <button className="btn-edit" onClick={() => history.push(`/events/edit/${event.id}`)}>Edit</button>
                        </div>
                    </section>
                })
            }
        </article>
    )
}
