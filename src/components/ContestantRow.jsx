import React from 'react'
import MyButton from './MyButton'
//import { CloudIcon } from "@heroicons/react/solid";

export default class ContestantRow extends React.Component {
    constructor(props) {
        super(props);

        this.contestant = props.contestantData.contestant;
        this.image = props.contestantData.image;
        this.moneyline = props.contestantData.moneyline;

    }
    render() {
        return (
            <div className='h-full w-full flex justify-center'>
                <div className='w-2/3  items-center flex justify-center'>
                    {/*<CloudIcon className='w-8 h-8 ml-1 fill-green-600' />*/}

                    <img
                        alt={this.contestant}
                        className="w-8 h-8 ml-1"
                        src={this.image}
                    />

                    <body className='text-black pl-3'>{this.contestant}</body>
                </div>
                <div className='w-1/3  flex justify-center'>
                    <MyButton moneyline={this.moneyline} image={this.image} />
                </div>

            </div>
        )
    }
}

