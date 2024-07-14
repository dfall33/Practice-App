import FormContainer from "../components/FormContainer";
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const RegisterScreen = () => {

    const userInfo = useSelector(state => state.auth.userInfo);
    const navigate = useNavigate();
    useEffect( () => {
        if (userInfo) {
            navigate('/profile')
        }
    })

    return (
        <FormContainer title={'Register'}>
            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"    
                    />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control 
                        type="email"
                        placeholder="Enter email"    
                    />
                </Form.Group>
            </Form>
        </FormContainer>
    )
}

export default RegisterScreen;