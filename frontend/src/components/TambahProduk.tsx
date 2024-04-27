import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { saveProduk } from "../api/product";
import Swal from "sweetalert2";

interface TambahProdukProps {
  open: boolean;
  handleClose: () => void;
  fetchData: () => Promise<void>;
  product?: any;
  handleUpdate: (updatedData: any) => Promise<void>;
}

const TambahProduk: React.FC<TambahProdukProps> = ({
  open,
  handleClose,
  fetchData,
  product,
  handleUpdate,
}) => {
  const [newProduct, setNewProduct] = useState({
    merek: "",
    jenis: "",
    harga: 0,
    jumlah_stock: 0,
    keterangan: "",
  });

 
  useEffect(() => {
    if (product) {
      setNewProduct(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (product) {
        await handleUpdate(newProduct); 
      } else {
        await saveProduk(newProduct); 
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Product successfully saved",
        });
      }
      setNewProduct({
        merek: "",
        jenis: "",
        harga: 0,
        jumlah_stock: 0,
        keterangan: "",
      });
      handleClose();
      fetchData();
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const handleCancel = () => {
    if (product) {
      setNewProduct({
        merek: "",
        jenis: "",
        harga: 0,
        jumlah_stock: 0,
        keterangan: "",
      });
    }
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {product ? "Edit Produk" : "Tambah Produk Baru"}
      </DialogTitle>
      <DialogContent>
        <TextField
          name="merek"
          label="Nama Merek"
          value={newProduct.merek}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="jenis"
          label="Jenis"
          value={newProduct.jenis}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="harga"
          label="Harga"
          type="number"
          value={newProduct.harga}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="jumlah_stock"
          label="Stok"
          type="number"
          value={newProduct.jumlah_stock}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
        <TextField
          name="keterangan"
          label="Keterangan"
          value={newProduct.keterangan}
          onChange={handleChange}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel}>Batal</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          {product ? "Simpan Perubahan" : "Simpan"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TambahProduk;
