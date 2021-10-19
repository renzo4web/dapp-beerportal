import React, {createContext, useContext, useState} from 'react';
import {Beer} from "../types/Beer.interface";


interface AppState {
    currentAccount: string;
    setCurrentAccount: (account: any) => void;
    allBeers: Beer[];
    setAllBeers: (beers: Beer[]) => void;
    txnCompleted: boolean;
    setTxnCompleted: (current: boolean) => void;
}

const Context = createContext<AppState>({
    allBeers: [],
    setAllBeers: () => {},
    currentAccount: '',
    setCurrentAccount: () => {},
    txnCompleted: true,
    setTxnCompleted: () => {},
});

const AppStateProvider: React.FC = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState('');
    const [allBeers, setAllBeers] = useState<Beer[]>([]);
    const [txnCompleted, setTxnCompleted] = useState(true);

    return (
        <Context.Provider
            value={{
                currentAccount,
                setCurrentAccount,
                allBeers,
                setAllBeers,
                setTxnCompleted,
                txnCompleted,
            }}
        >
            {children}
        </Context.Provider>
    );
};


export const useAppState = () => {
    return useContext(Context)
}

export default AppStateProvider;