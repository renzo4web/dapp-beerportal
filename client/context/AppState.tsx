import React, {createContext, useContext, useState} from 'react';
import {Beer} from "../types/Beer.interface";


interface AppState {
    currentAccount: string
    setCurrentAccount: (account: any) => void
    allBeers: Beer[]
    setAllBeers: (beers: Beer[]) => void
}

const Context = createContext<AppState>({
    allBeers: [],
    setAllBeers: () => {
    },
    currentAccount: '',
    setCurrentAccount: () => {
    }
})

const AppStateProvider: React.FC = ({children}) => {

    const [currentAccount, setCurrentAccount] = useState("");
    const [allBeers, setAllBeers] = useState<Beer[]>([]);


    return (
        <Context.Provider value={{currentAccount, setCurrentAccount, allBeers, setAllBeers}}>
            {children}
        </Context.Provider>
    );
};


export const useAppState = () => {
    return useContext(Context)
}

export default AppStateProvider;