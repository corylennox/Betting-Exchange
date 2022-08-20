import React from 'react'
import MyButton from './MyButton'
import { CloudIcon } from "@heroicons/react/solid";
//import { Teams } from './data';

export default class TeamLine extends React.Component {
    render() {
        return (
            <div className='border-2 border-yellow-600 h-full w-full flex justify-center'>
                <div className='w-2/3  items-center flex justify-center'>
                    <CloudIcon className='w-8 h-8 ml-1 fill-green-600' />
                    <body className='text-black'>{this.props.team}</body>
                </div>
                <div className='w-1/3  flex justify-center'>
                    <MyButton />
                </div>

            </div>
        )
    }
}

