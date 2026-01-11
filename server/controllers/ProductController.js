import {v2 as cloudinary} from 'cloudinary';
import { PRODUCT } from '../models/Product.js';


// Add Product : ./api/product/add
export async function addProduct(req,res)
{
    try {
        let productData=JSON.parse(req.body.productData);

        const images=req.files;

        let imagesUrl=await Promise.all(
            images.map(async(item)=>{
                let result= await cloudinary.uploader.upload(item.path, {resource_type:'image'});
                return result.secure_url;
            })
        )

        await PRODUCT.create({...productData,image:imagesUrl})

        return res.json({status:true, message:'Product added'});
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:error.message});
    }
}

// Get Product : ./api/product/list
export async function productList(req,res)
{
    try {

        const products=await PRODUCT.find({});
       return res.json({status:true, products});
        
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:error.message});
    }
    
}

// Get Single Product : ./api/product/id
export async function productById(req,res)
{
    try {
        const {id}=req.body;
        const product=await PRODUCT.findById({id});
        return res.json({status:true, product});
        
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:error.message});
    }
    
}

// Change Product inStock : ./api/product/stock
export async function changeStock(req,res)
{
    try {
        const {id, inStock}=req.body;
        await PRODUCT.findByIdAndUpdate(id,{inStock});
        return res.json({status:true, message:'Stock Updated'});
        
    } catch (error) {
        console.log(error.message);
        return res.json({status:false,message:error.message});
    }
    
}