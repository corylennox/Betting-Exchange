import React from 'react'

export default class ContenderAndIcon extends React.Component {
    constructor(props) {
        super(props);
        this.name = props.name;
        this.image = props.image;
        this.renderOptionalImage = this.renderOptionalImage.bind(this);
    }

    renderOptionalImage() {
        if(this.image)
        {
            return (<img
                alt={this.props.name}
                className="w-8 h-8"
                src={this.props.image}
            />)
        }
    }

    render() {
        return (
            <div className='w-full items-center flex justify-left'>
                {this.renderOptionalImage()}
                <body className='min-w-fit text-gray-700 text-md font-normal pl-3'>{this.name}</body>
            </div>
        )
    }
}
