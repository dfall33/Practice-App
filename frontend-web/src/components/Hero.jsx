import { Card, Button, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const Hero = () => {

    return (
        <div className="py-5">

            <Container className="d-flex justify-content-center flex-column align-items-center">
                <Card className='p-5 d-flex flex-column align-items-center hero-card bg-light w-75'>
                    <h1 className="text-center">
                        Welcome to Pumped.
                    </h1>
                    <div className="d-flex">
                        <LinkContainer to="/register">
                            <Button className="me-3">Register</Button>
                        </LinkContainer>
                        <LinkContainer to="/login">
                            <Button className="me-3">Login</Button>
                        </LinkContainer>
                    </div>
                </Card>
            </Container>

        </div>
    )
}

export default Hero;