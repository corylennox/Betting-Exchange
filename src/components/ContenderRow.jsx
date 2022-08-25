import React from 'react'
import MyButton from './MyButton'
import TeamAndOptionalLogo from './TeamAndOptionalLogo'

export default class ContenderRow extends React.Component {
    constructor(props) {
        super(props);

        this.name = props.contenderData.name;
        this.image = props.contenderData.image;
        this.moneyline = props.contenderData.moneyline;
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
            <div className='w-full flex justify-center mb-2 h-12  border-black '>
                <TeamAndOptionalLogo image={this.image} name={this.name} />
                <div className='w-full flex justify-end'>
                    <MyButton moneyline={this.moneyline} image={this.image} />
                </div>
            </div>
        )
    }
}
