import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Row, Button, Form, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useLoginMutation, useLogoutMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {

    const [email, setEmail] = useState(''); 
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const userInfo = useSelector(state => state.auth.userInfo);

    const [ login ] = useLoginMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap();
            dispatch(setCredentials(res));
            console.log('Login successful: ', res);
            // console.log(`Username: ${userInfo.name}`)
        } catch (err) {
            console.log("login unauthorized: ");
            toast.error(`Error: ${err.data.message}`);
            // console.log('Error: ', err);
        }
    }

    useEffect( () => {
        if (userInfo) {
            console.log('user info detected, navigate to /profile (just / for now)')
            // navigate(`/${userInfo.username}`);
        }
    })

    return (
        <FormContainer title={'Login.'} children>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Username</Form.Label>
                    <Form.Control 
                        type='email'
                        placeholder='Enter email'
                        className='w-25'
                        onChange={ (e) => setEmail(e.target.value)}
                        defaultValue={''}
                    />
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='enter password'
                        className='w-25'
                        onChange={ (e) => setPassword(e.target.value)}
                        defaultValue={''}
                     />
                </Form.Group>

                <Button 
                    type='submit' 
                    variant='primary'
                    className='w-auto d-flex flex-column justify-content-center align-items-center mt-5'
                    >
                    Sign In
                </Button>
            </Form>

        </FormContainer>
    )

}

export default LoginScreen;
