
<template>
    <div v-show="isActive">
        <slot></slot>
    </div>
</template>

<script>
export default {
  name: 'tab',
  props:[
      'name',
      'selectedtab'
  ],
  data(){
      return{isActive: false}
  },
  computed:{
      disp(){
          this.isActive = this.selectedtab;
          return "";
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
