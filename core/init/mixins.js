import Vuex from 'vuex'
import stores from './store'

export default [{

	/**
	*	为所有的页面注入store
	*/
  store: new Vuex.Store(stores)
}]
