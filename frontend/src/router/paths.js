/**
 * Created by nwu on 9/27/17.
 */
import HomeIcon from 'material-ui-icons/Home';
import TradeIcon from 'material-ui-icons/CompareArrows';
import MidnightIcon from 'material-ui-icons/Brightness2';
import HouseIcon from 'material-ui-icons/Assignment';
import SocialIcon from 'material-ui-icons/Group';
import BuildIcon from 'material-ui-icons/Build';
import {Home} from '../components/Home';
import {Trades} from '../components/Trades';
import {Administration} from '../components/Administration';
import Midnights from '../components/Midnights';

const BASE = "/todo";
export const HOME=BASE+"/";
export const LOGIN=BASE+"/login";
export const TRADES_HOME=BASE+"/trades";
export const MIDNIGHTS_HOME=BASE+"/midnights";
export const WORKDAYS_HOME=BASE+"/workdays";
export const SOCIAL_HOME=BASE+"/social";
export const SETTINGS_HOME=BASE+"/settings";

export const internalPaths = [
  {
    path: HOME,
    exact: true,
    text: "Home",
    icon: HomeIcon,
    component: Home,
  },
  {
    path: TRADES_HOME,
    exact: false,
    text: "Trades",
    icon: TradeIcon,
    component: Trades
  },
  {
    path: MIDNIGHTS_HOME,
    exact: false,
    text: "Midnights",
    icon: MidnightIcon,
    component: Midnights
  },
  {
    path: WORKDAYS_HOME,
    exact: false,
    text: "Workdays",
    icon: HouseIcon,
  },
  {
    path: SOCIAL_HOME,
    exact: false,
    text: "Social",
    icon: SocialIcon
  },
  {
    path: SETTINGS_HOME,
    exact: false,
    text: "Administration",
    icon: BuildIcon,
    component: Administration,
  }
];