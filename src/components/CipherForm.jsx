import React from "react";
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
// import MenuItem from '@mui/material/MenuItem';
// import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import axios from "axios"
// import moment from "moment";
import { MuiFileInput } from "mui-file-input"
import FileSaver from "file-saver"
import Alert from '@mui/material/Alert';
import { gcd } from "../server/utils/affine-cipher.util";
import "./Components.css"

export const CipherForm = ({flavor, input}) => {
    const [text, setText] = React.useState("")
    const [file, setFile] = React.useState(null)
    const [key, setKey] = React.useState("")
    const [mKey, setMKey] = React.useState(null)
    const [bKey, setBKey] = React.useState(null)
    const [display, setDisplay] = React.useState("")
    const [error, setError] = React.useState("")
    // const [coprimes] = React.useState(coprime256())

    const submit = (flavor, in_, out_) => {
        let body = {}
        let formData = new FormData()
        if (in_ === "text") {
            body.text = text
            body.rc4_key = key
            body.m = parseInt(mKey)
            body.b = parseInt(bKey)
        } else if (in_ === "file") {
            formData.append("file", file)
            formData.append("rc4_key", key)
            formData.append("m", `${mKey}`)
            formData.append("b", `${bKey}`)
        }

        let config = {}
        config.params = {}
        config.params.out = out_

        if (in_ === "file") {
            config.headers = {
                "Content-Type": "multipart/form-data"
            }
        }

        if (out_ === "file") {
            config.responseType = "blob"
        }

        return axios.post(
            `http://localhost:3636/rc4/${flavor}/${in_}`, 
            in_ === "text" ? body : formData, 
            config
        ).then((resp) => {
            if (out_ === "file") {
                FileSaver.saveAs(resp.data, `${Date.now().toString()}`)
            }
            else {
                let msg = resp.data.msg
                setDisplay(msg)
            }
        }).catch((error) => {
            setError(`An error occurred: ${error.message}`)
        })
    }

    const handleText = (event) => {
        setText(event.target.value)
    }
    
    const handleFile = (newFile) => {
        setFile(newFile)
    }

    const handleKey = (event) => {
        setKey(event.target.value)
    }
    
    const handleMKey = (event) => {
        setMKey(event.target.value)
    }

    const handleBKey = (event) => {
        setBKey(event.target.value)
    }

    return (
        <div className="view">
            <Box>
                <form>
                    <Stack spacing={2}>
                        {input === "text" &&
                            <Stack spacing={1} style={{justifyContent: "center"}}>
                                <TextField
                                    value={text}
                                    onChange={handleText}
                                    type="text" placeholder="Insert Text Here"
                                    error={text === ""}
                                    helperText={text === "" ? "Do not leave empty" : ""}/>
                            </Stack>
                        }
                        {input === "file" &&
                            <FormControl>
                                <MuiFileInput
                                    value={file}
                                    onChange={handleFile}
                                    placeholder={"Insert File Here"}
                                    error={!file}
                                    helperText={file ? "" : "Do not leave empty"} />
                            </FormControl>
                        }
                        <TextField 
                            type="text"
                            value={key} 
                            onChange={handleKey}
                            placeholder="Insert RC4 Key Here" 
                            style={{width: "25vw"}}
                            error={key === ""} 
                            helperText={key === "" ? "Do not leave empty" : ""}/>

                        <TextField
                            type="number"
                            value={mKey}
                            onChange={handleMKey}
                            placeholder="Insert your Affine M Key"
                            style={{width: "25vw"}}
                            InputProps={{
                                inputProps: { min: 0}
                            }}
                            error={!mKey || gcd(parseInt(mKey), 256) !== 1}
                            helperText={mKey ? (gcd(parseInt(mKey), 256) === 1 ? "" : "Not a coprime of 256") : "Do not leave empty"}>
                                
                        </TextField>
                        <TextField 
                                type="number" 
                                value={bKey} 
                                onChange={handleBKey}
                                placeholder="Insert Affine B Key (amount of shift)" 
                                style={{width: "25vw"}}
                                InputProps={{
                                    inputProps: { min: 1}
                                }}
                                error={!bKey} 
                                helperText={bKey ? "" : "Do not leave empty"} />
                        {flavor === "encrypt" && input &&
                            <Stack direction={"row"} spacing={1} style={{justifyContent: "center"}}>
                                <Button
                                    variant="contained"
                                    component="span"
                                    onClick={() => submit(flavor, input, "file")}
                                >
                                    Encrypt to File
                                </Button>
                                {input === "text" &&
                                    <Button
                                        variant="contained"
                                        component="span"
                                        onClick={() => submit(flavor, input, "text")}
                                    >
                                        Encrypt to Text
                                    </Button>
                                }
                                
                            </Stack>
                        }
                        {flavor === "decrypt" && input &&
                            <Stack direction={"row"} spacing={1} style={{justifyContent: "center"}}>
                                {input === "text" &&
                                    <Button
                                        variant="contained"
                                        component="span"
                                        onClick={() => submit(flavor, input, "text")}
                                    >
                                        Decrypt to Text
                                    </Button>
                                }
                                <Button
                                    variant="contained"
                                    component="span"
                                    onClick={() => submit(flavor, input, "file")}
                                >
                                    Decrypt to File
                                </Button>
                            </Stack>
                        }
                        {input === "text" && flavor &&
                            <TextField
                                value={display}
                                disabled
                            />
                        }
                        {error !== "" &&
                            <Alert severity="error">{error}</Alert>
                        }
                    </Stack>
                </form>
            </Box>
        </div>
    )
}