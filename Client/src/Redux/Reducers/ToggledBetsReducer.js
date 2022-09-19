//import { BreakingChangeType } from "graphql";

// buttonId: 453
// line: -200
// wager: 3
// win: 1.5

// submit

// A class with the same interface as a Map, but uses a paired array as the underlying data structure
// class ArrayMap {
//     constructor() {
//         this.arr = [];
//     }

//     has(key) {
//         for (let i = 0; i < this.arr.length; i++)
//         {
//             if (this.arr[i].key == key)
//                 return true;
//         }
//         return false;
//     }

//     set(key, value) {
//         for (let i = 0; i < this.arr.length; i++)
//         {
//             if (this.arr[i].key == key)
//             {
//                 this.arr[i].value = value;
//                 return;
//             }
//         }
//         this.arr.push({key: key, value: value});
//     }

//     delete(key) {
//         for (let i = 0; i < this.arr.length; i++)
//         {
//             if (this.arr[i].key == key)
//             {
//                 this.arr.splice(i, 1);
//                 return true;
//             }
//         }
//         return false;
//     }

//     getAsList() {
//         return this.arr;
//     }
// }

const toggledBetsReducer = (state = new Map(), action) => {
  if (!action.payload) return state;

  const buttonId = action.payload.buttonId;

  switch (action.type) {
    case "MY_BUTTON_CLICKED":
      if (state.has(buttonId)) state.delete(buttonId);
      else state.set(buttonId, { betInfo: action.payload.betInfo, wager: 0 });
      break;
    case "DELETE_BET":
      state.delete(buttonId);
      break;
    case "WAGER_CHANGED":
      break;
    default:
  }
  return state;
};

export default toggledBetsReducer;
