import React from 'react'
import MyButton from './MyButton'
import { CloudIcon } from "@heroicons/react/solid";

export default class Contestant extends React.Component {
    constructor(props) {
        super(props);
    
        this.contestant = props.contestantData.contestant;
        this.img = props.contestantData.img;
        this.line = props.contestantData.line;

    }
    render() {
        return (
            <div className='border-2 border-yellow-600 h-full w-full flex justify-center'>
                <div className='w-2/3  items-center flex justify-center'>
                    <CloudIcon className='w-8 h-8 ml-1 fill-green-600' />
                    <body className='text-black'>{this.contestant}</body>
                </div>
                <div className='w-1/3  flex justify-center'>
                    <MyButton moneyline={this.line}/>
                </div>

            </div>
        )
    }
}

