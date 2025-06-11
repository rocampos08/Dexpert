import React from 'react'

export default function AuthLayout({children}: {children:React.ReactNode}) {
  return (
    <div className='flex h-full w-full items-center justify-center'>
    <div className='w-full h-screen'>
        <div className='absolute top-0 left-0 h-full w-full bg-gradient-to-tr from-amber-200 to-yellow-400 z-[-1]'/>
            {children}
        
        
    </div>
    </div>
  )
}
