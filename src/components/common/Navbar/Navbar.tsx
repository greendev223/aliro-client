import './navbar.css'
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApi } from '../../../contexts/ApiProvider';
import { useUser } from '../../../contexts/UserProvider';

import {MdOutlineNotificationsNone} from 'react-icons/md';
import {TbMessageCircle2} from 'react-icons/tb';

import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

export default function Navbar() {
    const api = useApi();
    const linksRef = useRef(null);
    let singInText = api.isAuthenticated() ? 'Sign out' : 'Sign in';
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleSignOut = () => {
        if (api.isAuthenticated()) {
            logout();            
            navigate('/login')
        }
    }

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
        anchorRef.current &&
        anchorRef.current.contains(event.target as HTMLElement)
        ) {
        return;
        }

        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
        event.preventDefault();
        setOpen(false);
        } else if (event.key === 'Escape') {
        setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
        anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    function Links() {
        return api.isAuthenticated() ?
            (
                <ul className="navbar-links" ref={linksRef}>                    
                    <li style={{ listStyleType: 'none', }} className="navbar-item">
                        <Link className="navbar-link" to='/form'>Visa Options</Link>
                    </li>
                    <li className="navbar-item" style={{ listStyleType: 'none' }} >
                        <Link className="navbar-link" to='/results'>Marketplace</Link>
                    </li>
                    <li className="navbar-item" style={{ listStyleType: 'none' }} >
                        <Link className="navbar-link" to='/results'>Visa Application</Link>
                    </li>
                </ul>
            ) : <></>
    }
    return (
        <div className="navbar">
            <div className="navbar-container">
                <img className='navbar-logo' src={"aliro_logo.png"} alt="logo" />
                <Links />
                <div className="navbar-right-container">
                    {/* <p className="navbar-signin">
                        {username}
                    </p> */}
                    <div className="navbar-icon">
                        <MdOutlineNotificationsNone /> 
                    </div>
                    <div className="navbar-icon">
                        <TbMessageCircle2 /> 
                    </div>

                    <div className='navbar-user'>
                        <Button
                            ref={anchorRef}
                            id="composition-button"
                            aria-controls={open ? 'composition-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleToggle}
                            >
                            <img src = "Ava.png" />
                        </Button>
                        <Popper
                            open={open}
                            anchorEl={anchorRef.current}
                            role={undefined}
                            placement="bottom-start"
                            transition
                            disablePortal
                            >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                {...TransitionProps}
                                style={{
                                    transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                                }}
                                >
                                <Paper>
                                    <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={open}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                                    </MenuList>
                                    </ClickAwayListener>
                                </Paper>
                                </Grow>
                            )}
                        </Popper>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

const LoginIcon = () => {
    return (
        <svg
            style={{ alignSelf: 'center', marginRight: 8 }}
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            fill="var(--primary-color)"
            viewBox="0 0 16 16">
            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
        </svg>
    )
}