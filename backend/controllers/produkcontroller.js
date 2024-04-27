import Produk from "../models/produkModel.js";

export const getproduks = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;

  try {
    const skip = (page - 1) * limit;
    const totalProduks = await Produk.countDocuments();
    const produks = await Produk.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit);

    res.json({
      currentPage: page,
      totalPages: Math.ceil(totalProduks / limit),
      totalProduks,
      produks,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getprodukById = async (req, res) => {
  try {
    const produk = await Produk.findById(req.params.id);
    res.json(produk);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const saveproduk = async (req, res) => {
  const produk = new Produk(req.body);
  try {
    const insertedproduk = await produk.save();
    res.status(201).json(insertedproduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateproduk = async (req, res) => {
  try {
    const updatedproduk = await Produk.updateOne(
      { _id: req.params.id },
      { $set: req.body },
    );
    res.status(201).json(updatedproduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteproduk = async (req, res) => {
  try {
    const deletedproduk = await Produk.deleteOne({ _id: req.params.id });
    res.status(201).json(deletedproduk);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const searchProduks = async (req, res) => {
  const query = req.query.q;
  try {
    const produks = await Produk.find({
      $or: [
        { merek: { $regex: query, $options: "i" } },
        { jenis: { $regex: query, $options: "i" } },
      ],
    });
    res.json(produks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
