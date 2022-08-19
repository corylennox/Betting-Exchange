import React from 'react'
import MyButton from './MyButton'
import { CloudIcon } from "@heroicons/react/solid";
import { Teams } from './data';

export default class TeamLine extends React.Component {
    constructor(props) {
        super(props);
        this.test = Teams.at(1).team;
        this.state = {
            test: "test",
            test2: "test",
        };
    };

    ChangeText = () => {
        this.setState({
            test: "changed",
            test2: "changed",
        });
    };
    
    render() {
        return (
            <div className=' h-full w-full flex justify-center'>
                <div className='w-2/3  items-center flex justify-center'>
                    <CloudIcon onClick={this.ChangeText} className='w-8 h-8 ml-1 fill-green-600' />
                    <body className='text-black'>{this.state.test}</body>
                </div>
                <div className='w-1/3  flex justify-center'>
                    <MyButton />
                </div>

            </div>
        )
    }
}

