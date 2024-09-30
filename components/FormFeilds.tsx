'use client'
import React, { ReactNode } from 'react'
import {
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Input } from './ui/input'
import { Control } from 'react-hook-form'
import { FFeildType } from './forms/PatientForm'
import Image from 'next/image'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

interface CustomProps{
    control: Control<any>,
    fieldType: FFeildType, 
    name: string,
    label?: string,
    placeholder?: string,
    iconSrc?: string,
    iconAlt?: string,
    disabled?:boolean,
    dateFormat?: string,
    showTimeSelect?: string,
    children?: React.ReactNode,
    renderSkeleton?: (field: any) =>React.ReactNode,
  
}

const RenderFields = ({field, props}: {field:any; props:CustomProps}) =>{
  const{fieldType, iconSrc, iconAlt, placeholder} = props;
    switch (fieldType) {
      case FFeildType.INPUT:
        return (
          <div className="flex rounded-md border border-dark-500 bg-dark-400">
            {
              iconSrc && (
                <Image
                src = {iconSrc}
                alt = {iconAlt || 'icon'}
                height={24}
                width={24}
                className='ml-2'
                />
              )
            }
            <FormControl>
              <Input
                placeholder={placeholder}
                {...field}
                className="shad-input border-0"
              />
            </FormControl>
          </div>
        )
        
      
      case FFeildType.PHONE_INPUT:
        return(
            <FormControl>
              <PhoneInput
                defaultCountry='UG'
                placeholder={placeholder}
                international
                withCountryCallingCode
                value={field.value as string | undefined}
                onChange={(value) => field.onChange(value)}
                className="input-phone"
              />
            </FormControl>
        )
      default:
        break;
    }
}

const FormFeilds = (props:  CustomProps)=>{
  const {control, fieldType, name, label} = props
  return (
    <FormField
    control={control }
    name={name} //"name" was the problem causing the autofilling of the form inputs
    render={({ field }) => (
      <FormItem className='flex-1'>
        {fieldType !== FFeildType.CHECKBOX && label && (
          <FormLabel>{label}</FormLabel>
        )}
      <RenderFields field={field} props={props}/>
      <FormMessage className='shad-error'/>
         
      </FormItem>
    )}
  />  
  )
}

export default FormFeilds