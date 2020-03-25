<template>
  <div id="app">
    <div id="nav">
    <button @click="changeLang('zh')">切换</button>
    {{$t('data.data')}}
    </div>
  </div>
</template>
<script>
import {loadLanguageAsync} from './main'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  mounted(){
    console.log(this.$i18n)
  },
  methods: {
    changeLang(lang) {
      // this.$i18n.locale = lang; //语言切换
      // this.$store.commit("updateLang", lang); //保存到vuex
      // this.loadLanguageAsync('en')
      loadLanguageAsync('zh')
    },
    
  }
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
