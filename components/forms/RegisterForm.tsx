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
import { FFeildType } from "./PatientForm"

 
 
const RegisterForm = () => {
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

  async function onSubmit({ name, phone, email }: z.infer<typeof formValidation>) {
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
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let's know more about you</p>
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
       {/* ==================== submit button ==================== */}
        <SubmitButton isloading={isloading}>Create Account</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm