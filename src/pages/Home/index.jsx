import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";

const API_URL = "http://localhost:3200/";

function Home() {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [file, setFile] = useState({
    photo: "",
  });
  const [UpdateName, setUpdateName] = useState("");
  const [DataID, setDataID] = useState("");

  const [formValues, setFormValues] = useState({
    nama: "",
    harga_beli: "",
    harga_jual: "",
    stok: "",
  });
  const mergedState = { ...file, ...formValues };
  console.log("cek json = ", mergedState);
  const formData = new FormData();
  formData.append("photo", mergedState.photo);
  formData.append("nama", mergedState.nama);
  formData.append("harga_beli", mergedState.harga_beli);
  formData.append("harga_jual", mergedState.harga_jual);
  formData.append("stok", mergedState.stok);
  const [pagination, setPagination] = useState({
    page: 1,
    perPage: 5,
    total: 0,
  });

  // Fetch data on initial load and pagination change
  useEffect(() => {
    const fetchTableData = async () => {
      const token = localStorage.getItem("token");
      const response = await axios.get(API_URL + "barang/get-all-data", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Access-Control-Allow-Origin": "*",
          // "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
        },
        params: {
          _page: pagination.page,
          _limit: pagination.perPage,
        },
      });
      setData(response.data);
      setPagination((prev) => ({
        ...prev,
        total: Number(response.headers["x-total-count"]),
      }));
    };
    fetchTableData();
  }, [pagination.page, pagination.perPage]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (modalTitle === "Add") {
      // POST new data
      const token = localStorage.getItem("token");
      await axios.post(API_URL + "barang/create", formData, {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      });
    } else if (modalTitle === "Edit") {
      // PUT updated data
      const token = localStorage.getItem("token");
      await axios.put(`${API_URL}barang/update-name/${DataID}`, UpdateName, {
        headers: {
          Authorization: `Bearer ${token}`,

          "Content-Type": "multipart/form-data",
        },
      });
    }
    setModalShow(false);
  };

  const handleDelete = async (id) => {
    // DELETE data by id
    const token = localStorage.getItem("token");

    await axios.delete(`${API_URL}barang/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  // const handlePageChange = (page) => {
  //   setPagination((prev) => ({ ...prev, page }));
  // };

  const handleModalOpen = (title, values) => {
    setModalTitle(title);
    setFormValues(values);
    setModalShow(true);
  };

  const ChangeUpdateName = (title, value, id) => {
    setModalTitle(title);
    setUpdateName(value);
    setDataID(id);
  };

  return (
    <div className="container">
      <h1>Tabel CRUD dengan Pagination</h1>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Nama</th>
            <th>Harga Beli</th>
            <th>Harga Jual</th>
            <th>Stok</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id}>
              <td>{row.id} </td>
              <td>
                <img src={row.photo} alt="photo" width={150} height={150} />
              </td>
              <td>{row.nama}</td>
              <td>{row.harga_beli}</td>
              <td>{row.harga_jual}</td>
              <td>{row.stok}</td>
              <td>
                {/* <Button
                  variant="primary"
                  onClick={() => handleModalOpen("Edit", row)}
                >
                  Edit
                </Button>{" "} */}
                <Button variant="danger" onClick={() => handleDelete(row.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* <Pagination className="mt-3">
        {[...Array(Math.ceil(pagination.total / pagination.perPage)).keys].map(
          (page) => (
            <Pagination.Item
              key={page}
              active={page + 1 === pagination.page}
              //  onClick={() => handlePageChange(page + 1)}
            >
              {page + 1}
            </Pagination.Item>
          )
        )}
      </Pagination> */}
      <Button variant="success" onClick={() => handleModalOpen("Add", {})}>
        Add New
      </Button>
      <Modal show={modalShow} onHide={() => setModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle} Data</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Photo</Form.Label>
              <Form.Control
                type="file"
                value={formValues.photo}
                onChange={(event) =>
                  setFile((prev) => ({
                    ...prev,
                    photo: event.target.files[0],
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Nama</Form.Label>
              <Form.Control
                type="text"
                value={formValues.nama}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    nama: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Beli</Form.Label>
              <Form.Control
                type="number"
                value={formValues.harga_beli}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    harga_beli: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Harga Jual</Form.Label>
              <Form.Control
                type="number"
                value={formValues.harga_jual}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    harga_jual: event.target.value,
                  }))
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Stok</Form.Label>
              <Form.Control
                type="number"
                value={formValues.stok}
                onChange={(event) =>
                  setFormValues((prev) => ({
                    ...prev,
                    stok: event.target.value,
                  }))
                }
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModalShow(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
}

export default Home;
