import { createStackNavigator } from 'react-navigation'

import { TransitionConfig } from './RouteTransitionConfig'

// @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
import Splash from './../app/Splash'
import SplashLoading from './../app/SplashLoading'
import CheckUser from '../aaa/authentication/CheckUser'
import Services from '../services/Services'
import Notifications from '../notifications/Notifications'
import Profile from '../profile/Profile'
import PhoneNumberVerification from './../aaa/authentication/PhoneNumberVerification'
import CheckOrders from './../orders/CheckOrders'
import SelectTimeAndDate from './../services/serviceRequest/SelectTimeAndDate'
import FinancialTransaction from '../profile/FinancialTransactions'
import MedicalConsiderations from './../profile/MedicalConsiderations'
import CompleteProfile1 from './../aaa/authentication/CompleteProfile1'
import CompleteProfile2 from './../aaa/authentication/CompleteProfile2'
import CompleteProfile3 from './../aaa/authentication/CompleteProfile3'
import PhoneNumberVerificationUnsuccessful from './../aaa/authentication/PhoneNumberVerificationUnsuccessful'
import Reletives from './../profile/Reletives'
import ReletiveAdd from './../profile/ReletiveAdd'
import SuccessfulRequest from './../services/serviceRequest/SuccessfulRequest'
import ReletiveEdit from './../profile/ReletiveEdit'
import ServiceRequest from './../services/serviceRequest/ServiceRequest'
import Setting from './../profile/setting/Setting'
import AboutUs from './../profile/setting/AboutUs'
import EditProfile from './../profile/setting/EditProfile'
import Ongoing from './../orders/Ongoing'
import OngingOrderDetails from './../orders/OngoingOrderDetails'
import OngoingInovice from './../orders/OngoingInovice'
import OrderTimeLine from './../orders/OngoingTimeline'
import PeopleSelected from './../services/serviceRequest/PeopleSelected'
import Orders from './../orders/Orders'
import FavoriteAddresses from './../profile/FavoriteAddresses'
import DoneAndStarred from './../orders/DoneAndStarred'
import AllowEntry from './../notifications/AllowEntry'
import ServiceAccepted from './../notifications/ServiceAccepted'
import SelectLocationFromMap from './../services/serviceRequest/SelectLocationFromMap'
import Invoice from './../services/serviceRequest/Invoice'
import compeleteServiceList from '../orders/compeleteServiceList'

const Route = createStackNavigator(
  {
    Splash: { screen: Splash },
    SplashLoading: { screen: SplashLoading },
    CheckUser: { screen: CheckUser },
    Services: { screen: Services },
    Notifications: { screen: Notifications },
    Profile: { screen: Profile },
    PhoneNumberVerification: { screen: PhoneNumberVerification },
    CheckOrders: { screen: CheckOrders },
    FinancialTransaction: { screen: FinancialTransaction },
    MedicalConsiderations: { screen: MedicalConsiderations },
    CompleteProfile1: { screen: CompleteProfile1 },
    CompleteProfile2: { screen: CompleteProfile2 },
    CompleteProfile3: { screen: CompleteProfile3 },
    SuccessfulRequest: { screen: SuccessfulRequest },
    Reletives: { screen: Reletives },
    ServiceRequest: { screen: ServiceRequest },
    ReletiveAdd: { screen: ReletiveAdd },
    ReletiveEdit: { screen: ReletiveEdit },
    Setting: { screen: Setting },
    EditProfile: { screen: EditProfile },
    Ongoing: { screen: Ongoing },
    OngingOrderDetails: { screen: OngingOrderDetails },
    OngoingInovice: { screen: OngoingInovice },
    OrderTimeLine: { screen: OrderTimeLine },
    SelectTimeAndDate: { screen: SelectTimeAndDate },
    PeopleSelected: { screen: PeopleSelected },
    AboutUs: { screen: AboutUs },
    Orders: { screen: Orders },
    compeleteServiceList: { screen: compeleteServiceList },
    DoneAndStarred: { screen: DoneAndStarred },
    FavoriteAddresses: { screen: FavoriteAddresses },
    AllowEntry: { screen: AllowEntry },
    Notifications: { screen: Notifications },
    ServiceAccepted: { screen: ServiceAccepted },
    SelectLocationFromMap: { screen: SelectLocationFromMap },
    PhoneNumberVerificationUnsuccessful: {
      screen: PhoneNumberVerificationUnsuccessful
    },
    Invoice: { screen: Invoice }
  },
  {
    initialRouteName: 'Splash',
    TransitionConfig
  }
)
const prevGetStateForAction = Route.router.getStateForAction
Route.router.getStateForAction = (action, state) => {
  // Do not allow to go back from Home
  if (
    action.type === 'Navigation/BACK' &&
    state &&
    state.routes[state.index].routeName === 'Services'
  ) {
    return null
  }
  return prevGetStateForAction(action, state)
}

export default Route
