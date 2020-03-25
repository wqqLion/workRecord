import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false
import test from '../public/lang/index' 

import VueI18n from 'vue-i18n'
Vue.use(VueI18n)
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: store.state.currentLang, // 语言标识,默认汉语,
  //  messages: {
  //    'en-US': require("./assets/lang/en"),
  //    'zh-CN': require("./assets/lang/zh-CN.js"),
  //    'zh-TW': require("./assets/lang/zh-TW")
  //  }
});
// Vue.prototype.change = 
const loadedLanguages = [] // 我们已經加載的语言
function setI18nLanguage(lang) {
  i18n.locale = lang
  // store.commit('res_lang', lang);
  return lang
}
export function loadLanguageAsync(lang) {
  
  if (i18n.locale !== lang) {
    if (!loadedLanguages.includes(lang)) {
      console.log(lang)
      /* webpackChunkName: "lang-[request]" */
      // return import(`../public/lang/index`).then(msgs => {
      //   console.log(msgs)
        i18n.setLocaleMessage(lang, test(lang))
      //   loadedLanguages.push(lang)
      //   return setI18nLanguage(lang)
      // })
      // console.log(test)
    }
    return Promise.resolve(setI18nLanguage(lang))
  }
  return Promise.resolve(lang)
}

router.beforeEach((to, from, next) => {
  const lang = to.params.lang || 'en'
  loadLanguageAsync(lang).then(() => {
    next()
  })
})
new Vue({
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')