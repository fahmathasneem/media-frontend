import React, { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Form from 'react-bootstrap/Form';
import { Trash2 } from 'feather-icons-react/build/IconComponents';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addCategories, deleteCategory, getVideo, getallCategory, getallCatrgory, getvideo, updateCategory } from '../services/allapi';
import { Col, Row } from 'react-bootstrap';
import Videocard from './Videocard';


function Category() {

  const [allCategory, setallCategory] = useState([])

  const [CategoryItem, setCategoryItem] = useState({ id: "", categoryName: "", allvideo: [] })

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getCategoryList = async () => {
    const response = await getallCatrgory()
    // console.log(response.data);
    setallCategory(response.data)
  }
  console.log(allCategory);

  useEffect(() => {

    getCategoryList()


  }, [])


  const addCategoryForm = (e) => {
    const { name, value } = e.target
    setCategoryItem({ ...CategoryItem, [name]: value })
  }
  console.log(CategoryItem);

  const handleDeleteCategory = async (e, id) => {
    e.preventDefault()
    console.log(id);
   await deleteCategory(id)
   getCategoryList()
  }

  const handleAddCategory = async (e) => {
    e.preventDefault()
    const { id, categoryName } = CategoryItem

    if (!id || !categoryName) {
      toast.warning("please fill the form completely")
    }
    else {
      const response = await addCategories(CategoryItem)
      console.log(response);
      if (response.status >= 200 && response.status < 300) {


        setShow(false)
        toast.success("new category added successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        })
        getCategoryList()
      }
      else {
        toast("please provide a unique id!!!")
      }
    }
  }
// dragover 
  const dragover=e=>{
    e.preventDefault()
    console.log('dragging over the category board!!!');
    let sourceCardId=e.dataTransfer.getData("cardId")
    console.log("sourcecard id", sourceCardId);
  }
// dropped 
const dropped=async (e,categoryId)=>{
  console.log("dropped category id", categoryId);
let sourceCardId=e.dataTransfer.getData("cardId")
console.log("source card id is:",sourceCardId);
  // logic to implement adding card in the given category 

let {data}= await  getvideo(sourceCardId)
console.log("source video data",data);

let selectCategory = allCategory.find(item=>item.id==categoryId)
console.log("target category details",selectCategory);
selectCategory.allvideo.push(data)
console.log("updated target categogry details",selectCategory);
 await updateCategory(categoryId,selectCategory)
 getCategoryList()
}


  return (
    <>
      <div className="d-grid">
        <div onClick={handleShow} className='btn btn-dark m-2'>
          Add Categories
        </div>
      </div>

      {
        allCategory?.map(item => (
         <div>
            <div droppable onDragOver={e=>dragover(e)} onDrop={e=>dropped(e,item?.id)} className='d-flex justify-content-between border rounded mt-2 p-3'>
              <h4> {item.categoryName}</h4>
              <span onClick={e => handleDeleteCategory(e, item?.id)}> <Trash2 color="red"></Trash2></span>
              <Row>
                {
                  item?.allvideo.map((card)=>{
                    <Col className='p-3 mb-1 sm(12)'>
                      <Videocard card={card} insidecategory={true}/>
                    </Col>
                  })
                }
              </Row>
            </div>
         </div>
        ))

      }

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mb-3' controlId='floatingId' label=" Id">
            <Form.Control type="text" name='id' onChange={addCategoryForm} placeholder=" Id" />
          </FloatingLabel>

          <FloatingLabel className='mb-3' controlId='floatingCaption' label="Category">
            <Form.Control type="text" name='categoryName' onChange={addCategoryForm} placeholder="Category" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddCategory}>Add</Button>
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
        theme="dark" />
    </>
  )
}

export default Category