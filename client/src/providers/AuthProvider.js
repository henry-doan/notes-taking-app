import React, { useContext, useEffect, useReducer } from 'react';
import axios from '../utils/webRequests';

const AuthContext = React.createContext();

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    vaildateToken()
  }, [])

  
}
