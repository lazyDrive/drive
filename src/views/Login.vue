<template>
    <div class="media-login">
    <media-login></media-login>
    </div>
</template>

<script>

import LoginForm from '@/components/Account/LoginForm'

export default {
    name: 'media-main-login',
    components:{
        'media-login': LoginForm
    }
}
</script>
