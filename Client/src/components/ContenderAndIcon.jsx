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
                <h1 className='w-full text-gray-700 text-sm font-medium font-sans pl-3 mr-4'>{this.name}</h1>
            </div>
        )
    }
}
