import React, { useContext, useEffect, useReducer } from 'react';
import axios from '../utils/webRequests';

const AUTH_START = 'AUTH_START'
const AUTH_SUCCESS = 'AUTH_SUCCESS'
const VALIDATE_START = 'VALIDATE_START'
const AUTH_FAIL = 'AUTH_FAIL'
const LOGOUT = 'LOGOUT'

const initialState = { loading: false, authenticated: false, user: null }

const reducer = (state, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, loading: true, authenticated: false }
    case AUTH_SUCCESS:
      return {
        ...state, 
        loading: false,
        authenticated: true,
        user: action.user
      }
    case AUTH_FAIL: 
      return { ...state, loading: false, authenticated: false, user: null }
    case VALIDATE_START:
      return { ...state, loading: true }
    case LOGOUT:
      return initialState
    default: 
      throw new Error('Unexpected action')
  }
}

const AuthContext = React.createContext();
const AuthConsumer = AuthContext.Consumer

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    validateToken()
  }, []);

  const handleLogin = user => {
    dispatch({ type: AUTH_START })
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/authenticate', user)
        .then( res => {
          dispatch({ type: AUTH_SUCCESS, user: res.data.data })
          resolve(res)
        })
        .catch( err => {
          dispatch({ type: AUTH_FAIL })
          reject(res)
        })
    })
  }

  const handleLogout = () => {
    dispatch({ type: LOGOUT })
    return new Promise((resolve, reject) => {
      if(!!localStorage.getItem("jwt")) {
        localStorage.removeItem("jwt")
        resolve()
      } else {
        reject()
      }
    })
  }

  const handleRegister = user => {
    dispatch({ type: AUTH_START })
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/user', user)
      .then(res => {
        dispatch({ type: AUTH_SUCCESS, user: res.data.data })
        resolve(res)
      })
      .catch(res => {
        dispatch({ type: AUTH_FAIL })
        reject(res)
      })
    })
  }

  const validateToken = () => {
    dispatch({ type: VALIDATE_START });
    return new Promise((resolve, reject) => {
      axios.post('/api/auth/validate_token')
      .then(res => {
        dispatch({ type: AUTH_SUCCESS, user: res.data.data })
        resolve(res)
      })
      .catch(res => {
        dispatch({ type: AUTH_FAIL})
        reject(res)
      })
    })
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
        login: handleLogin,
        register: handleRegister,
        logout: handleLogout,
        validateToken
      }}
    >
      { children }
    </AuthContext.Provider>
  )
}

const useAuthContext = () => {
  const contextValue = useContext(AuthContext)
  return contextValue
}

function withAuthContext(Component) {
  return function WrapperComponent(props) {
    return (
      <AuthConsumer>
        { state => <Component {...props} authContext={state} /> }
      </AuthConsumer>
    )
  }
}

export {
  AuthContext,
  AuthConsumer,
  AuthProvider,
  withAuthContext,
  useAuthContext
}