import React, { useEffect, useState } from "react";
import axios from "axios";
import AppHeader from "../Common/Header/AppHeader";
import Menu from "../Common/Header/Menu";
import Footer from "../Common/Header/Footer";
import "../../assets/css/Superadmin.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Superadmin = () => {
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAdmins, setSelectedAdmins] = useState([]);
  const itemsPerPage = 3; 

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get("http://localhost:5000/admins");
        setAdmins(response.data);
      } catch (error) {
        console.error("Error fetching admins:", error);
      }
    };

    fetchAdmins();
  }, []);

  // Calculate the index of the last item and the first item on the current page
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = admins.slice(indexOfFirstItem, indexOfLastItem);

  // Calculate total number of pages
  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedAdmins(currentItems.map((admin) => admin._id));
    } else {
      setSelectedAdmins([]);
    }
  };

  const handleCheckboxChange = (e, id) => {
    if (e.target.checked) {
      setSelectedAdmins((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedAdmins((prevSelected) => prevSelected.filter((adminId) => adminId !== id));
    }
  };

  return (
    <>
      <AppHeader />
      <Menu />
      <div className="superadmin-container">
        <h1>Admins</h1>
        <table className="admin-table">
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  onChange={handleSelectAll}
                  checked={selectedAdmins.length === currentItems.length && currentItems.length > 0}
                />
              </th>
              <th>Username</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((admin) => (
              <tr key={admin._id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedAdmins.includes(admin._id)}
                    onChange={(e) => handleCheckboxChange(e, admin._id)}
                  />
                </td>
                <td>{admin.UserName}</td>
                <td>{admin.Email}</td>
                <td>{admin.PhoneNumber}</td>
                <td>{admin._id}</td>
                <td>
                  <>
                    <FontAwesomeIcon icon={faPen} />
                    <FontAwesomeIcon icon={faTrash} />
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={currentPage === index + 1 ? 'active' : ''}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Superadmin;
