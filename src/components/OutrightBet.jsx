import React, { Component } from "react";
import MyButton from "./MyButton";

class OutrightBetContenderRow extends React.Component {
  // renderImage() {
  //     if(this.props.contenderData.image)
  //     {
  //         return (<img
  //             alt={this.props.contenderData.name}
  //             className="w-8 h-8 ml-1"
  //             src={this.props.contenderData.image}
  //         />)
  //     }
  // }
  render() {
      return (
          <div className='w-full flex justify-center mb-2 h-12  border-black '>
              {this.props.contenderData}
              <div className='w-full flex justify-end'>
                  <MyButton moneyline="100" image={this.props.contenderData.image} />
              </div>
          </div>
      )
  }
}

export default class OutrightBet extends Component {
  constructor(props) {
    super(props);
    //this.props.outrightBetData.contendersData.sort(function (a, b) { return a.moneyline - b.moneyline })
  }

  render() {
    return (
      <div className='bg-slate-100 rounded-2xl p-3 drop-shadow-md shadow-lg mb-3'>
        <h2 className="flex font-semibold text-blue-900 text-xl">{this.props.outrightBetData.title}</h2>
        <h3 className=" pb-2 font-semibold text-slate-900 text-md">Outright Bet</h3>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6">
          {//print rows
            this.props.outrightBetData.contendersData.map((contenderData) => (
              <OutrightBetContenderRow contenderData={contenderData} />
            ))
          }
        </div>
      </div>
    );
  }
}
