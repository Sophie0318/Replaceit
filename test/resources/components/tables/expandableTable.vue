<template>
  <v-data-table 
    :headers="headers" 
    :items="items" 
    v-model:page="page" 
    v-model:items-per-page="itemsPerPage"
    v-expand
  />
</template>

<script>
export default {
  props: {
    headers: {
      type: Array,
      default: []
    },
    items: {
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: 1
    },
    itemsPerPage: {
      type: Number,
      default: 10
    }
  }
}
</script>