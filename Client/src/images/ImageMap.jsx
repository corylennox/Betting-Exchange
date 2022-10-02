import { ReactComponent as FireSvgRaw } from './fire.svg';
import { ReactComponent as BasketballSvgRaw } from './basketball.svg';
import { ReactComponent as BaseballSvgRaw } from './baseball.svg';
import { ReactComponent as SoccerSvgRaw } from './soccer.svg';

const ImageMap = new Map([
    ["featured", <FireSvgRaw className="w-5 h-5 text-skin-header"/>],
    ["featuredAlternate", <FireSvgRaw className="w-5 h-5 text-black"/>],
    ["basketball", <BasketballSvgRaw className="w-5 h-5 text-skin-header"/>],
    ["basketballAlternate", <BasketballSvgRaw className="w-5 h-5 text-skin-actionUnselected"/>],
    ["baseball", <BaseballSvgRaw className="w-5 h-5 text-skin-header"/>],
    ["baseballAlternate", <BaseballSvgRaw className="w-5 h-5 text-skin-actionUnselected"/>],
    ["soccer", <SoccerSvgRaw className="w-5 h-5 text-skin-header"/>],
    ["soccerAlternate", <SoccerSvgRaw className="w-5 h-5 text-skin-actionUnselected"/>],
]);

export default ImageMap;
