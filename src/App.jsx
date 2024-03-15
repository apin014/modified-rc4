import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { CipherForm } from './components/CipherForm';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import "./App.css"

export const App = () => {
    // const [selected, setSelected] = React.useState("")
    const [chosen, setChosen] = React.useState("")
    const [picked, setPicked] = React.useState("")

    // const handleSelect = (event) => {
    //     setSelected(event.target.value)
    //     setChosen("")
    //     setPicked("")
    // }

    const handleChoose = (event) => {
        setChosen(event.target.value)
        setPicked("")
    }

    const handlePick = (event) => {
        setPicked(event.target.value)
    }
    
    return (
        <div className='Main-Page'>
            <Stack spacing={16}>
                <Stack spacing={1}>
                    <Typography variant="h1" align="center" gutterBottom>MR. C4</Typography>
                    <Typography variant="h4" align="center" gutterBottom>&lt; Modified RC4 Demo &gt;</Typography>
                </Stack>
                
                <Stack spacing={2}>
                    <Stack direction={"row"} spacing={1} style={{justifyContent: "center"}}>
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                            <InputLabel id="select-label-demo2">Encrypt/Decrypt</InputLabel>
                            <Select
                                labelId="select-label-demo2"
                                id="demo"
                                value={chosen}
                                onChange={handleChoose}
                                autoWidth
                                label="Please Select"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="encrypt">Encrypt</MenuItem>
                                <MenuItem value="decrypt">Decrypt</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ m: 1, minWidth: 160 }}>
                          <InputLabel id="select-label-demo3">Input Type</InputLabel>
                            <Select
                              labelId="select-label-demo3"
                              id="demo"
                              value={picked}
                              onChange={handlePick}
                              autoWidth
                              label="Please Select"
                              defaultValue=""
                            >
                              <MenuItem value="">
                                  <em>None</em>
                              </MenuItem>
                              <MenuItem value="text">Text</MenuItem>
                              <MenuItem value="file">File</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    {chosen && picked &&
                        <CipherForm flavor={chosen} input={picked}/>
                    }
                </Stack>
            </Stack>
        </div>
    )
}