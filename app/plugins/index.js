export default async ({ store }) => {
  store.dispatch('users/autoLogin')
}
