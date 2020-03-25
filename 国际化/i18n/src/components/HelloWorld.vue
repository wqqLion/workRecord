<template>
  <div class="hello">
    {{$t('lang.users.lang')}}
    <button @click="changeLang('zh-TW')">切换</button>
    {{$t('lang.json.data')}}
  </div>
</template>

<script>
import {loadLanguageAsync} from '../main'
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  methods: {
    changeLang(lang) {
      // this.$i18n.locale = lang; //语言切换
      // this.$store.commit("updateLang", lang); //保存到vuex
      // this.loadLanguageAsync('zh-TW')
      loadLanguageAsync('zh-TW')
    },
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
