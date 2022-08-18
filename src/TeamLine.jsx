import React from 'react'
import MyButton from './MyButton'
import { ArrowRightIcon } from "@heroicons/react/solid";

export default function TeamLine() {
    return (
        <div className='flex items-center justify-between max-w-lg '>
            <div className='flex'>
                <body className=''>Boston Celtics</body>
                <ArrowRightIcon className='w-5 h-5 ml-1' />
            </div>
            <MyButton />
        </div>
    )
}
