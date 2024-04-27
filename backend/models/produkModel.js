import mongoose from "mongoose";

const ProdukSchema = mongoose.Schema({
    merek:{
        type: String,
        required: true
    },
    jenis:{
        type: String,
        required: true
    },
    jumlah_stock:{
        type: Number,
        required: true
    },
    harga:{
        type: Number,
        required: true
    },
    keterangan:{
        type: String,
        required: false
    },
}, {
    timestamps: true 
});

export default mongoose.model('Produks',ProdukSchema);
