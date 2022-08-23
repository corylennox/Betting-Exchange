import React from 'react'
import MyButton from './MyButton'

export default class ContestantRow extends React.Component {
    constructor(props) {
        super(props);

        this.name = props.contestantData.name;
        this.image = props.contestantData.image;
        this.moneyline = props.contestantData.moneyline;
        this.renderImage = this.renderImage.bind(this);
    }

    renderImage() {
        if(this.image)
        {
            return (<img
                alt={this.name}
                className="w-8 h-8 ml-1"
                src={this.image}
            />)
        }
    }

    render() {
        return (
            <div className='h-full w-full flex justify-center'>
                <div className='w-full items-center flex justify-left'>
                    {this.renderImage()}
                    <body className='min-w-fit text-gray-700 text-sm font pl-3'>{this.name}</body>
                </div>
                <div className='w-full flex justify-end'>
                    <MyButton moneyline={this.moneyline} image={this.image} />
                </div>
            </div>
        )
    }
}

