import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "./Pagination";
import { Modal } from "react-bootstrap";
import "./products.css";
import Header from "./Header";

function Products() {
  const showPerPage = 8;
  const [paginate, setPaginate] = useState({
    start: 0,
    end: showPerPage,
  });
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [popUp, setPopUp] = useState({});
  const [show, setShow] = useState(false);
  const [get, setGet] = useState(true);

  const handleChange = (e) => {
    if (e.target.value === "all") {
      setGet(!get);
    } else {
      const newData = allData.filter((item) => {
        if (item.category === e.target.value) return item.category;
      });
      setData(newData);
    }
  };

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products").then((data) => {
      console.log(data.data);
      setData(data.data);
      setAllData(data.data);
    });
  }, [get]);

  const onPaginationChange = (start, end) => {
    setPaginate({ start: start, end: end });
  };

  const popUpHandle = (item) => {
    setPopUp(item);
    handleShow();
  };

  const popUpClose = () => {
    handleClose();
  };
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };
  return (
    <div>
      <Header />
      <div className="selection">
        <select onChange={(e) => handleChange(e)}>
          <option value="all">All</option>
          <option value="electronics">Electronics</option>
          <option value="men's clothing">Men's Clothing</option>
          <option value="women's clothing">Women's Clothing</option>
          <option value="jewelery">Jewellery</option>
        </select>
      </div>

      <div className="main">
        {data.slice(paginate.start, paginate.end).map((item, idx) => {
          return (
            <div
              key={idx}
              onClick={() => popUpHandle(item)}
              className="product-item"
            >
              <img src={item.image} alt="products" className="prod" />
              <p>{item.title}</p>
              <p>Price: {item.price}</p>
            </div>
          );
        })}
      </div>

      <div className="pagination">
        <Pagination
          showPerPage={showPerPage}
          total={data.length}
          onPaginationChange={onPaginationChange}
        />
      </div>
      <Modal
        show={show}
        onHide={handleClose}
        className="model"
        animation={false}
        centered
      >
        <Modal.Body>
          <div>
            <div className="popUp">
              <span>{popUp.category}</span>

              <button onClick={() => popUpClose}>close</button>
            </div>
            <div className="modalBody">
              <img src={popUp.image} alt="produ" className="product" />
              <span className="pop"></span>
              <span className="describe"> Description:</span>
              <span>{popUp.description}</span>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Products;
