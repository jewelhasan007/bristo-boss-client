import React from 'react';

const CategoryTitle = ({subHeading, heading}) => {
    return (
        <div className=' text-center mx-auto md:w-4/12 my-8'>
           <p className='text-yellow-500'>---{subHeading}---</p>
           <h3 className='uppercase text-3xl border-y-4 py-1 my-3'>{heading}</h3>
        </div>
    );
};

export default CategoryTitle;