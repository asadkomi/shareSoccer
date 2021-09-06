import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import './App.css';
import {getAllPlayers, deletePlayer} from "./apiCall";
import {useState, useEffect} from "react";
import {CardActions, Card, Button, CardContent, Grid, CardMedia} from "@material-ui/core";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import AddIcon from "@material-ui/icons/Add";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import AddPlayerModal from "./components/AddPlayerModal";
import {errorNotification} from "./components/Notification";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 2),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    media: {
        height: 240,
    },

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

function App() {
    const classes = useStyles();
    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true)

    const [openModal, setOpenModal] = useState(false);

    const handleModalOpen = () => {
        setOpenModal(true);
    };

    const handleModalClose = () => {
        setOpenModal(false);
    };




    const fetchPlayers = () => {
        getAllPlayers()
            .then(res => res.json())
            .then(data => {
                setPlayers(data)

            }).catch(error => {
                error.response.json().then(res => {
                    errorNotification(
                        "There is an issue with the server.",
                        `${res.message} [statusCode: ${res.status}]`
                    )
                })
            }).finally(() => setLoading(false))
    }

    useEffect(() => {
        fetchPlayers()
    }, [])


    const handleDeletePlayer = (playerId, callBack) => {
        deletePlayer(playerId).then(() => {
            callBack();
        }).catch(error => {
    error.response.json().then(res => {
        errorNotification(
            "There is an issue with the server.",
            `${res.message} [statusCode: ${res.status}]`
        )
    })
})
    }

    return (

        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" style={{background:'#fff', color: "#333"}}>
                <Toolbar>

                    <Typography variant="h6" noWrap>
                        ShareSoccer
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.content}>
                <div className={classes.toolbar}/>

                <div style={{paddingTop: '50px', paddingBottom:'50px'}}>
                    <div>
                        {loading ? <Spin indicator={antIcon} /> :
                            <h3>{players.length} Players </h3>
                        }
                    </div>

                    <div  align="right" className="pb-5">
                        <Button
                            onClick={handleModalOpen}
                            variant="contained"
                            style={{
                                backgroundColor: "#972479",
                                color: "#fff",
                                textTransform: "none",
                                marginBottom: "20px",
                            }}
                        >
                            <AddIcon /> Add Player
                        </Button>

                    </div>


                    <Divider />
                </div>
                <Grid container spacing={1}>

                    {players.map((player, index) => {
                        return <Grid item md={4} xs={12} key={index}>
                            <Card>
                                <CardMedia
                                    className={classes.media}
                                    image={player.img}
                                    title={player.name}
                                />
                                <CardContent>
                                    <Typography>{player.name}</Typography>
                                    <Typography>{player.team}</Typography>
                                </CardContent>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="add to favorites">
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton aria-label="share" onClick={() => handleDeletePlayer(player.id, fetchPlayers)}>
                                        <DeleteForeverIcon />
                                    </IconButton>

                                </CardActions>

                            </Card>

                        </Grid>
                    })}

                </Grid>

                <AddPlayerModal fetchPlayers={fetchPlayers} openModal={openModal} handleModalClose={handleModalClose} handleModalOpen={handleModalOpen} />

            </main>
        </div>
    );
}

export default App;
