import React from 'react'
import MyButton from './MyButton'

export default class ContestantRow extends React.Component {
    constructor(props) {
        super(props);

        this.name = props.contestandData.name;
        this.image = props.contestandData.image;
        this.moneyline = props.contestandData.moneyline;

    }
    render() {
        return (
            <div className='h-full w-full flex justify-center'>
                <div className='w-2/3  items-center flex justify-center'>
                    <img
                        alt={this.name}
                        className="w-8 h-8 ml-1"
                        src={this.image}
                    />

                    <body className='text-black pl-3'>{this.name}</body>
                </div>
                <div className='w-1/3 flex justify-center'>
                    <MyButton moneyline={this.moneyline} image={this.image} />
                </div>

            </div>
        )
    }
}

