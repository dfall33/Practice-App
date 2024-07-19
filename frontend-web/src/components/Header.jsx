import { Navbar, Nav, NavDropdown, Container, Button } from 'react-bootstrap';
import { defer, Link } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import '../index.css';
import { toast } from 'react-toastify';

import { logout } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {

    const userInfo = useSelector(state => state.auth.userInfo);
    console.log(`userInfo: ${userInfo}`);

    const loggedIn = userInfo ? true : false;

    const dispatch = useDispatch();
    const [ logoutApiCall ] = useLogoutMutation();

    if (loggedIn) {
        console.log(`userInfo: ${userInfo.user}`);
        console.dir(userInfo);

    }

    const logoutHandler = async (userInfo) => {
        if (!userInfo) {
            toast.toast('You are not logged in.');
        } else {
            try {
                console.log(`You have been logged out. Userinfo: ${userInfo.username}`);
                dispatch(logout());
                await logoutApiCall().unwrap();

            } catch (err) {
                toast.error(`Error: ${err.data.message}`);
            }
        }
    }

    return (
        <header>
            <Navbar bg="dark" expand="lg" collapseOnSelect className='flex-column sidebar vh-100'> 
                <Container className='d-flex flex-column'>
                    <LinkContainer className='header-styles' to="/">
                        <Navbar.Brand>Pumped</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto flex-column">
                            {loggedIn ? (
                                <>
                                    <LinkContainer className='header-styles' to={`${userInfo.username}`}>
                                        <Nav.Link>Profile</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer className='header-styles' to={"/explore"}>
                                        <Nav.Link>Explore</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to={"/upload"} className='header-styles'>
                                        <Nav.Link>Post!</Nav.Link>
                                    </LinkContainer>
                                </> 
                            ) : 
                            (
                                <>
                                    <LinkContainer className='header-styles' to={"/login"}>
                                        <Nav.Link>Login</Nav.Link>
                                    </LinkContainer>

                                    <LinkContainer to={"/register"} className='header-styles'>
                                        <Nav.Link>Register</Nav.Link>
                                    </LinkContainer>

                                   
                                </>
                            )
                            }

                            {
                                loggedIn && (
                                    <>
                                        <Button onClick={logoutHandler}>
                                            {`Logout ${userInfo.name}`}
                                        </Button>
                                    </>
                                )
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )

}

export default Header;