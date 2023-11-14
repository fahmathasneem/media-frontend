import React from 'react'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { PlusCircle } from 'feather-icons-react/build/IconComponents';
import Modal from 'react-bootstrap/Modal'
import { addVideo } from '../services/allapi';

import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Add({handleresponse}) {

    const [uploadData, setuploadData] = useState({
        id: "", caption: "", thumbnail: "", url: ""
    })

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const setInput = (e) => {

        const { name, value } = e.target
        // spread operator 
        setuploadData({ ...uploadData, [name]: value })

    }
    console.log(uploadData);



    const extractUrl = (e) => {
        let youtubeUrl = e.target.value

        // https://www.youtube.com/watch?v=2aMHLEKQ1Do----original url
        // "https://www.youtube.com/embed/2aMHLEKQ1Do"-----iframe src

        if (youtubeUrl.includes("v=")) {
            let index = youtubeUrl.indexOf("v=")
            console.log(index);

            let videoUrl = youtubeUrl.substring(index + 2, index + 13)
            console.log(videoUrl);

            let videodata = uploadData

            videodata.url = `https://www.youtube.com/embed/${videoUrl}`
            setuploadData(videodata)

        }

    }

    console.log(uploadData);

    const handleAdd = async () => {
        const { id, caption, thumbnail, url } = uploadData
        if (!id || !caption || !thumbnail || !url) {
            toast("please fill the form completly")
        }
        else {
            // make an api call to  allapi.js

            const response = await addVideo(uploadData)
            //  console.log(response);

            if (response.status >= 200 && response.status < 300) {
                // console.log(response.data);
                handleresponse(response.data)
                setShow(false)
                toast.success("new video uploaded successfully",{position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",})
            }
            else{
                toast("please provide a unique id!!!")
            }
        }
    }


    return (
        <>
            <div onClick={handleShow} className='btn'>
                <PlusCircle color='green' size={50} />

            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Upload Video details</Modal.Title>
                </Modal.Header>
                <Modal.Body>





                    <Form>


                        <FloatingLabel className='mb-3' controlId='floatingId' label="Upload Video Id">
                            <Form.Control type="text" placeholder="Video Id" name='id' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId='floatingCaption' label="Upload Video caption">
                            <Form.Control type="text" placeholder="Video Caption" name='caption' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId='floatingImage' label="Upload Video cover image">
                            <Form.Control type="text" placeholder="Video Cover Image url" name='thumbnail' onChange={setInput} />
                        </FloatingLabel>

                        <FloatingLabel className='mb-3' controlId='floatingImage' label="Upload Video Link">
                            <Form.Control type="text" placeholder="Video Link" name='url' onChange={extractUrl} />
                        </FloatingLabel>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleAdd} variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
            <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"/>
        </>

    )
}

export default Add
