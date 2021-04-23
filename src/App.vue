<template>
  <div id="app">
    <button class="btn" @click="handleIncrement">Click me</button>
    <p class="display">
      {{ count }}
    </p>
    <p class="display2">
      {{ inputValue }}
    </p>
    <!-- <div>/div -->
    <input v-model="inputValue" type="text" />
    <ul class="list">
      <li class="item">2</li>
      <li class="item">2</li>
      <li class="item">3</li>
      <li class="item">{{ inputValue }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      inputValue: 1,
    }
  },
  methods: {
    handleIncrement() {
      this.count++
    },
  },
}
</script>

<style scoped lang="scss">
.btn {
  border: none;
  outline: none;
  background-color: #1890ff;
}
.list {
  display: flex;
  justify-content: flex-start;
  list-style-type: none;
  margin: 0;
  padding: 0;
}
</style>
