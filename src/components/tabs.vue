
<template>
    <div>
        <div class="tabs is-boxed is-centered">
            <ul>
                <li v-for="tab in tabs" :key="tab.name" :class="{'is-active':tab.isActive}">
                    <a :display="tab.disp" :href="tab.href" @click="selectTab(tab)">
                            {{tab.name}}
                    </a>
                </li>
            </ul>
        </div>
        <div class="tabs-details">
            <slot></slot>
            <p style="height:20px;"></p>
        </div>
    </div>
</template>

<script>
import tab from './tab';
export default {
  name: 'tabs',
  components:{
      tab
  },
  data(){
      return{"tabs": []}
  },
  created(){
      this.tabs = this.$children;
  },
  "methods": {
      "selectTab": function(selectedTab){
          this.tabs.forEach(function(tab){
              tab.isActive = tab.name === selectedTab.name;

          });
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
