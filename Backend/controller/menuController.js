import Menu from "../models/menuSchema.js";


export const createMenu = async (req,res)=> {
    const {title, category, image} = req.body;

    try {
        const newMenu = new Menu({
            title,
            category,
            image
        });

        await newMenu.save();

        res.status(201).json({success:true , message:"Menu Create Successfully!"});
    } catch(error) {
        console.error('Error Adding Menu',error);
        res.status(500).json({success:false, message:"Faild To Add Menu!"});
        
    }
};


export const getAllMenus = async (req,res) => {
    try{
    const menus = await Menu.find();
    res.status(200).json({menu: menus});
    }
    catch (error){
        console.error('Error fetching menus:', error);
        res.status(500).json({message:'Failed To Fatch Restaourant Menus'});
    }
}


export const deleteAllMenu = async (req, res) => {
    try {
        const { id } = req.params;
        
        if (!id) {
            return res.status(400).json({ success: false, message: "ID parameter is required" });
        }

        const result = await Menu.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ success: false, message: "Menu item not found" });
        }

        res.status(200).json({ success: true, message: "Menu item deleted successfully" });
    } catch (error) {
        console.error("Error deleting menu item:", error);
        res.status(500).json({ success: false, message: "Failed to delete menu item" });
    }
};

export const updateMenuItem = async (req,res) => {
    const {id} = req.params;
    const {title,category,image} = req.body;
     try {
        const updateMenu = await Menu.findByIdAndUpdate(
            id,
            {title,category,image},
            {new: true}
        );

        if(!updateMenu) {
            return res.status(404).json({message:"Menu Item Not Found"});
        }
        res.status(200).json({success:true,message:"Resaurant Menu Updated Successfully!",menu: updateMenu});
     }catch (error) {
        console.error('Error Updating MeNu Items!',error);
        res.status(500).json({success:false, message:"Failed To Update Menu Items"})
     }
};


