import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import generateUniqueId from 'generate-unique-id';
import { getData } from '../../Services/Helper/helper';
import { Navigate, useNavigate, useParams } from 'react-router';

function Edit() {

    const { id } = useParams();

    useEffect(() => {
        const data = addData.find((data) => {
            return data.id === id
        })

        setInputData(data)
    }, [])



    const [inputData, setInputData] = useState({
        id: id,
        fname: '',
        commit: '',

    });


    const [addData, setAddData] = useState(getData("myData"));
    const navigate = useNavigate();
    const [myfalse, setMyFalse] = useState(false);

    const handleChange = (e) => {

        let name = e.target.name;
        let value = e.target.value;
        setInputData({ ...inputData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // let obj = {
        //     ...inputData,
        //     id: generateUniqueId({
        //         length: 2,
        //         useLetters: false
        //     })
        // }


        let updateDate = addData.map((data) => {
            if (data.id == id) {
                return data = inputData
            }
            return data
        })


        setAddData(updateDate);
        setMyFalse(true);

    }

    useEffect(() => {

        localStorage.setItem("myData", JSON.stringify(addData));
    }, [addData]);

    useEffect(() => {
        if (myfalse) {
            navigate('/home');
        }
    }, [myfalse])



    return (
        <div>
            <Container className=' p-4 form w-full login-container  '>
                <h1 className='text-center display-1'>
                    EDIT DATA
                </h1>
                <Form onSubmit={handleSubmit} >
                    <Form.Control name='id' value={inputData.id} onChange={handleChange} hidden />

                    <Row className="mb-3 ">
                        <Form.Group as={Col} >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" name='fname' value={inputData.fname} onChange={handleChange}
                                className="  rounded-sm" />
                        </Form.Group>
                    </Row>
                    <Row className="mb-3 ">


                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Label>Commit</Form.Label>
                            <Form.Control as="textarea" rows={3} name='commit' value={inputData.commit} onChange={handleChange}
                                className="  rounded-sm" />

                        </Form.Group>

                    </Row>


                    <div className='d-flex justify-content-center '>
                        <button className="styled-button mt-12" type="submit">
                            Submit
                            <div className="inner-button">
                                <svg
                                    id="Arrow"
                                    viewBox="0 0 32 32"
                                    xmlns="http://www.w3.org/2000/svg"
                                    height="30px"
                                    width="30px"
                                    class="icon"
                                >
                                    <defs>
                                        <linearGradient y2="100%" x2="100%" y1="0%" x1="0%" id="iconGradient">
                                            <stop style={{ stopColor: "#FFFFFF", stopOpacity: 1 }} offset="0%" />
                                            <stop style={{ stopColor: "#AAAAAA", stopOpacity: 1 }} offset="100%" />
                                        </linearGradient>
                                    </defs>
                                    <path
                                        fill="url(#iconGradient)"
                                        d="M4 15a1 1 0 0 0 1 1h19.586l-4.292 4.292a1 1 0 0 0 1.414 1.414l6-6a.99.99 0 0 0 .292-.702V15c0-.13-.026-.26-.078-.382a.99.99 0 0 0-.216-.324l-6-6a1 1 0 0 0-1.414 1.414L24.586 14H5a1 1 0 0 0-1 1z"
                                    ></path>
                                </svg>
                            </div>
                        </button>
                    </div>



                </Form>
            </Container>

        </div>
    )
}

export default Edit
