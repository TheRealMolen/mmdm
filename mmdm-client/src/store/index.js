import { createStore, createLogger } from 'vuex'

import game from './game'


export default createStore({
    modules: {
      game,
    },
    strict: true,
    plugins: [createLogger()],
  })
