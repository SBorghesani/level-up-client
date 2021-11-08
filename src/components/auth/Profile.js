import React, { useEffect, useState } from "react"
import { getProfile } from "./ProfileManager.js"
// import "./Profile.css"


export const Profile = () => {
    const [ profile, changeProfile ] = useState([])

    useEffect(() => {
        getProfile().then(data => changeProfile(data))
    }, [])

    return (
        <article className="profile">
            <header>
                <h1>Your Profile</h1>
            </header>
            <section className="profile__info">
                <header className="profile__header">
                    <h3>Your Info</h3>
                </header>
                <div className="profile__name">
                {/* TODO: show the user's first and last name */}
                    Welcome: {`${profile?.gamer?.user?.first_name} ${profile?.gamer?.user?.last_name}`}
                </div>
                {/* TODO: show the user's username */}
                <div className="profile__username">Username: {profile?.gamer?.user?.username}</div>
                {/* TODO: show the user's bio */}
                <div className="profile__bio">About you: {profile?.gamer?.bio}</div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are attending</h3>
                </header>
                <div className="registrations">
                    <ul>
                    {profile?.attending?.map(pa => {
                        return <li>{pa.description}</li>
                    })}
                    </ul>
                </div>
            </section>
            <section className="profile__registrations">
                <header className="registrations__header">
                    <h3>Events you are hosting</h3>
                </header>
                <div className="registrations">
                    <ul>
                        {profile?.hosting?.map(ph => {
                            return <li>{ph.description}</li>
                        })}
                    </ul>
                </div>
            </section>
        </article>
    )
}
