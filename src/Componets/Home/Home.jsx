import React, { useState } from 'react'
import { Button, Card, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { getData } from '../../Services/Helper/helper';
import { useNavigate } from 'react-router';
import { Form } from 'react-bootstrap';
import Header from '../Header/Header';

function Home() {


    const [view, setView] = useState(getData("myData"));

    console.log("view", view);

    const navigate = useNavigate();

    const handleEdit = (id) => {
        navigate(`/edit/${id}`);
    }

    const handleDelete = (id) => {
        //delete logic

        const data = view.filter((data) => {
            return data.id !== id
        })


        localStorage.setItem("myData", JSON.stringify(data));
        setView(data)


    }

    const handleSort = (key) => {

        let sortedData;

        switch (key) {
            case "asc":
                sortedData = [...view].sort((dataF, dataS) => {
                    return dataF.fname.localeCompare(dataS.fname)
                })
                break;
            case "des":
                sortedData = [...view].sort((dataF, dataS) => {
                    return dataS.fname.localeCompare(dataF.fname)
                })
                break;

            default:
                break;
        }


        setView(sortedData)
    }

    const handleSearch = (e) => {



        const [search, setSearch] = useState(e.target.value);
    }




    return (

        <>
        <Header/>
            <div>
                <h1 className='text-center font-bold  fs-4 mb-16 mt-16'>
                    VIEW DATA
                </h1>

                <Container>
                 

                    <div className='flex w-full items-center justify-center' gap={3}>
                        <div className='w-3/4 items-center'>
                        
                        {
                            view.map((data) => {
                                return (
                                    <>
                                    <container className="form  w-full mb-12">

                                        <Card className="text-center ">
                                            <Card.Header>
                                               <span className='fs-3'>
                                                Name :- 
                                                {data.fname}
                                                </span>
                                                </Card.Header>
                                            <Card.Body>

                                                <Card.Text className='h-40  fs-5  overflow-y-scroll'>
                                                    {data.commit}
                                                   
                                                </Card.Text>



                                            </Card.Body>
                                            <Card.Footer className="text-muted">
                                                <button  className='btnclicked editbutton' onClick={() => handleEdit(data.id)}>Edit</button>||
                                                <button  className='btnclicked editbutton'  onClick={() => handleDelete(data.id)}>Delete</button>
                                                
                                            </Card.Footer>
                                        </Card>
                                    </container>

                                    </>
                                )
                            })

                        }
                        </div>
                        

                    </div>









                </Container>
            </div>
        </>
    )
}

export default Home
