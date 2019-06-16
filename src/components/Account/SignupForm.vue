<template>
  <section class="show lazy_login">
    <form ref="form">
      <h1>Join LazyDrive</h1>
      <p>Join our wonderfull community</p>
      <label for="name">
        Name
        <span></span>
      </label>
      <input id="name" name="name" type="text" v-model="name">
      <label for="email">
        Email
        <span></span>
      </label>
      <input id="email" name="email" type="email" v-model="email">
      <label for="password">
        Password
        <span></span>
      </label>
      <input autocomplete id="password" name="password" type="password" v-model="password">
      <input type="submit" value="Register" @click.prevent="submit()">
      <a href="/forgot">Forgot your password?</a>
      <a href="/login">Login</a>
    </form>
  </section>
</template>
<script>
export default {
  name: 'lazy-signup',
  data () {
    return {
      password: '',
      name: '',
      email: '',
      loading: false
    }
  },
  methods: {
    submit () {
      const data = {
        name: this.name,
        email: this.email,
        password: this.password
      }

      this.$store
        .dispatch('signup', data)
        .then(() => {
          this.clear()
        })
        .catch(error => {
          console.log(error)
        })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
