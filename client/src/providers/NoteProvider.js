import React, { Component, useReducer } from "react";
import axios from 'axios';

const GET_NOTES = "GET_NOTES"
const ADD_NOTE = "ADD_NOTE"
const UPDATE_NOTE = "UPDATE_NOTE"
const DELETE_NOTE = "DELETE_NOTE" 

const initialState = { notes = [], loading: false, }

const reducer = (state, action) => {
  switch (action.type) {
    case GET_NOTES:
      return { notes: [...action.notes], loading: true }
    case ADD_NOTE:
      return { notes: [action.note, ...notes], loading: true }
    case UPDATE_NOTE:
      return state.map( n => {
        if (n.id === action.note.id)
          return action.note
        return n 
      })
    case DELETE_NOTE:
      return state.filter( n => n.id !== action.note.id )
    default:
      return initialState;
  }
}


const NoteContext = React.createContext();

export const NoteConsumer = NoteContext.Consumer;

const NoteProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const getNotes = () => {
    return new Promise((resolve, reject) => {
      axios.get("/api/notes")
        .then(res => {
          dispatch({ type: GET_NOTES, notes: res.data.data })
          resolve(res)
        })
        .catch( err => {
          console.log(err)
          reject(err)
        })
    })
  }

  const addNote = (note) => {
    return new Promise((resolve, reject) => {
      axios.post("/api/notes", note)
        .then(res => {
          dispatch({ type: ADD_NOTE, note: res.data.data })
          resolve(res)
        })
        .catch( err => {
          console.log(err)
          reject(err)
        })
    })
  }
  
  return (
    <NoteContext.Provider value={{
      state,
      dispatch,
      getNotes: getNotes,
      addNote: addNote
    }}>
      { children }
    </NoteContext.Provider>
  )
  
}

export default NoteProvider;