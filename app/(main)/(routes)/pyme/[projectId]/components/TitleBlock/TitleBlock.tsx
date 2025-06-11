import React from 'react'
import { TitleBlockProps } from './TitleBlock.types'

export default function TitleBlock(props: TitleBlockProps) {
  const {title, icon: Icon} = props;
  return(
    <div className='flex items-center mb-6 gap-1'>
        <div className='p-2 rounded-full bg-[#2196f3]'>
            <Icon className='h-5 w-5 text-white'></Icon>
        </div>
        <h3 className='text-xl font-semibold text-[#0a2342]'>{title}</h3>
    </div>
    
  )
}
