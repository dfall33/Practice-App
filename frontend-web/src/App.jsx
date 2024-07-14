import { Container, Row, Col, Toast } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Header from './components/Header';

const App = () => {
  return (
    <>
    <ToastContainer />
    <Container fluid>
      <Row>
        <Col xs={3} className="p-0">
          <Header />
        </Col>
        <Col xs={9} className="p-0">
          <Outlet />
        </Col>
      </Row>
    </Container>
    </>
  )
}

export default App;