<template>
  <router-view></router-view>
  <SideMenu />
</template>


<script>
import SideMenu from './components/miltyUseComp/SideMenu'

export default {
  components: {    
    SideMenu
  },
}
</script>

<style>
#app {
  width: 90%;
  padding-bottom: 5px;
  margin: 0 auto; 
  padding-top: 20px;
}
</style>
