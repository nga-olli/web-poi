import {
  getUserFromLocalStorage,
  getTokenFromLocalStorage
} from '~/helper/auth'

export default function({ store, route, redirect, next }) {
  const loggedUser = getUserFromLocalStorage()
  const loggedToken = getTokenFromLocalStorage()
  // const secureGroup = store.state.secureGroup
  // const routePath = route.path

  store.commit('SET_USER', {
    user: loggedUser,
    token: loggedToken
  })
}
