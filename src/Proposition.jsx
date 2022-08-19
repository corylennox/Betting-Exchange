import React, { Component } from 'react'
import TeamLine from './TeamLine'

export default class Proposition extends Component {
    render() {
        return (
            <div className='h-full w-full border-2 border-red-600'>
                <h2 className='text-white text-xl'>NBA Championship</h2>
                <div class="grid grid-cols-3 mb-4 border-2 border-green-600">

                    <div class="mb-4 bg-gray-400 h-12"><TeamLine /></div>
                    <div class="mb-4 bg-gray-500 h-12"><TeamLine /></div>
                    <div class="mb-4 bg-gray-400 h-12"><TeamLine /></div>
                    <div class="mb-4 bg-gray-500 h-12"><TeamLine /></div>
                    <div class="mb-4 bg-gray-400 h-12"><TeamLine /></div>
                </div>



            </div>
        )
    }
}


