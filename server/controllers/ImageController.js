import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import UserModel from '../models/userModel.js';
import { buffer } from 'stream/consumers';


//controller function to remove bg from image

const removeBgImage = async (req,res)=>{
    try {
        
        const {clerkid} = req.body

        const user = await UserModel.findOne({clerkid})

        if(!user){
          return res.json({
            success:false,
            message: 'user Not found '
          })
        }

        if (user.creditBalance === 0) {
          return res.json({
            success: false,
            message: "No credit balance",
            creditBalance: user.creditBalance,
          });
        }

        const imagePath = req.file.path;

        //reading image file

        const imageFile = fs.createReadStream(imagePath)

        const formData = new FormData();
        formData.append('image_file',imageFile)

        const {data} = await axios.post('https://clipdrop-api.co/remove-background/v1',formData,{
          headers:{
            'x-api-key': process.env.CLIPDROP_API
          },
          responseType: 'arraybuffer'
        })

        const base64Image = Buffer.from(data,'binary').toString('base64')
        const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

        await UserModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1})

        res.json({
          success:true,
          resultImage,
          creditBalance:user.creditBalance-1,
          message:'background removed'
        })



    } catch (error) {
        console.log(error.message)
      res.json({success:false,message:error.message})
    }

}

export {removeBgImage}