import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Row } from 'react-bootstrap';
import ReactLoading from 'react-loading';

function App() {

  const [heroes, setHeroes] = useState();
  const [initHeroes, setInitHeroes] = useState();
  const [show, setShow] = useState(false);
  const [selectedHeroes, setSelectedHeroes] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = () => setShow(false);
  const handleShow = (data) => {
    console.log(data);
    setSelectedHeroes(data);
    setShow(true);
  };

  const heroesRole = [
    {
      "name": "Carry",
      "img": "/assets/Carry.png"
    },
    {
      "name": "Nuker",
      "img": "/assets/Nuker.png"
    },
    {
      "name": "Initiator",
      "img": "/assets/Initiator.png"
    },
    {
      "name": "Disabler",
      "img": "/assets/Disabler.png"
    },
    {
      "name": "Durable",
      "img": "/assets/Durable.png"
    },
    {
      "name": "Escape",
      "img": "/assets/Escape.png"
    },
    {
      "name": "Support",
      "img": "/assets/Support.png"
    },
    {
      "name": "Pusher",
      "img": "/assets/Pusher.png"
    },
    {
      "name": "Jungler",
      "img": "/assets/Jungler.png"
    },
  ];

  const getHeroesData = async () => {
    setIsLoading(true);
    const data = await axios.get(`https://api.opendota.com/api/heroStats`);
    setTimeout(() => {
      setHeroes(data.data);
      setInitHeroes(data.data);
      setIsLoading(false);
    }, 1000);
  }

  const handleSearch = (event) => {
    const data = initHeroes?.filter(name => name.localized_name.toLowerCase().includes(event.target.value.toLowerCase()))
    setHeroes(data);
  }

  useEffect(() => {
    getHeroesData();
  }, [])

  return (
    <>
      {
        isLoading ?
          <div style={{ backgroundCOlor: 'red', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
            <ReactLoading type={"bars"} color={"#000"} height={75} width={150} />
          </div>
          :
          <>
            <div style={{ overflowX: 'hidden' }}>
              <Form.Group className="my-5 mx-5">
                <Form.Control type="text" placeholder="Cari hero kamu disini..." onChange={handleSearch} />
              </Form.Group>
              <Row>
                {
                  heroes?.map((item, index) => {
                    return (
                      <Col lg={4} className="d-flex justify-content-center my-5" key={index}>
                        <Card style={{ width: '18rem' }}>
                          <Card.Img variant="top" src={`https://api.opendota.com` + item.img} alt={item.localized_name} />
                          <Card.Body>
                            <Card.Title>{item.localized_name}</Card.Title>
                            <Card.Text>
                              {
                                item.roles.map((item, index) => {
                                  const img = heroesRole.find((role) => role.name === item).img;
                                  return <img src={img} alt={item} key={index} title={item} />
                                })
                              }
                            </Card.Text>
                            <Button variant="primary" onClick={() => handleShow(item)}>Heroes Stats</Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    )
                  })
                }
              </Row>
            </div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title><img src={`https://api.opendota.com` + selectedHeroes?.icon} alt={selectedHeroes?.localized_name} /> {selectedHeroes?.localized_name}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Movement Speed
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.move_speed}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Attack Range
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.attack_range}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Attack Rate
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.attack_rate}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Attack Type
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.attack_type}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Agility
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_agi}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Armor
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_armor}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Attack
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_attack_min} - {selectedHeroes?.base_attack_max}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Health
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_health}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Health Regen
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_health_regen}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Int
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_int}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Mana
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_mana}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Mana Regen
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_mana_regen}</span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    Base Strength
                    <span className="badge bg-primary rounded-pill">{selectedHeroes?.base_str}</span>
                  </li>
                </ul>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </>
      }
    </>
  );
}

export default App;
