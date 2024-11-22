import { dbConnect } from "@/config/db";
import { QueryModel } from "@/model/queryModel";
import { NextResponse } from "next/server";


export async function POST(req) {
    
    await dbConnect()
    const { name, email, phone ,message} =
      await req.json();
      console.log(name);
    try {
  
      if(!name || name == ""){
          return NextResponse.json({message:"Full Name is required"},{status:500})
      }
  
      else if(!email || email == ""){
        return NextResponse.json({message:"Email is required"},{status:500})
      }
  
      else if(!phone || phone == ""){
        return NextResponse.json({message:"Contact is required"},{status:500})
      }
  
      
  
      else if(!message || message == ""){
        return NextResponse.json({message:"Query Content is required"},{status:500})
      }
      
  
  
      const query = new QueryModel({
        name,
        email,
        phone,
        message,
        
      });
      await query.save();
        
      return NextResponse.json({
        data: query,
        message: "Query Submit Sucessfully",
      });
        
    } catch (error) {
        return NextResponse.json({message:"Error in submitting Query"});
        
    }
}        