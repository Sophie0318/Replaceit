<template>
  <v-radio :value="radioVal" v-bind="$attrs" v-on="on" />
</template>

<script>
export default {
  props: {
    radioVal: Boolean,
  }
}
</script>