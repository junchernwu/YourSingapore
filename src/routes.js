import Home from './components/Home.vue';
import Merchants from './components/Merchants.vue';
import About from './components/About.vue'
import MerchantForm from './components/MerchantForm'
import VisitDate from './components/VisitDate.vue'
import VisitLocation from './components/VisitLocation.vue'
import Activities from './components/Activities.vue'
import Reminder from './components/Reminder.vue'


export default[
    {path:'/',component:Home},
    {path:'/about',component:About},
    {path:'/merchant/form',component:MerchantForm},
    {path:'/',component:Home},
    {path:'/merchants',component:Merchants},
    {path:'/date',component:VisitDate},
    {path:'/location',component:VisitLocation},
    {path:'/activities',component:Activities},
    {path:'/reminder',component:Reminder}
    
]