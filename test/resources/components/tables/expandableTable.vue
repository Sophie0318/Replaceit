<template>
  <v-data-table 
    :headers="headers" 
    :items="items" 
    :page.sync="page" 
    :items-per-page.sync="itemsPerPage"
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