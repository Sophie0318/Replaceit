<template>
  <v-row>
    <v-col cols="12">
      <v-text-field label="something" v-model="testValue" />
    </v-col>
    <v-col cols="12">
      <v-radio label="something" />
    </v-col>
    <v-col cols="12">
      <v-text-field label="something" v-model="testValue2" />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      testValue: '',
      testValue2: '',
    }
  },
}
</script>