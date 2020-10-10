import Index from './components/Index.vue'
import About from './components/About.vue'
import Merchants from './components/Merchants.vue'
import VisitDate from './components/VisitDate.vue'
import VisitLocation from './components/VisitLocation.vue'
import Activities from './components/Activities.vue'


export default[
    {path:'/aboutus',component:About},
    {path:'/',component:Index},
    {path:'/merchants',component:Merchants},
    {path:'/date',component:VisitDate},
    {path:'/location',component:VisitLocation},
    {path:'/activities',component:Activities}
    
]