<template>
  <v-radio :model-value="radioVal" v-bind="$attrs" />
</template>

<script>
export default {
  props: {
    radioVal: Boolean,
  }
}
</script>