import Vue from 'vue'
import StartNewGame from '@/components/StartNewGame'

describe('StartNewGame.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(StartNewGame)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.hello h1').textContent)
      .toEqual('Welcome to Your Vue.js App')
  })
})
