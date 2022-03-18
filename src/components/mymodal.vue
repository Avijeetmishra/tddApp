
<template>
    <div class="modal is-active">
        <div class="modal-background">
        </div>
        <div class="modal-content">
            <div class="box">
            <slot></slot>
            </div>
        </div>
        <button class="modal-close is-large" @click="$emit('close')"></button>
    </div>
</template>

<script>
export default {
  name: 'mymodal'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
