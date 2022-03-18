<style>
</style>


<template>

  <div class="color-picker">
      <div class="color-modes">
        <button
            :key="index"
            v-for="(mode, index) in colorModes"
            class="color-mode"
            :class="[{ active: index === activeMode }, `color-mode-${mode}`]"
            @click="activeMode = index"
            >{{ mode }}
        </button>
    </div>
    <div class="color-code">{{activeCode }}</div>
    <ul class="swatches">
        <li
            :key="index"
            v-for="(swatch, index) in swatches"
            :style="{ background: `#${swatch}` }"
            :class="[index === activeSwatch? 'active':'', 'swatch']"
            @click="click_swatchToggle(index)"
        >
            <check-icon />
        </li>
    </ul>
  </div>
</template>


<script>
import CheckIcon from '@/assets/checkmark.svg'
import convert from 'color-convert'
export default {
  components: { CheckIcon },

  props: {
    swatches: {
      type: Array,
      default() {
        return []
      }
    }
  },
  computed: {
    hex() {
        return `#${this.activeColorValue}`
    },
    hsl() {
      const hslColor = convert.hex.hsl(this.activeColorValue)
      return `${hslColor[0]}°, ${hslColor[1]}%, ${hslColor[2]}%`
    },
    activeColorValue() {
      return this.swatches[this.activeSwatch]
    },
    activeModeValue() {
      return this.colorModes[this.activeMode]
    },
    activeCode() {
      return this[this.activeModeValue]
    }
  },

   data() {
    return {
      activeSwatch: 0,
      activeMode: 0,
      colorModes: ['hex', 'rgb', 'hsl']
    }
  },
  methods: {
      "click_swatchToggle": function(iv_index){
          console.log(iv_index);
          this.activeSwatch = iv_index;
      }
  }
}
</script>