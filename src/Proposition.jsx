import React, { Component } from 'react'
import TeamLine from './TeamLine'

export default class Proposition extends Component {
    render() {
        return (
            <div className=''>
                <h2 className='text-white text-xl'>NBA Championship</h2>
                <div class="flex flex-wrap -mb-4">
                    <div class="w-1/3 mb-4 bg-gray-400 h-12"><TeamLine/></div>
                    <div class="w-1/3 mb-4 bg-gray-500 h-12"></div>
                    <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
                    <div class="w-1/3 mb-4 bg-gray-500 h-12"></div>
                    <div class="w-1/3 mb-4 bg-gray-400 h-12"></div>
                </div>



            </div>
        )
    }
}


