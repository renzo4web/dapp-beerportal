import type {NextPage} from "next";
import {useEffect, useState} from "react";

import Button from "@mui/material/Button";

import {
    beer,
    checkIfWalletIsConnected,
    connectWallet,
} from "../utils/helpers";

import {
    Container,
    Stack,
    Typography,
    ListItem,
    ListItemText,
    Divider,
    Card,
    LinearProgress,
} from '@mui/material';
import { Beer } from '../types/Beer.interface';
import Form from '../components/Form';
import { useAppState } from '../context/AppState';

const Home: NextPage = () => {
    const {
        setAllBeers,
        setCurrentAccount,
        currentAccount,
        allBeers,
        txnCompleted,
        setTxnCompleted,
    } = useAppState();

    useEffect(() => {
        setTxnCompleted(false);
        checkIfWalletIsConnected()
            .then(({ account, beers }) => {
                setCurrentAccount(account);
                setAllBeers(beers);
                setTxnCompleted(true);
            })
            .catch((err) => {
                console.log(err);
                setTxnCompleted(true);
            });
    }, []);

    return (
        <Container fixed>
            <div className="dataContainer">
                <Typography
                    variant={'h5'}
                    sx={{ textAlign: 'center' }}
                    component={'h3'}
                >
                    👋 Hey there!
                </Typography>

                <Typography
                    sx={{ textAlign: 'center', my: 2 }}
                    variant={'h6'}
                    component={'h4'}
                >
                    Hi I'm Renzo, this is the beer portal share a message and
                    leave your favorite beer.
                </Typography>

                <Stack spacing={2}>
                    {!currentAccount ? (
                        <Button
                            color={'secondary'}
                            className="waveButton"
                            onClick={() => connectWallet(setCurrentAccount)}
                        >
                            Connect Wallet
                        </Button>
                    ) : (
                        <Form onSubmit={beer} />
                    )}

                    {!txnCompleted && <LinearProgress color="secondary" />}
                </Stack>

                <Stack sx={{ my: '2em', overflowY: 'auto' }} spacing={2}>
                    {allBeers &&
                        allBeers.reverse().map((beer: Beer, i) => (
                            <Card
                                key={`key-${i}-${beer.timestamp}`}
                                sx={{
                                    backgroundColor: '#000',
                                    color: '#fff',
                                    padding: '1em',
                                }}
                            >
                                <ListItem>
                                    <ListItemText>
                                        <Typography
                                            component={'span'}
                                            sx={{
                                                color: 'yellow',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Address :
                                        </Typography>{' '}
                                        {beer.address}
                                    </ListItemText>
                                </ListItem>
                                <Divider color={'secondary'} />
                                <ListItem>
                                    <ListItemText>
                                        <Typography
                                            component={'span'}
                                            sx={{
                                                color: 'yellow',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Message :
                                        </Typography>{' '}
                                        {beer.message}
                                    </ListItemText>
                                </ListItem>
                                <Divider color={'secondary'} />
                                <ListItem>
                                    <ListItemText>
                                        <Typography
                                            component={'span'}
                                            sx={{
                                                color: 'yellow',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Favorite Beer :
                                        </Typography>{' '}
                                        {beer.favBeer}
                                    </ListItemText>
                                </ListItem>
                                <Divider color={'secondary'} />
                                <ListItem>
                                    <ListItemText>
                                        <Typography
                                            component={'span'}
                                            sx={{
                                                color: 'yellow',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            Time :
                                        </Typography>{' '}
                                        {beer.timestamp.toString()}
                                    </ListItemText>
                                </ListItem>
                            </Card>
                        ))}
                </Stack>
            </div>
        </Container>
    );
};

export default Home;
