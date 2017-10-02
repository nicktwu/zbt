/**
 * Created by nwu on 9/27/17.
 */
import HomeIcon from 'material-ui-icons/Home';
import TradeIcon from 'material-ui-icons/CompareArrows';
import MidnightIcon from 'material-ui-icons/Alarm'
import HouseIcon from 'material-ui-icons/Assignment'
import SocialIcon from 'material-ui-icons/AccountCircle';
import {Home} from '../components/Home';
import {Trades} from '../components/Trades';

export const HOME="/";
export const LOGIN="/login";
export const TRADES_HOME="/trades";
export const MIDNIGHTS_HOME="/midnights";
export const WORKDAYS_HOME="/workdays";
export const SOCIAL_HOME="/social";


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
    icon: MidnightIcon
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
  }
];