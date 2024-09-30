"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormFeilds from "../FormFeilds"
import { useState } from "react"
import SubmitButton from "../SubmitButton"
import { formValidation } from "@/lib/validation"
import { useRouter } from "next/navigation"
import { createUser } from "@/lib/actions/patients.actions"

export enum FFeildType {
  INPUT = 'input',
  PHONE_INPUT = 'phoneInput',
  DATE_PICKER = 'datePicker',
  CHECKBOX = 'checkbox',
  // CHECKBOX = 'checkbox',
  SKELETON = 'skeleton',
  TEXTAREA = 'textarea',
  SELECT = 'select',
}
 
 
const PatientForm = () => {
  const router = useRouter()
  const [isloading, setIsloading] = useState(false)
  const form = useForm<z.infer<typeof formValidation>>({
    resolver: zodResolver(formValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  })
 
  // 2. Define a submit handler.
  // async function onSubmit({name, phone, email}: z.infer<typeof formValidation>) {
  //   setIsloading(true);
  //   try {
  //     const userData = {name, phone, email}
  //     const user = await createUser(userData);

  //     if(user) {router.push(`patients/${user.$id}/register`)}
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   // finally{setIsloading(false)}
  // }


  async function onSubmit({ name, phone, email }: z.infer<typeof formValidation>) {
    // setIsloading(true);
    // console.log("Submitting form with data:", { name, phone, email });
    try {
      const userData = { name, phone, email };
      const user = await createUser(userData);
      console.log("User created:", user);
  
      if (user) {
        router.push(`patients/${user.$id}/register`);
        console.log("Navigating to:", `patients/${user.$id}/register`);
      } else {
        console.error("User creation failed, no user returned");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }  
  }
  

  // ✅returning the from section and componets
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hello Friend</h1>
          <p className="text-dark-700">Schedule an appointment</p>
        </section>
        {/* ==================== input sections==================== */}
       <FormFeilds
       fieldType={FFeildType.INPUT} 
        control={form.control}
        name ="name"
        label="Full name"
        iconSrc="/assets/icons/user.svg"
        iconAlt ="user"
        placeholder="Ashraf K. "
       />
       <FormFeilds
       fieldType={FFeildType.INPUT} 
        control={form.control}
        name ="email"
        label="Email"
        iconSrc="/assets/icons/email.svg"
        iconAlt ="email"
        placeholder="ashrafk@novaspire.pro"
       />
       <FormFeilds
       fieldType={FFeildType.PHONE_INPUT} 
        control={form.control}
        name ="phone"
        label="Phone Number"
        iconSrc="/assets/icons/telephone.svg"
        placeholder="(256) 712-3456"
       />

       {/* ==================== submit button ==================== */}
        <SubmitButton isloading={isloading}>Create Account</SubmitButton>
      </form>
    </Form>
  )
}

export default PatientForm