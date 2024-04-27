import React, { useEffect, useState } from "react";
import {
  getProduks,
  getProdukById,
  updateProduk,
  deleteProduk,
} from "../api/product";
import {
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  IconButton,
  MenuItem,
  Select,
} from "@mui/material";
import TambahProduk from "./TambahProduk";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import { SelectChangeEvent } from "@mui/material";
import "./style.css";

const ProductList: React.FC = () => {
  const [produks, setProduks] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredProduks, setFilteredProduks] = useState<any[]>([]);
  const [openAddProductDialog, setOpenAddProductDialog] =
    useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage, searchQuery]);

  const filterProduks = () => {
    if (searchQuery.trim() === "") {
      setFilteredProduks(produks);
    } else {
      const filtered = produks.filter((produk) =>
        produk.merek.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProduks(filtered);
    }
  };

  useEffect(() => {
    filterProduks();
  }, [searchQuery, produks]);

  const fetchData = async () => {
    try {
      const data = await getProduks(currentPage, itemsPerPage);
      setProduks(data.produks);
      setTotalPages(data.totalPages);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleAddProductClick = () => {
    setEditingProduct(null);
    setOpenAddProductDialog(true);
  };

  const handleCloseAddProductDialog = () => {
    setOpenAddProductDialog(false);
    setEditingProduct(null);
  };

  const handleEditProduct = async (id: string) => {
    try {
      const product = await getProdukById(id);
      setEditingProduct(product);
      setOpenAddProductDialog(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleUpdateProduct = async (updatedData: any) => {
    try {
      await updateProduk(editingProduct._id, updatedData);
      handleCloseAddProductDialog();
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product successfully updated",
      });
      setEditingProduct(null); 
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover this product!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });

      if (result.isConfirmed) {
        await deleteProduk(id);
        fetchData();
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product successfully deleted",
        });
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (event: SelectChangeEvent<number>) => {
    const newValue = Number(event.target.value);
    setItemsPerPage(newValue);
    setCurrentPage(1);
  };

  return (
    <div>
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}
      >
        <TextField
          label="Cari produk..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <Button
          variant="contained"
          onClick={handleAddProductClick}
          style={{ marginLeft: "10px" }}
        >
          Add Product
        </Button>
      </div>
      <Table>
        <TableHead className="table-header">
          <TableRow>
            <TableCell className="table-header-cell">Nama Merek</TableCell>
            <TableCell className="table-header-cell">Jenis</TableCell>
            <TableCell className="table-header-cell">Harga</TableCell>
            <TableCell className="table-header-cell">Stok</TableCell>
            <TableCell className="table-header-cell">Keterangan</TableCell>
            <TableCell className="table-header-cell">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredProduks.map((produk) => (
            <TableRow key={produk._id}>
              <TableCell>{produk.merek}</TableCell>
              <TableCell>{produk.jenis}</TableCell>
              <TableCell>{produk.harga}</TableCell>
              <TableCell>{produk.jumlah_stock}</TableCell>
              <TableCell>{produk.keterangan}</TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleEditProduct(produk._id)}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  onClick={() => handleDeleteProduct(produk._id)}
                  aria-label="delete"
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TambahProduk
        open={openAddProductDialog}
        handleClose={handleCloseAddProductDialog}
        fetchData={fetchData}
        product={editingProduct}
        handleUpdate={handleUpdateProduct}
      />
      <div className="pagination-container">
        <span className="items-per-page-text">Items per page:</span>
        <Select
          value={itemsPerPage}
          onChange={handleItemsPerPageChange}
          variant="outlined"
          className="items-per-page-select"
        >
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
        </Select>
        {Array.from({ length: totalPages }, (_, index) => (
          <Button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className="pagination-button"
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
