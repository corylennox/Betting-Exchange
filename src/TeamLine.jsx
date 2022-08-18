import React from 'react'
import MyButton from './MyButton'
import { CloudIcon } from "@heroicons/react/solid";

export default function TeamLine() {
    return (
        <div className='border-2 border-blue-600 h-full w-full flex item'>
            <div className='border-2 border-red-600 items-center flex'>
                <CloudIcon className='w-8 h-8 ml-1 fill-green-600' />
                <body className='text-black'>Boston Celtics</body>
            </div>
            <MyButton />
        </div>
    )
}
