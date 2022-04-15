<template>
  <div class="animate__animated animate__fadeInDown">
    <mymodal v-if="openModal" @close="openModal = false">
        <div class="card">
            <header class="card-header">
                <p class="card-header-title">
                {{selectedTech.description}}
                {{selectedTech.cost}}-
                {{selectedTech.minCost}}
                </p>
                <button class="card-header-icon" aria-label="more options">
                <span class="icon">
                    <i class="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            <div class="card-content">
                <div class="content">
                    <img height="70%" width="70%" :src="selectedTech.src" >
                </div>
            </div>
            <footer class="card-footer">
            <button class="button card-footer-item is-info" @click="openModal=false">Close</button>
            <button class="button card-footer-item is-primary" @click="click_purchaseTech(selectedTech)">Purchase</button>
                
            </footer>
            </div>
        
    </mymodal>
    
    <div>
        <tabs>
            <tab name = "Tech Track" :selectedtab = true>
                <div class="columns is-centered" >
                    <div class= "column is-1" v-for="playerObj in playerInfo" :key="playerObj.tempName + playerObj.currentTurn">
                        <button class="button is-success is-light"  >{{playerObj.playerName}} </button>
                    </div>
                </div>
                <div class = "columns is-centered">
                    <div class="column buttons">
                        <button class="button is-success">Current Round : {{currentRound}}</button>
                        <button class="button is-danger" @click="click_nextRound" v-if="currentRound < 8">Start Next Round</button>
                        <button class="button is-info">Players : {{playercount}}</button>
                        <button class="button is-danger" v-if="soundEnabled" @click="click_toggleSound">Disable Sounds</button>
                        <button class="button is-success" v-else @click="click_toggleSound">Enable Sounds</button>
                    </div>
                </div>
                <div class="columns">
                        <div style = "width:12.5%;" class= "column is-2 is-paddingless animate__animated animate__rollIn" :key="militaryTech.id + index3"   v-for="(militaryTech,index3) in randomMilitaryTechData" v-if="militaryTech.available > 0">
                            <img class="" height="50%" width="70%" :src="militaryTech.src"  @click="click_tech(militaryTech, index3)">
                            <div v-if="militaryTech.available === 2" class="overlay_image" :src="images['2X']">2</div>
                            <div v-else-if="militaryTech.available === 3" class="overlay_image" :src="images['3X']">3</div>
                            <div v-else-if="militaryTech.available === 4" class="overlay_image" :src="images['4X']">4</div>
                            <div v-else-if="militaryTech.available === 5" class="overlay_image" :src="images['4X']">5</div>
                        </div>
                </div>
                <div class="columns">
                        <div style = "width:12.5%;" class= "column is-2 is-paddingless animate__animated animate__rollIn" :key="gridTech.id + index2"   v-for="(gridTech,index2) in randomGridTechData"  v-if="gridTech.available > 0">
                            <img height="50%" width="70%" :src="gridTech.src"  @click="click_tech(gridTech, index2)">
                            <div v-if="gridTech.available === 2" class="overlay_image" :src="images['2X']">2</div>
                            <div v-else-if="gridTech.available === 3" class="overlay_image" :src="images['3X']">3</div>
                            <div v-else-if="gridTech.available === 4" class="overlay_image" :src="images['4X']">4</div>
                            <div v-else-if="gridTech.available === 5" class="overlay_image" :src="images['4X']">5</div>
                        </div>
                </div>
                <div class="columns ">
                        <div style = "width:12.5%;" class= "column is-2 is-paddingless animate__animated animate__rollIn" :key="nanoTech.id + index1"  v-for="(nanoTech,index1) in randomNanoTechData" v-if="nanoTech.available>0">
                            <img height="50%" width="70%" :src="nanoTech.src" @click="click_tech(nanoTech, index1)">
                            <div v-if="nanoTech.available === 2" class="overlay_image" >2</div>
                            <div v-else-if="nanoTech.available === 3" class="overlay_image" >3</div>
                            <div v-else-if="nanoTech.available === 4" class="overlay_image" >4</div>
                            <div v-else-if="nanoTech.available === 5" class="overlay_image" >5</div>
                        </div> 
                </div>
                <div class="columns is-multiline">
                        <div style = "width:12.5%;" class= "column is-2 is-paddingless animate__animated animate__rollIn" :key="rareTech.id + index4"  v-for="(rareTech,index4) in randomRareTechData" v-if="rareTech.available > 0">
                            <img height="50%" width="70%" :src="rareTech.src"  @click="click_tech(rareTech, index4)">
                        </div>
                </div>
            </tab>
            <tab name = "Player Info">
                <div class="columns is-left" v-for="playerObj in playerInfo" :key="playerObj.tempName + playerObj.currentTurn">
                    <div class= "column is-1">
                        <button class="button is-link "  >Current Turn : {{playerObj.currentTurn}} </button>
                    </div>
                    <div class= "column is-1">
                        <input class="input" v-model="playerObj.playerName">
                    </div>
                    
                    <div class= "column is-1">
                        <button class="button is-danger"  @click="click_passTurn(playerObj)">Pass</button>
                    </div>
                    <div class= "column is-1">
                        <button class="button is-info"  @click="click_unpassTurn(playerObj)">Unpass</button>
                    </div>
                    
                    <div class= "column is-1" v-if="playerObj.passed">
                        <button class="button is-link "  >Next Round Turn : {{playerObj.nextTurn}}</button>
                    </div>
                </div>
            </tab>
        </tabs>
    </div>

    
    
    
    
  </div>
</template>

<script>
import 'animate.css';
import mymodal from './mymodal';
import tabs from './tabs';
import tab from './tab';
export default {
  name: 'StartNewGame',
  components:{
    mymodal,
    tabs,
    tab
  },
   props: {
    playercount: {
      type: Number,
      default: 6
    },
    sessionname: {
      type: String,
      default: "Eclipse - " 
    },
    sessionobj: {
      type: Object,
      default: null
    }
  },
  created(){

      if(this.sessionobj!== null){
          this.func_continueGame(this.sessionobj);
          return;
      }

      //Create techData array
      function compareNumbers(a, b) {
            return a.cost - b.cost;
            }
      for(let i = 0; i < this.rawTechData.length; i++){
          let count = this.rawTechData[i].count;
          while(count>0){

              this.techData.push(JSON.parse(JSON.stringify(this.rawTechData[i])));
              count--;

          }
      }

        //create player table
        for(let i = 1 ; i < this.playercount; i++){
            let count = i+1;
            let playerObj = {
                "tempName": "Player" + count,
                "playerName" : "",
                "currentTurn": count,
                "nextTurn": count,
                "previousTurn": count,
                "passed" : false
            };
            this.playerInfo.push(playerObj);
        }

      let obj = this.func_createRandomTechArray(1);
      this.randomNanoTechData = [];
      this.randomNanoTechData = JSON.parse(JSON.stringify(obj.nanoTech.data));
      for(let i = 0 ; i < obj.nanoTech.repeat.length; i++){
          for(let j = 0 ; j < this.randomNanoTechData.length; j++){
              if(this.randomNanoTechData[j].id === obj.nanoTech.repeat[i]){
                  this.randomNanoTechData[j].available++;
              }
          }
      }
      this.randomNanoTechData.sort(compareNumbers);

      this.randomGridTechData = [];
      this.randomGridTechData = JSON.parse(JSON.stringify(obj.gridTech.data));
      for(let i = 0 ; i < obj.gridTech.repeat.length; i++){
          for(let j = 0 ; j < this.randomGridTechData.length; j++){
              if(this.randomGridTechData[j].id === obj.gridTech.repeat[i]){
                  this.randomGridTechData[j].available++;
              }
          }
      }
      this.randomGridTechData.sort(compareNumbers);

      this.randomMilitaryTechData = [];
      this.randomMilitaryTechData = JSON.parse(JSON.stringify(obj.militaryTech.data));
      for(let i = 0 ; i < obj.militaryTech.repeat.length; i++){
          for(let j = 0 ; j < this.randomMilitaryTechData.length; j++){
              if(this.randomMilitaryTechData[j].id === obj.militaryTech.repeat[i]){
                  this.randomMilitaryTechData[j].available++;
              }
          }
      }
      this.randomMilitaryTechData.sort(compareNumbers);
      
      this.randomRareTechData = [];
      this.randomRareTechData = JSON.parse(JSON.stringify(obj.rareTech.data));
      this.randomRareTechData.sort(compareNumbers);

      let dataObj = this.func_createDataObjToSave(this.dataObjToSave, this.currentRound, this.sessionname, 
      this.randomNanoTechData, this.randomGridTechData, this.randomMilitaryTechData, this.randomRareTechData, this.techData, this.playercount,this.techCount, this.playerInfo);

      this.func_saveDataObj(dataObj);
      if(this.soundEnabled){
            var audio = new Audio(this.nextRoundSoundLocation);
            audio.play();
      }
  },
  data () {
    return {
        "playerInfo":[
            {
                "tempName": "Player1",
                "playerName" : "",
                "currentTurn": 1,
                "nextTurn": 1,
                "previousTurn": 1,
                "passed" : false
            }
        ],
        "dataObjToSave":{
            "id": null,
            "ts": null,
            "updateTs": null,
            "name": null,
            "currentRound": 1,
            "randomNanoTechData":[],
            "randomGridTechData":[],
            "randomMilitaryTechData":[],
            "randomRareTechData":[],
            "techData":[]
        },
        "soundEnabled": true,
      "openModal":false,
      "selectedTech":{},
      "currentRound": 1,
      "randomSoundIndex": 0,
      "nextRoundSoundLocation": require("@/assets/sound.wav"),
      "buySoundLocation": [ require("@/assets/fireWorkSound.wav"), 
                            require("@/assets/eightbitsound.wav"),
                            require("@/assets/sound3.wav"),
                            require("@/assets/sound4.wav"),
                            require("@/assets/sound5.wav"),
                            require("@/assets/sound6.wav"),
                            require("@/assets/sound7.wav"),
                            require("@/assets/sound8.wav"),
                            require("@/assets/sound9.wav"),
                            require("@/assets/sound10.mp3")],
      "images":{
          "2X": require("@/assets/2X.png"),
          "3X": require("@/assets/3X.png"),
          "4X": require("@/assets/4X.png"),
      },
      "techCount":{
          "nanoTech":{
              "1":4,
              "2":5,
              "3":3,
              "4":5,
              "5":3,
              "6":5,
              "7":5,
              "8":3
          },
          "gridTech":{
              "9":4,
              "10":3,
              "11":5,
              "12":5,
              "13":5,
              "14":5,
              "15":3,
              "16":3
          },
          "militaryTech":{
              "17":4,
              "18":3,
              "19":5,
              "20":5,
              "21":5,
              "22":3,
              "23":5,
              "24":3
          },
          "rareTech":{
              "25":1,
              "26":1,
              "27":1,
              "28":1,
              "29":1,
              "30":1,
              "31":1,
              "32":1,
              "33":1,
              "34":1,
              "35":1,
              "36":1,
              "37":1,
              "38":1,
              "39":1,
              "40":1
          }
      },
      "count": 0,
      "techData":[],
      "randomNanoTechData":[{
          "type":"nanoTech",
          "id": "1",
          "count":4,
          "name": "Advanced Labs",
          "src": require("@/assets/Tech/Advanced-labs.jpg"),
          "description": "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      }],
      "randomGridTechData":[{
          "type":"nanoTech",
          "id": "1",
          "count":4,
          "name": "Advanced Labs",
          "src": require("@/assets/Tech/Advanced-labs.jpg"),
          "description": "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      }],
      "randomMilitaryTechData":[{
          "type":"nanoTech",
          "id": "1",
          "count":4,
          "name": "Advanced Labs",
          "src": require("@/assets/Tech/Advanced-labs.jpg"),
          "description": "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      }],
      "randomRareTechData":[{
          "type":"nanoTech",
          "id": "1",
          "count":4,
          "name": "Advanced Labs",
          "src": require("@/assets/Tech/Advanced-labs.jpg"),
          "description": "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      }],
      "rawTechData":[
          {
          "type":"nanoTech",
          "id": "1",
          "count":4,
          "name": "Advanced Labs",
          "src": require("@/assets/Tech/Advanced-labs.jpg"),
          "description": "You may place Population Cubes in Advanced Science Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "2",
          "count":5,
          "name": "Advanced Robotics",
          "src": require("@/assets/Tech/Advanced-robotics.jpg"),
          "description": "You receive one additional Influence Disc, placed immediately on your Influence Track.",
          "cost":8,
          "minCost":5,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "3",
          "count":3,
          "name": "Artifact Key",
          "src": require("@/assets/Tech/Artifact-key.jpg"),
          "description": "For each Artifact on Sectors you Control, immediately gain 5 Resources of a single type.",
          "cost":16,
          "minCost":8,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "4",
          "count":5,
          "name": "Fusion Drive",
          "src": require("@/assets/Tech/Fusion-drive.jpg"),
          "description": "You may Upgrade your Ship Blueprints with fusion drive Ship Parts.",
          "cost":4,
          "minCost":3,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "5",
          "count":3,
          "name": "Monolith",
          "src": require("@/assets/Tech/Monolith.jpg"),
          "description": "You may Build Monoliths.",
          "cost":12,
          "minCost":6,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "6",
          "count":5,
          "name": "Nanorobots",
          "src": require("@/assets/Tech/Nanorobots.jpg"),
          "description": "You have one extra Activation when taking the Build Action.",
          "cost":2,
          "minCost":2,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "7",
          "count":5,
          "name": "Orbital",
          "src": require("@/assets/Tech/Orbital.jpg"),
          "description": "You may Build Orbitals.",
          "cost":6,
          "minCost":4,
          "available":0
      },
      {
          "type":"nanoTech",
          "id": "8",
          "count":3,
          "name": "Wormhole Generator",
          "src": require("@/assets/Tech/Wormhole-generator.jpg"),
          "description": "You may Explore, Move to, and Influence adjacent Sectors if the edges connecting the Sectors contain one Wormhole.",
          "cost":14,
          "minCost":7,
          "available":0
          
      },
      {
          "type":"gridTech",
          "id": "9",
          "count":4,
          "name": "Advanced Economy",
          "src": require("@/assets/Tech/Advanced-economy.jpg"),
          "description": "You may place Population Cubes in Advanced Money Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "10",
          "count":3,
          "name": "Antimatter Cannon",
          "src": require("@/assets/Tech/Antimatter-cannon.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Antimatter Cannon Ship Parts.",
          "cost":14,
          "minCost":7,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "11",
          "count":5,
          "name": "Fusion Source",
          "src": require("@/assets/Tech/Fusion-source.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Fusion Source Ship Parts.",
          "cost":4,
          "minCost":3,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "12",
          "count":5,
          "name": "Gauss Shield",
          "src": require("@/assets/Tech/Gauss-shield.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Gauss Shield Ship Parts.",
          "cost":2,
          "minCost":2,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "13",
          "count":5,
          "name": "Improved Hull",
          "src": require("@/assets/Tech/Improved-hull.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Improved Hull Ship Parts.",
          "cost":6,
          "minCost":4,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "14",
          "count":5,
          "name": "Positron Computer",
          "src": require("@/assets/Tech/Positron-computer.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Positron Computer Ship Parts.",
          "cost":8,
          "minCost":5,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "15",
          "count":3,
          "name": "Quantum Grid",
          "src": require("@/assets/Tech/Quantum-grid.jpg"),
          "description": "You receive two additional Influence Discs, placed immediately on your Influence Track.",
          "cost":16,
          "minCost":8,
          "available":0
      },
      {
          "type":"gridTech",
          "id": "16",
          "count":3,
          "name": "Tachyon Drive",
          "src": require("@/assets/Tech/Tachyon-drive.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Tachyon Drive Ship Parts.",
          "cost":12,
          "minCost":6,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "17",
          "count":4,
          "name": "Advanced Mining",
          "src": require("@/assets/Tech/Advanced-mining.jpg"),
          "description": "You may place Population Cubes in Advanced Materials Population Squares with your Colony Ships.",
          "cost":10,
          "minCost":6,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "18",
          "count":3,
          "name": "Gluon Computer",
          "src": require("@/assets/Tech/Gluon-computer.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Gluon Computer Ship Parts.",
          "cost":14,
          "minCost":7,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "19",
          "count":5,
          "name": "Neutron Bombs",
          "src": require("@/assets/Tech/Neutron-bombs.jpg"),
          "description": "When Attacking Population, all Population Cubes in a Sector are destroyed automatically.",
          "cost":2,
          "minCost":2,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "20",
          "count":5,
          "name": "Phase Shield",
          "src": require("@/assets/Tech/Phase-shield.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Phase Shield Ship Parts.",
          "cost":8,
          "minCost":5,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "21",
          "count":5,
          "name": "Plasma Cannon",
          "src": require("@/assets/Tech/Plasma-cannon.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Plasma Cannon Ship Parts.",
          "cost":6,
          "minCost":4,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "22",
          "count":3,
          "name": "Plasma missile",
          "src": require("@/assets/Tech/Plasma-missile.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Plasma Missile Ship Parts.",
          "cost":16,
          "minCost":8,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "23",
          "count":5,
          "name": "Starbase",
          "src": require("@/assets/Tech/Starbase.jpg"),
          "description": "You may Build Starbases.",
          "cost":4,
          "minCost":3,
          "available":0
      },
      {
          "type":"militaryTech",
          "id": "24",
          "count":3,
          "name": "Tachyon Source",
          "src": require("@/assets/Tech/Tachyon-source.jpg"),
          "description": "You may Upgrade your Ship Blueprints with Tachyon Source Ship Parts.",
          "cost":12,
          "minCost":6,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "25",
          "count":1,
          "name": "Absorption Shield",
          "src": require("@/assets/Tech/Absorption-shield.jpg"),
          "description": "You may upgrade your Ship Blueprints with Absortion Shield Parts.",
          "cost":7,
          "minCost":6,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "26",
          "count":1,
          "name": "Ancient Labs",
          "src": require("@/assets/Tech/Ancient-labs.jpg"),
          "description": "Immediately draw and resolve one Discovery Tile",
          "cost":13,
          "minCost":9,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "27",
          "count":1,
          "name": "Antimatter Splitter",
          "src": require("@/assets/Tech/Antimatter-splitter.jpg"),
          "description": "Allows you to split damage from Antimatter Cannons freely over targets.",
          "cost":5,
          "minCost":5,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "28",
          "count":1,
          "name": "Cloaking Device",
          "src": require("@/assets/Tech/Cloaking-device.jpg"),
          "description": "Two Ships are required to Pin each of your Ships.",
          "cost":7,
          "minCost":6,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "29",
          "count":1,
          "name": "Conifold Field",
          "src": require("@/assets/Tech/Conifold-field.jpg"),
          "description": "You may upgrade your Ship Blueprints with Conifold Field Ship Parts.",
          "cost":5,
          "minCost":5,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "30",
          "count":1,
          "name": "Flux Missile",
          "src": require("@/assets/Tech/Flux-missile.jpg"),
          "description": "You may upgrade your Ship Blueprints with Flux Missile Parts.",
          "cost":11,
          "minCost":8,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "31",
          "count":1,
          "name": "Improved Logistics",
          "src": require("@/assets/Tech/Improved-logistics.jpg"),
          "description": "Gain 1 additional Move Activation during each Move Action you take.",
          "cost":7,
          "minCost":6,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "32",
          "count":1,
          "name": "Metasynthesis",
          "src": require("@/assets/Tech/Metasynthesis.jpg"),
          "description": "You may place Population Cubes in any Advanced Population Squares with your Colony Ships.",
          "cost":17,
          "minCost":11,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "33",
          "count":1,
          "name": "Neutron Absorber",
          "src": require("@/assets/Tech/Neutron-absorber.jpg"),
          "description": "Enemy Neutron Bombs have no effect on you. NOTE: This does not affect Plantas Species weakness.",
          "cost":5,
          "minCost":5,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "34",
          "count":1,
          "name": "Pico Modulator",
          "src": require("@/assets/Tech/Pico-modulator.jpg"),
          "description": "Gain 2 additional Upgrade Activations during each Upgrade Action you take.",
          "cost":11,
          "minCost":8,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "35",
          "count":1,
          "name": "Rift Cannon",
          "src": require("@/assets/Tech/Rift-cannon.jpg"),
          "description": "You may upgrade your Ship Blueprints with Rift Cannon Shield Parts.",
          "cost":9,
          "minCost":7,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "36",
          "count":1,
          "name": "Sentient Hull",
          "src": require("@/assets/Tech/Sentient-hull.jpg"),
          "description": "You may upgrade your Ship Blueprints with Sentient Hull Shield Parts.",
          "cost":7,
          "minCost":6,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "37",
          "count":1,
          "name": "Soliton Cannon",
          "src": require("@/assets/Tech/Soliton-cannon.jpg"),
          "description": "You may upgrade your Ship Blueprints with Soliton Cannon Shield Parts.",
          "cost":9,
          "minCost":7,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "38",
          "count":1,
          "name": "Transition Drive",
          "src": require("@/assets/Tech/Transition-drive.jpg"),
          "description": "You may upgrade your Ship Blueprints with Zero Point Source Shield Parts.",
          "cost":9,
          "minCost":7,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "39",
          "count":1,
          "name": "Warp Portal",
          "src": require("@/assets/Tech/Warp-portal.jpg"),
          "description": "Immediately place the Warp Portal Tile on any Sector you Control. The Warp Portal Tile connects this Sector to all other Warp Portal Sectors and is worth 1 VP if Controlled at the end of the game.",
          "cost":9,
          "minCost":7,
          "available":0
      },
      {
          "type":"rareTech",
          "id": "40",
          "count":1,
          "name": "Zero-Point Source",
          "src": require("@/assets/Tech/Zero-point-source.jpg"),
          "description": "You may upgrade your Ship Blueprints with Zero-Point Source Shield Parts.",
          "cost":15,
          "minCost":10,
          "available":0
      }]
    }
  },
  "methods": {
      "click_passTurn": function (iv_obj) {
          let count = 0 ; 
          for(let i = 0 ; i < this.playerInfo.length; i++){
              if(this.playerInfo[i].passed){
                  count++;
              }
          }
          iv_obj.passed = true;
          iv_obj.nextTurn = count + 1;
      },
      "click_unpassTurn": function (iv_obj) {
          iv_obj.nextTurn = iv_obj.currentTurn;
          iv_obj.passed = false;
      },
      "click_toggleSound": function(){
          this.soundEnabled = !this.soundEnabled;
      },
      "func_continueGame": function(iv_dataObj){

                this.dataObjToSave = JSON.parse(JSON.stringify(iv_dataObj));
                this.currentRound = iv_dataObj.currentRound;
                this.playercount = iv_dataObj.playerCount;
                this.playerInfo = iv_dataObj.playerInfo;
                this.name = iv_dataObj.sessionname;
                this.randomNanoTechData = JSON.parse(JSON.stringify(iv_dataObj.randomNanoTechData));
                this.randomGridTechData = JSON.parse(JSON.stringify(iv_dataObj.randomGridTechData));
                this.randomMilitaryTechData = JSON.parse(JSON.stringify(iv_dataObj.randomMilitaryTechData));
                this.randomRareTechData = JSON.parse(JSON.stringify(iv_dataObj.randomRareTechData));
                this.techData = JSON.parse(JSON.stringify(iv_dataObj.techData));
                this.techCount = JSON.parse(JSON.stringify(iv_dataObj.techCount));
                if(this.soundEnabled){
                    var audio = new Audio(this.nextRoundSoundLocation);
                    audio.play();
                }

      },
      "func_createDataObjToSave": function(iv_dataObj,iv_round, iv_name, iv_randomNanoTechData, iv_randomGridTechData,
            iv_randomMilitaryTechData, iv_randomRareTechData, iv_techData, iv_playerCount, iv_techCount,iv_playerInfo
            ){
                let lv_ts = Date.now();
                if(iv_dataObj.id === null || iv_dataObj.ts === null ||iv_dataObj.name === null){
                    
                    iv_dataObj.id = iv_name + "||||" + lv_ts;
                    iv_dataObj.ts = lv_ts;
                    if(iv_name === "Eclipse - "){
                         iv_dataObj.name = iv_name + Math.floor(Math.random() * 1000000);
                    }
                    else{
                        iv_dataObj.name = iv_name;
                    }
                   
                }
                iv_dataObj.updateTs = lv_ts;
                iv_dataObj.playerCount = iv_playerCount;
                iv_dataObj.playerInfo = iv_playerInfo;
                iv_dataObj.currentRound = iv_round;
                iv_dataObj.randomNanoTechData = JSON.parse(JSON.stringify(iv_randomNanoTechData));
                iv_dataObj.randomGridTechData = JSON.parse(JSON.stringify(iv_randomGridTechData));
                iv_dataObj.randomMilitaryTechData = JSON.parse(JSON.stringify(iv_randomMilitaryTechData));
                iv_dataObj.randomRareTechData = JSON.parse(JSON.stringify(iv_randomRareTechData));
                iv_dataObj.techData = JSON.parse(JSON.stringify(iv_techData));
                iv_dataObj.techCount = JSON.parse(JSON.stringify(iv_techCount));
                console.log(iv_dataObj);
                return iv_dataObj;
      },
      "func_saveDataObj": function(iv_dataObj){
          let db = window.localStorage.getItem("sessionListv2");

          if(db){
              db = JSON.parse(db); 
              let sessionFound = false;;
              for(let i = 0; i < db.length; i++){
                  if(db[i].id === iv_dataObj.id){
                      sessionFound = true;
                      db[i] = JSON.parse(JSON.stringify(iv_dataObj));
                      window.localStorage.setItem("sessionListv2" , JSON.stringify(db));
                      break;
                  }
              }
              if(!sessionFound){
                  function compareNumbers(a, b) {
                    return b.ts - a.ts;
                    }
                    db.push(iv_dataObj);
                    db.sort(compareNumbers);
                    window.localStorage.setItem("sessionListv2" , JSON.stringify(db));
              }
          }
          else{
              let initArr = [];
              initArr.push(iv_dataObj);
              window.localStorage.setItem("sessionListv2" , JSON.stringify(initArr));
          }
      },
      "click_purchaseTech": function(iv_tech){
          let techType = "";
          switch(iv_tech.type){
              case "nanoTech": techType =  "randomNanoTechData";
              break;
              case "gridTech": techType =  "randomGridTechData";
              break;
              case "militaryTech": techType =  "randomMilitaryTechData";
              break;
              case "rareTech": techType =  "randomRareTechData";
              break;
          }
          let techToDelete = -1;
          function compareNumbers(a, b) {
            return a.cost - b.cost;
            }
          for(let i = 0; i < this[techType].length; i++){
              if(this[techType][i].id === iv_tech.id){
                  this[techType][i].available--;

                  //this.$set(this[techType],i,this[techType][i]);
                  break;
                    //techToDelete = i;
              }
          }
          this[techType].sort(compareNumbers);
          let dataObj = this.func_createDataObjToSave(this.dataObjToSave, this.currentRound, this.sessionname, 
            this.randomNanoTechData, this.randomGridTechData, this.randomMilitaryTechData, this.randomRareTechData, this.techData, this.playercount, this.techCount, this.playerInfo);
          if(this.soundEnabled){
                var audio = new Audio(this.buySoundLocation[this.randomSoundIndex]);
                this.randomSoundIndex++;
                if(this.randomSoundIndex > 9){
                    this.randomSoundIndex = 0;
                }
                audio.play();
            }
          this.func_saveDataObj(dataObj);
          this.openModal = false;
      },
      "click_tech": function(iv_tech, iv_index){
          this.selectedTech = iv_tech;
          this.openModal = true;
      },
      "click_closeModal": function(){
          this.openModal = false;
      },
    "click_nextRound": function(){
        if(this.currentRound === 8){
            return;
        }
        this.currentRound++;
        function compareNumbers(a, b) {
            return a.cost - b.cost;
            }
        function compareTurn(a, b) {
        return a.currentTurn - b.currentTurn;
        }
        //correct the turn order
        for(let i = 0 ; i < this.playerInfo.length; i++){
              this.playerInfo[i].passed = false;
              this.playerInfo[i].previousTurn = this.playerInfo[i].currentTurn;
              this.playerInfo[i].currentTurn = this.playerInfo[i].nextTurn;
          }
        this.playerInfo.sort(compareTurn);

        let obj = this.func_createRandomTechArray(this.currentRound), lv_exist = false;
        for(let i = 0 ; i < obj.nanoTech.data.length; i++){
            this.randomNanoTechData.push(JSON.parse(JSON.stringify(obj.nanoTech.data[i])));
        }
        for(let i = 0 ; i < obj.nanoTech.repeat.length; i++){
          for(let j = 0 ; j < this.randomNanoTechData.length; j++){
              if(this.randomNanoTechData[j].id === obj.nanoTech.repeat[i]){
                  this.randomNanoTechData[j].available++;
              }
          }
        }
        this.randomNanoTechData.sort(compareNumbers);
        
        for(let i = 0 ; i < obj.gridTech.data.length; i++){
            this.randomGridTechData.push(JSON.parse(JSON.stringify(obj.gridTech.data[i])));
        }
        for(let i = 0 ; i < obj.gridTech.repeat.length; i++){
            for(let j = 0 ; j < this.randomGridTechData.length; j++){
                if(this.randomGridTechData[j].id === obj.gridTech.repeat[i]){
                    this.randomGridTechData[j].available++;
                }
            }
        }
        this.randomGridTechData.sort(compareNumbers);

        for(let i = 0 ; i < obj.militaryTech.data.length; i++){
            this.randomMilitaryTechData.push(JSON.parse(JSON.stringify(obj.militaryTech.data[i])));
        }
        for(let i = 0 ; i < obj.militaryTech.repeat.length; i++){
            for(let j = 0 ; j < this.randomMilitaryTechData.length; j++){
                if(this.randomMilitaryTechData[j].id === obj.militaryTech.repeat[i]){
                    this.randomMilitaryTechData[j].available++;
                }
            }
        }
        this.randomMilitaryTechData.sort(compareNumbers);

        for(let i = 0 ; i < obj.rareTech.data.length; i++){
            this.randomRareTechData.push(JSON.parse(JSON.stringify(obj.rareTech.data[i])));
        }
        this.randomRareTechData.sort(compareNumbers);

        let dataObj = this.func_createDataObjToSave(this.dataObjToSave, this.currentRound, this.sessionname, 
        this.randomNanoTechData, this.randomGridTechData, this.randomMilitaryTechData, this.randomRareTechData, this.techData, this.playercount,this.techCount, this.playerInfo);

        this.func_saveDataObj(dataObj);
        if(this.soundEnabled){
            var audio = new Audio(this.nextRoundSoundLocation);
            audio.play();
        }
    },
    "click_login": function(){
        this.$router.push("register");
    },
    "func_createRandomTechArray": function(iv_round){
        //create 4 Random array
        let lobj_techData = {
            "nanoTech":{
                "data": [],
                "repeat":[]
            },
            "gridTech":{
                "data": [],
                "repeat":[]
            },
            "militaryTech":{
                "data": [],
                "repeat":[]
            },
            "rareTech":{
                "data": [],
                "repeat":[]
            },
        }, tileDraw = 0;
        if(iv_round === 1){
            tileDraw = this.playercount*2 + 8;
        }
        else{
            tileDraw = this.playercount + 4;
        }
      let spliceArrList = [], tileCount = 0;
      while(tileCount < tileDraw){
          var randomIndex = Math.floor(Math.random()*this.techData.length);
          var randomTech = this.techData[randomIndex];
          switch(randomTech.type){
              case 'nanoTech':
                    if(this.techCount.nanoTech[randomTech.id] === 0){     
                        console.log("should not happen");
                    } 
                    else{
                        if(this.techCount.nanoTech[randomTech.id] === randomTech.count){
                            randomTech.available = 1;
                            lobj_techData.nanoTech.data.push(JSON.parse(JSON.stringify(randomTech)));
                        }
                        else{
                            lobj_techData.nanoTech.repeat.push(randomTech.id);
                        }
                        this.techCount.nanoTech[randomTech.id]--;
                        tileCount++;
                        this.techData.splice(randomIndex,1);
                    }
                    break;
              case 'gridTech': 
              
                    if(this.techCount.gridTech[randomTech.id] === 0){            
                        console.log("should not happen");      
                    } 
                    else{
                        if(this.techCount.gridTech[randomTech.id] === randomTech.count){
                            randomTech.available = 1;
                            lobj_techData.gridTech.data.push(JSON.parse(JSON.stringify(randomTech)));
                        }
                        else{
                            lobj_techData.gridTech.repeat.push(randomTech.id);
                        }
                        this.techCount.gridTech[randomTech.id]--;
                        tileCount++;
                        this.techData.splice(randomIndex,1);
                    }
                    break;
              case 'militaryTech': 
                    if(this.techCount.militaryTech[randomTech.id] === 0){             
                        console.log("should not happen");      
                    } 
                    else{
                        if(this.techCount.militaryTech[randomTech.id] === randomTech.count){
                            randomTech.available = 1;
                            lobj_techData.militaryTech.data.push(JSON.parse(JSON.stringify(randomTech)));
                        }
                        else{
                            lobj_techData.militaryTech.repeat.push(randomTech.id);
                        }
                        this.techCount.militaryTech[randomTech.id]--;
                        tileCount++;
                        this.techData.splice(randomIndex,1);
                    }
                    break;
              case 'rareTech': 
                    if(this.techCount.rareTech[randomTech.id] === 0){          
                        console.log("should not happen");         
                    } 
                    else{
                        randomTech.available = 1;
                        this.techCount.rareTech[randomTech.id]--;
                        lobj_techData.rareTech.data.push(JSON.parse(JSON.stringify(randomTech)));
                        //tileCount++;
                        this.techData.splice(randomIndex,1);
                        //this.randomRareTechData.push(JSON.parse(JSON.stringify(randomTech)));
                    }
                    break;
          }
          
      }
      //lobj_techData = this.func_fillEmptyTech(lobj_techData);
      return lobj_techData;
    }
    // "func_fillEmptyTech": function(iv_techObj){
    //     var lv_militaryTech = JSON.parse(JSON.stringify(iv_techObj.militaryTech.data));
    //     var lv_gridTech = JSON.parse(JSON.stringify(iv_techObj.gridTech.data));
    //     var lv_nanoTech = JSON.parse(JSON.stringify(iv_techObj.nanoTech.data));

    //     var idList = ["17", "18", "19", "20", "21", "22", "23", "24"];
    //     for(var i = 0  ; i < lv_militaryTech.length ; i++){
    //         for
    //     }

    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.overlay_image{
    position: relative;
    bottom: 20%;
    left: 70%;
    width: 30px;
    height: 30px;
    background: white;
    z-index:20;
}
.noPaddingMargin{
    margin: 0 !important;
    padding: 0 !important;
}
.fadedimg {
      -webkit-mask-image:-webkit-gradient(linear, left top, left bottom, from(rgba(0,0,0,1)), to(rgba(0,0,0,0)));
      mask-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.4));
    }
</style>
