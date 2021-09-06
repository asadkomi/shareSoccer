import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { Controller, useForm } from "react-hook-form";
import {
    List,
    ListItem,
    Button,
    TextField,
    MenuItem,
} from "@material-ui/core";
import {addPlayer } from '../apiCall'
import { useSnackbar } from "notistack";
import {errorNotification} from "./Notification";


const useStyles = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '5px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(3, 2, 3),
        width:'400px'
    },
    form: {
        width: "100%",
    },
}));

export default function AddPlayerModal({fetchPlayers, handleModalOpen, handleModalClose, openModal}) {
    const classes = useStyles();
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const submitHandler = ({ name, team, img, gender }) => {
        const userData = {
            name,
            team,
            img,
            gender,
        };

        addPlayer(userData).then(()=> {
            closeSnackbar()
            console.log("play added")

            enqueueSnackbar("Player added successfully", { variant: "success" });
            fetchPlayers()
            handleModalClose()
        }).catch(error => {
            error.response.json().then(res => {
                errorNotification(
                    "There is an issue with the server.",
                    `${res.message} [statusCode: ${res.status}]`
                )
            })
        });


    };

    return (
        <div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleModalClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={openModal}>
                    <div className={classes.paper}>
                        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
                            <List>
                                <ListItem>
                                    <Controller
                                        name="name"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            "required": true,
                                            "minLength": 2,
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="name"
                                                label="Name"
                                                inputProps={{ type: "name" }}
                                                error={Boolean(errors.name)}
                                                helperText={
                                                    errors.name
                                                        ? errors.name.type === "minLength"
                                                        ? "Name length is more than 1"
                                                        : "Name is required"
                                                        : ""
                                                }
                                                {...field}
                                            ></TextField>
                                        )}
                                    ></Controller>
                                </ListItem>
                                <ListItem>
                                    <Controller
                                        name="team"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                            minLength: 2,
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="team"
                                                label="Team"
                                                inputProps={{ type: "team" }}
                                                error={Boolean(errors.team)}
                                                helperText={
                                                    errors.team
                                                        ? errors.team.type === "minLength"
                                                        ? "Team is not valid"
                                                        : "Team is required"
                                                        : ""
                                                }
                                                {...field}
                                            ></TextField>
                                        )}
                                    ></Controller>
                                </ListItem>
                                <ListItem>
                                    <Controller
                                        name="img"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                            minLength: 2,
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                id="img"
                                                label="Image Url"
                                                inputProps={{ type: "img" }}
                                                error={Boolean(errors.img)}
                                                helperText={
                                                    errors.img
                                                        ? errors.img.type === "minLength"
                                                        ? "Image is not valid"
                                                        : "Image is required"
                                                        : ""
                                                }
                                                {...field}
                                            ></TextField>
                                        )}
                                    ></Controller>
                                </ListItem>

                                <ListItem>
                                    <Controller
                                        name="gender"
                                        control={control}
                                        defaultValue=""
                                        rules={{
                                            required: true,
                                        }}
                                        render={({ field }) => (
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                select
                                                id="gender"
                                                label="Gender"
                                                {...field}
                                                error={Boolean(errors.gender)}
                                                helperText={errors.gender ? "Gender is required" : ""}
                                            >
                                                {["MALE", "FEMALE"].map((gender) => (
                                                    <MenuItem key={gender} value={gender}>
                                                        {gender}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                        )}
                                    ></Controller>
                                </ListItem>
                                <ListItem>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        fullWidth
                                        style={{
                                            backgroundColor: "#972479",
                                            color: "#fff",
                                            textTransform: "none",
                                            margin: "0",
                                        }}
                                    >
                                        Update
                                    </Button>
                                </ListItem>
                            </List>
                        </form>
                    </div>
                </Fade>
            </Modal>
        </div>
    );
}
