import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return(
    <div className="flex h-screen max-h-screen">
      {/* TODO OTP varification model */}
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
          src="/assets/icons/logo.svg"
          height={1000}
          width={1000}
          alt="healthy_logo"
          className="mb-8 h-16 w-fit md:hidden"
          />
          <PatientForm/>
          {/* footer section */}
          <div className="text-14-regular mt-8 flex justify-between">
            <div className="flex flex-col w-[75%]">
              <p className="flex flex-row items-center">
                Designed by<span className="text-blue-500"><Link href="" className="ms-2"> NovaSpire Technologies</Link></span>
                {/* <Link href="" className="flex-initial"> 
                  <Image src="/assets/icons/nova_dark.svg" alt="NovaSpire" height={1000} width={1000} className="h-14 w-fit" />
                </Link> */}
              </p>
              <span className=" text-dark-600">
              &copy; 2024 HealtyCare System
              </span>
            </div>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>
      <section className="hidden md:flex md:flex-1 relative">
      <div className="flex inset-0 bg-cover bg-center bg_img items-center justify-center">
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative p-4 text-white">
              <Image
              src="/assets/icons/logo.svg"
              height={1000}
              width={1000}
              alt="healthy_logo"
              className="h-60 w-fit  mx-auto my-auto"
              />
            </div>
        </div>
{/* 
        <Image
        src="/assets/images/doc1.jpg"
        height={1000}
        width={1000}
        alt ="patient"
        className="max-w-[100%] side-img"
        /> */}
      </section>
    </div>
  )
}
