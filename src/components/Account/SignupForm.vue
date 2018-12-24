<template>
    <div class="media-signup">
        <v-container fluid fill-height class="loginOverlay">
            <v-layout flex align-center justify-center>
                <v-flex xs12 sm4 elevation-6>
                    <v-toolbar class="pt-5 blue darken-4">
                        <v-toolbar-title class="white--text"><h4>Sign Up</h4></v-toolbar-title>
                    </v-toolbar>
                    <v-card>
                        <v-card-text class="pt-4">
                            <div>
                                <v-form v-model="valid" ref="form">
                                    <v-text-field
                                    v-model="name"
                                    :rules="nameRules"
                                    label="Name"
                                    required
                                    ></v-text-field>
                                    <v-text-field
                                    label="Enter your e-mail address"
                                    v-model="email"
                                    :rules="emailRules"
                                    required
                                    ></v-text-field>
                                    <v-text-field
                                    label="Enter your password"
                                    v-model="password"
                                    min="8"
                                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                                    :append-icon-cb="() => (e1 = !e1)"
                                    :type="e1 ? 'password' : 'text'"
                                    :rules="passwordRules"
                                    counter
                                    required
                                    ></v-text-field>
                                    <v-layout justify-space-between>
                                        <v-btn @click="submit" :class=" { 'blue darken-4 white--text' : valid, disabled: !valid }">Sign Up</v-btn>
                                        <a href="">Forgot Password</a>
                                    </v-layout>
                                </v-form>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>
<script>
export default {
    name: 'media-login',
    data () {
        return {
            valid: false,
            e1: false,
            name: '',
            password: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters'
            ],
            passwordRules: [
                (v) => !!v || 'Password is required',
            ],
            email: '',
            /* eslint-disable */
            emailRules: [
                (v) => !!v || 'E-mail is required',
                (v) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
            ],
            /* eslint-enable */
        }
    },
    methods: {
        submit () {
            if (this.$refs.form.validate()) {
                this.$refs.form.$el.submit()
            }
        },
        clear () {
            this.$refs.form.reset()
        }
    },
}
</script>
