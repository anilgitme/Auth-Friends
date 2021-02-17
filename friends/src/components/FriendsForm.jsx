import React, { useState } from 'react';
import {axiosWithAuth} from '../utils/axiosWithAuth';

const FriendsForm = ({update, setUpdate}) => {
    const [ field, setField ] = useState({
        name: '',
        age: '',
        email: ''
  })

  const handleChange = event => {
      setField({
          ...field, [event.target.name]: event.target.value
      })
  }

  const pushFriend = event => {
      event.preventDefault();
      axiosWithAuth()
        .post('/api/friends', field)
        .then(addFriend => {
            console.log(addFriend)
        })
        .catch(error => {
            console.log('error posting', error)
        })
        .finally(() => {
            setField({
                name: '',
                age: '',
                email: ''
            })
            console.log(field)
            setUpdate(!update)
        })
  }

  return (
      <div className='container'>
          <form onSubmit={(event) => pushFriend(event)}>
                <label>Name</label>
                <input type="text"
                    name='name'
                    onChange={(event) => handleChange(event)}
                    />
                <label>Age</label>
                <input type="text"
                    name='age'
                    onChange={(event) => handleChange(event)}
                    />
                <label>Email</label>
                <input type="text"
                    name='email'
                    onChange={(event) => handleChange(event)}
                    />
                    <button>Add Friend</button>
          </form>
      </div>
  )
}

export default FriendsForm;