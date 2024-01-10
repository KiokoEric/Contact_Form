import React, { useRef } from 'react';
import "../ContactForm/ContactForm.css";
import * as yup from 'yup';
import emailjs from '@emailjs/browser';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FaLinkedin } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaInstagramSquare } from "react-icons/fa";
import { FaFacebookSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const ContactForm = () => {

    const { enqueueSnackbar } = useSnackbar();
    const formRef = useRef();

    const PersonSchema = yup.object().shape({
        Name: yup.string().required("Name is required"),
        EmailAddress: yup.string().email("Email format is not valid").required("Valid email address is required"),
        PhoneNumber: yup.string(),
        Message: yup.string().required("Message is required")
    });

    const { register, handleSubmit, formState: { errors }} = useForm({
        resolver : yupResolver(PersonSchema)
    });

    const onSubmit = () => {
        emailjs.sendForm('service_p1q43qr', 'template_fa10n1a', formRef.current, 'PnplNSesRddqlO1I1')
        enqueueSnackbar("Successfully sent!" , {variant: "success"} ) 
    }


return (
    <div className='ContactForm' >
        <section>
            <h2>Let's Get In Touch</h2>
            <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Distinctio aliquam illum consequuntur explicabo natus, odit incidunt quas libero harum! A hic nihil enim unde, pariatur numquam sed error ab minus?
            </p>
            <div>
                <FaMapLocationDot className='Connect' size="1.5rem" /> Nairobi, Kenya
            </div>
            <div>
                <IoMdMail className='Connect' size="1.5rem"  /> Michaelmbwele@gmail.com
            </div>
            <div>
                <FaPhoneAlt className='Connect' size="1.5rem"  /> (+254) 112 528 285
            </div>
            <div>
                <p>Connect with me:</p>
                <figure>
                    <FaInstagramSquare size="2rem" />
                    <FaSquareXTwitter size="2rem"  />
                    <FaFacebookSquare size="2rem"  />
                    <FaLinkedin size="2rem"  />
                </figure>
            </div>
        </section>
        <section>
            <h2>Contact Me</h2>
            <form ref={formRef} onSubmit={handleSubmit(onSubmit)} >
                <div>
                    <input type="text" name="Name" id="Name" placeholder='Enter Full Name'  
                    {...register("Name")}/>
                    <span className="Error">{errors.Name?.message}</span>
                </div>
                <div>
                    <input type="text" name="EmailAddress" id="EmailAddress" placeholder='Enter Email Address' {...register("EmailAddress")}  />
                    <span className="Error">{errors.EmailAddress?.message}</span>
                </div>
                <div>
                    <input type="text" name="PhoneNumber" id="PhoneNumber" placeholder='Enter Phone Number'  
                    {...register("PhoneNumber")} />
                </div>
                <textarea type="text" placeholder='Enter Message' name="Message" id="Message" cols="20" rows="10" {...register("Message")} ></textarea>
                <span className="Error">{errors.Message?.message}</span>
                <div>
                    <button onClick={handleSubmit(onSubmit)}  type="submit">Send Message</button>
                </div>
            </form>
        </section>
    </div>
)
}

export default ContactForm