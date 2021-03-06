// Import vue, vuex, localstorage
import Vue from "nativescript-vue";
import Vuex from "vuex";
import * as AppSetting from "application-settings";

// Import components: app, login, homex
import App from "./components/App";
import Login from "./components/Login";
import Home from "./components/Home";


// Import home student 
import HomeStudent from "./components/Student/Home";
import DrawerContentStudent from "./components/Student/DrawerContent";



// Import home teacher
import HomeTeacher from "./components/Teacher/Home";
import DrawerContentTeacher from "./components/Teacher/DrawerContent";


// Import menu app
// import DrawerContent from "./components/DrawerContent";
import RadSideDrawer from "nativescript-ui-sidedrawer/vue";

// Import data vuex
import store from "./store";
import {mapState, mapActions} from 'vuex';

// Import locale
import vi from './assets/lang/vi.json';
import en from './assets/lang/en.json';

// Import authO
var auth_service_1 = require("./service/auth-service");
auth_service_1.configureOAuthProviders();

// Material
// import ButtonPlugin from 'nativescript-material-button/vue';



Vue.config.silent = (TNS_ENV === 'production');

Vue.use(Vuex);
Vue.use(RadSideDrawer);


Vue.mixin({
  computed: {
    ...mapState('auth',['domain']),
    // CHECK LOCALSTORAGE AND VUEX
    checkLogin() {
      let token = AppSetting.getString('token');
      if(token){
        this.setToken(token);
        return true;
      }
      return false;
    },

    // LOGIN SUCCESS ANS REDIRECT HOME
    redirectHome() {
      return this.Teacher.Home;
    },

    // DRAWE MENU ROLEs
    drawerContent() {
      return this.Teacher.DrawerContent;
    }
  },
  mounted() {

    // CHECK LOCALE
    let getLocale = AppSetting.getString('locale')
    let locale = vi
    if(getLocale == 'vi'){
      locale = vi
    }
    this.setLocale(locale)


  },
  methods: {
    ...mapActions('auth', ['setToken']),
    ...mapActions('locale', ['setLocale'])
  },
  data() {
    return {
      Student: {
        DrawerContent: DrawerContentStudent,
        Home: HomeStudent
      },
      Teacher: {
        DrawerContent: DrawerContentTeacher,
        Home: HomeTeacher
      }
    }
  }
});

new Vue({
    render (h) {
        return h(
          App,
          [
            h(this.drawerContent, { slot: 'drawerContent' }),
            h(this.checkLogin ? this.redirectHome : Login, { slot: 'mainContent' })
          ]
        )
    },
    store
}).$start();