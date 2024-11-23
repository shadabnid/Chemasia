import { dbConnect } from "@/config/db";
import { QueryModel } from "@/model/queryModel";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req) {
  await dbConnect();
  
  const { name, email, phone, message } = await req.json();
  console.log(name);

  try {
    // Validation
    if (!name || name === "") {
      return NextResponse.json({ message: "Full Name is required" }, { status: 400 });
    } else if (!email || email === "") {
      return NextResponse.json({ message: "Email is required" }, { status: 400 });
    } else if (!phone || phone === "") {
      return NextResponse.json({ message: "Contact is required" }, { status: 400 });
    } else if (!message || message === "") {
      return NextResponse.json({ message: "Query Content is required" }, { status: 400 });
    }

    // Save query to database
    const query = new QueryModel({
      name,
      email,
      phone,
      message,
    });

    await query.save();

    // Email setup using Nodemailer
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST, // GoDaddy SMTP server
      port: process.env.EMAIL_PORT, // SSL port
      secure: true, // SSL
      auth: {
        user: "info@chemasia.in", // Replace with your GoDaddy email
        pass: "chemasia@123", // Replace with your GoDaddy email password
      },
    });

    // Email options
    const mailOptions = {
      from: "info@chemasia.in", // Sender email
      to: email, // Recipient email
      subject: "Query Received Successfully",
      text: `Hello ${name},\n\nThank you for reaching out to us. We have received your query and will respond shortly.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}\n\nBest Regards,\nYour Company Name`,
      html: `<p>Hello <b>${name}</b>,</p><p>Thank you for reaching out to us. We have received your query and will respond shortly. <p>Best Regards,<br>Chemasia</p>`,
    };
   
    const adminMailOptions = {
        from: "info@chemasia.in", // Sender email
        to: "info@chemasia.in", // Admin email
        subject: "New Query Submitted",
        text: `A new query has been submitted by ${name}. Here are the details:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
        html: `<p>A new query has been submitted by <b>${name}</b>.</p>
               <p><b>Details:</b></p>
               <ul>
                 <li><b>Name:</b> ${name}</li>
                 <li><b>Email:</b> ${email}</li>
                 <li><b>Phone:</b> ${phone}</li>
                 <li><b>Message:</b> ${message}</li>
               </ul>`,
      };
    
    // Send email
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(adminMailOptions);

    return NextResponse.json({
      data: query,
      message: "Query submitted successfully.",
    });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "Error in submitting query or sending email" }, { status: 500 });
  }
}
