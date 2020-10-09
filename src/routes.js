import Home from './components/Home.vue';
import Merchants from './components/Merchants.vue';
import About from './components/About.vue';
import MerchantForm from './components/MerchantForm';
import ActivityList from './components/ActivityList'

export default[
    {path:'/',component:Home},
    {path:'/merchants',component:Merchants},
    {path:'/about',component:About},
    {path:'/merchant/form',component:MerchantForm},
    {path:'/activityList',component:ActivityList}
]