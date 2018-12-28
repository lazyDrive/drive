<template>
    <div class="media-signup">
    <media-signup></media-signup>
    <media-alert></media-alert>
    </div>
</template>

<script>

import SignupForm from '@/components/Account/SignupForm'

export default {
    name: 'media-main-signup',
    components:{
        'media-signup': SignupForm
    }
}
</script>
