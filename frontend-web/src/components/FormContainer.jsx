import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ( { children, title }) => {
    return (
        <Container>
            <Col>
                <h1>{ title }</h1>
                <Row>
                    { children }
                </Row>
            </Col>
        </Container>
    )
}

export default FormContainer;