import { Webhook } from "svix"
import UserModel from "../models/userModel.js"



const clerkWebhooks = async (req, res) => {
    try{

      // CREATE a svix instance with clerk webhook secret.

      const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

      await whook.verify(JSON.stringify(req.body),{
        "svix-id":req.headers["svix-id"],
        "svix-timestamp":req.headers["svix-timestamp"],
        "svix-signature":req.headers["svix-signature"]
      })

      const {data,type} = req.body

      switch(type){
        case "user.created":{

          const userData = {
            clerkid:data.id,
            email: data.email_addresses[0].email_address,
            firstname: data.first_name,
            lastname: data.last_name,
            photo : data.image_url
          }

          await UserModel.create(userData)
          res.json({success:true, message:"Created Successfully"})

          break;
        }

        case "user.updated":{

           const userData = {
            email: data.email_addresses[0].email_address,
            firstname: data.first_name,
            lastname: data.last_name,
            photo : data.image_url
          }

          await UserModel.findOneAndUpdate({clerkid:data.id},userData)
          res.json({success:true, message:"Updated Successfully"})
          
          break;
        }
        case "user.deleted":{

          await UserModel.findOneAndDelete({clerkid:data.id})
          res.json({success:true, message:"Deleted Successfully"})
          
          break;
        }
      }

    }
    catch(error){
      console.log(error.message)
      res.json({success:false,message:error.message})

    }
}




const userCredits = async(req,res)=>{
  try {
    const {clerkid} = req.body
    const userData = await UserModel.findOne({clerkid})

    res.json({success:true,credits:userData.creditBalance})
  } catch (error) {
     console.log(error.message)
      res.json({success:false,message:error.message})
  }
}

export {clerkWebhooks,userCredits}