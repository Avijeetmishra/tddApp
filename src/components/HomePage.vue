<template>
  <div >
    <div class="field">
      <label class="label has-text-white" for="playerCount">Number of Players</label>
      <div class="control">
        <div class="select">
          <select name="playerCount" id="playerCount" v-model="playercount">
          <option value="2">2 Players</option>
          <option value="3">3 Players</option>
          <option value="4">4 Players</option>
          <option value="5">5 Players</option>
          <option value="6">6 Players</option>
        </select>
        </div>
      </div>
    </div>
      <label class="label has-text-white">Session Name <font-awesome-icon icon="fa-solid fa-user-secret" /></label>
      
    <div class="columns is-centered">
      <div class= "column is-2">
          <input class="input" v-model="sessionname" placeholder="Edit me">
      </div>
      
      <div class= "column is-1">
        <button class="button is-link animate__animated  animate__shakeY"  @click="click_startNewGame">New Game</button>
      </div>
    </div>
    
        <div  v-if="sessionList.length > 0">
            <article class="panel">
              <p class="panel-heading">
                Previous Games
              </p>
              <p class="panel-tabs">
                <a></a>
                <!-- <a>Private</a>
                <a>Sources</a>
                <a>Forks</a> -->
              </p>
              <!-- <div class="panel-block">
                <p class="control has-icons-left">
                  <input class="input is-success" type="text" placeholder="Search">
                  <span class="icon is-left">
                    <i class="fas fa-search" aria-hidden="true"></i>
                  </span>
                </p>
              </div> -->
              <a class="panel-block" :key="session.id + index1"  v-for="(session,index1) in sessionList" @click="click_continueGame(session)">
                <span class="panel-icon">
                  <i class="fas fa-book" aria-hidden="true"></i>
                </span>
                {{session.name}} - {{new Date(session.ts).toLocaleDateString("en-US")}} {{new Date(session.ts).toLocaleTimeString("en-US")}}
              </a>
            </article>
        </div>
  </div>
</template>

<script>
import 'animate.css';
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      "playercount": 6,
      "sessionname": "", 
      "sessionList":[],
      "count": 0
    }
  },
  created(){
     this.sessionList = this.func_fetchGamesList();
  },
  "methods": {
    "func_fetchGamesList": function(){
      window.localStorage.removeItem("sessionList");
        let db = window.localStorage.getItem("sessionListv2");

        if(db){
            return JSON.parse(db); 
        }
        return [];
    },
    "click_deleteGame": function(iv_obj){
          let db = window.localStorage.getItem("sessionListv2");

          if(db){
              db = JSON.parse(db); 
              for(let i = 0; i < db.length; i++){
                  if(db[i].id === iv_obj.id){
                      db.splice(i,1);
                      window.localStorage.setItem("sessionListv2" , JSON.stringify(db));
                      this.func_fetchGamesList();
                      break;
                  }
              }
          }
          else{
              //something went wrong
              console.log("should not happen");
          }
      },
    "click_startNewGame": function(){
      if(this.sessionname === ""){
        this.sessionname = "Eclipse - " + Math.floor(Math.random() * 1000000);
      }
      this.$router.push({ name: 'startNewGame', params: { playercount: parseInt(this.playercount),sessionname: this.sessionname } });
      //this.$router.push({name : "startNewGame", params:{"playercount" : }});
    },
    "click_continueGame": function(iv_obj){
      this.$router.push({ name: 'startNewGame', params: { sessionobj:  iv_obj}});
      //this.$router.push({name : "startNewGame", params:{"playercount" : }});
    },
    "click_login": function(){
        this.$router.push("register");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
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
