import React from 'react'

export default class TeamAndOptionalLogo extends React.Component {
    constructor(props) {
        super(props);

        this.renderOptionalImage = this.renderOptionalImage.bind(this);
    }

    renderOptionalImage() {
        if(this.props.image)
        {
            return (<img
                alt={this.props.name}
                className="w-8 h-8 ml-1"
                src={this.props.image}
            />)
        }
    }

    render() {
        return (
            <div className='w-full items-center flex justify-left'>
                {this.renderOptionalImage()}
                <body className='min-w-fit text-gray-700 text-sm font pl-3'>{this.props.name}</body>
            </div>
        )
    }
}
