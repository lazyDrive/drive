<template>
  <div class="LoaderBalls">
    <div class="LoaderBalls__item"></div>
    <div class="LoaderBalls__item"></div>
    <div class="LoaderBalls__item"></div>
  </div>
</template>

<script>
import { api } from './../app/Api'

export default {
  name: 'media-auth',
  data () {
    return {}
  },
  methods: {
    saveToken () {
      const search = '?' + window.location.hash.split('#')[1]
      const urlParams = new URLSearchParams(search)
      const accessToken = urlParams.get('access_token')

      if (
        accessToken == '' ||
        accessToken == null ||
        accessToken == undefined
      ) {
        this.$router.push('/PageNotFound')
      } else {
        let data = this.$store.state.settings
        data.dropbox.accessToken = accessToken
        data.dropbox.uid = urlParams.get('uid')
        data.dropbox.accountId = urlParams.get('account_id')
        data.email = api.user.userData.email

        const payload = {}

        payload.settings = data
        payload.action = 'set'

        this.$store
          .dispatch('settings', payload)
          .then(() => {
            window.close()
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  created () {
    this.saveToken()
  }
}
</script>
