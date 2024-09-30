import React from 'react'
import { Button } from './ui/button'

interface ButtonProps{
    isloading: boolean,
    className?: string,
    children: React.ReactNode
}

const SubmitButton = ({isloading, className, children}: ButtonProps) => {
  return (
    <Button type="submit" disabled={isloading} className={className ?? 'shad-primary-btn w-full'}>
        {isloading ?(
            <div className="flex item-center gap-4">

                Loading ...
            </div>
        ): children}
    </Button>
  )
}

export default SubmitButton