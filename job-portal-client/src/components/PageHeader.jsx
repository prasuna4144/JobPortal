import React from 'react'

const PageHeader = ({title,path}) => {
  return (
    <div className='py-25 mt-3 bg-[#FAFAFA] rounded flex items-center justify-center'>
        <div className='py-16'>
            <h1 className='text-3xl text-blue font-medium mb-1 text-center '>{title}</h1>
            <p className='text-sm text-center'><a href='/'>Home</a>/{path}</p>
        </div>
    </div>
  )
}

export default PageHeader