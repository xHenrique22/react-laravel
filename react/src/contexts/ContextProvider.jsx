import { createContext, useState, useContext } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => { },
    setToken: () => { }
})


export const ContextProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, _setToken] = useState(null);

    const setToken = (token) => {
        _setToken(token)
        if (token) {
            localStorage.setItem('ACESS_TOKEN', token);
        } else {
            localStorage.removeItem('ACESS_TOKEN')
        }
    }


    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }} >
            {children}
        </StateContext.Provider>
    )
}
export const useStateContext = () => useContext(StateContext)