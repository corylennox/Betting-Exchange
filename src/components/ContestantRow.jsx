import React from 'react'
import MyButton from './MyButton'
import TeamAndOptionalLogo from './TeamAndOptionalLogo'

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
            <div className='w-full flex justify-center mb-2 h-12  border-black '>
                <TeamAndOptionalLogo image={this.image} name={this.name} />
                <div className='w-full flex justify-end'>
                    <MyButton moneyline={this.moneyline} image={this.image} />
                </div>
            </div>
        )
    }
}
