import React, { useState, useEffect } from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';
import FriendsForm from './FriendsForm';

const Friends = () => {
    const [friendsData, setFriendsData] = useState([]);
    const [update, setUpdate] = useState(true);

    useEffect(() => {
        axiosWithAuth()
        // console.log(axiosWithAuth())
            .get('/api/friends')
            .then(result => {
                console.log(result)
                setFriendsData(result.data)
            })
            .catch(error => console.log(error))
    }, [update])

    return (
        <>
            <h1>Auth Friends</h1>
            <FriendsForm update={update} setUpdate={setUpdate} />

            <h2>Friends</h2>
            {
                friendsData.map(friend => (
                    <div key={friend.id}>
                        <h3>{friend.name}</h3>
                        <p>Age: {friend.age}</p>
                        <p>Email:{friend.email}</p>
                    </div>
                ))
            }
        </>
    )
}
export default Friends;