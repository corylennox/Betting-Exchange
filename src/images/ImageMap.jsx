import { ReactComponent as FireSvgRaw } from './fire.svg';
import { ReactComponent as BasketballSvgRaw } from './basketball.svg';
import { ReactComponent as BaseballSvgRaw } from './baseball.svg';
import { ReactComponent as SoccerSvgRaw } from './soccer.svg';

const ImageMap = new Map([
    ["featured", <FireSvgRaw className="w-5 h-5 text-white"/>],
    ["featuredAlternate", <FireSvgRaw className="w-5 h-5 text-black"/>],
    ["basketball", <BasketballSvgRaw className="w-5 h-5 text-white"/>],
    ["basketballAlternate", <BasketballSvgRaw className="w-5 h-5 text-blue-500"/>],
    ["baseball", <BaseballSvgRaw className="w-5 h-5 text-white"/>],
    ["baseballAlternate", <BaseballSvgRaw className="w-5 h-5 text-blue-500"/>],
    ["soccer", <SoccerSvgRaw className="w-5 h-5 text-white"/>],
    ["soccerAlternate", <SoccerSvgRaw className="w-5 h-5 text-blue-500"/>],
]);

export default ImageMap;
