import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
});

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;
