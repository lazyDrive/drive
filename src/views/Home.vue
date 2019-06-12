<template>
  <div class="lazy__home">
    <lazy-login></lazy-login>
  </div>
</template>

<script>
import { api } from './../app/Api'
import LoginForm from '@/components/Account/LoginForm'

export default {
  name: 'media-home',
  data () {
    return {}
  },
  components: {
    'lazy-login': LoginForm
  },
  computed: {
    isLoggedIn: function () {
      return api.auth.loggedIn()
    }
  }
}
</script>
