import React, {useState} from 'react';
import {Stack, TextField, Button} from "@mui/material";
import {beer} from "../utils/helpers";
import {Beer} from "../types/Beer.interface";
import {useAppState} from "../context/AppState";

const initialValues = {
    message: "",
    favBeer: ""
}

interface Props {

    onSubmit: (message: string, favBeer: string) => Promise<Beer[]>
}

const Form = ({onSubmit}: Props) => {
        const {setAllBeers} = useAppState()
        const [formVals, setFormVals] = useState(() => initialValues)


        const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const {message, favBeer} = formVals;

            console.log(formVals);
            onSubmit(message, favBeer).then(setAllBeers);
        };

        return (
            <form onSubmit={handleSubmit}>

                <Stack spacing={2} sx={{maxWidth: "500px", mx: "auto"}}>
                    <TextField
                        variant={"filled"}
                        label={"Message"}
                        placeholder={""}
                        value={formVals.message}
                        onChange={({target}) => setFormVals(vals => ({...vals, message: target.value}))}
                        color={'secondary'}
                    />

                    <TextField
                        variant={"filled"}
                        label={"Favorite Beer"}
                        value={formVals.favBeer}
                        onChange={({target}) => setFormVals(vals => ({...vals, favBeer: target.value}))}
                        color={'secondary'}
                    />
                    <Button type={"submit"} color={"secondary"} variant="contained">
                        Send
                    </Button>
                </Stack>

            </form>
        );
    }
;

export default Form;
