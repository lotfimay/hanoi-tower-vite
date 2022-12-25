<template>
  <li
    class="disk"
    :style="{
      width: width,
      backgroundColor: backgroundColor,
      marginLeft: marginLeft,
    }"
    :class="isDisplayed ? 'block-display' : 'no-display'"
    @dragstart="onDragStart"
    @dragend="onDragEnd"
  ></li>
</template>
<script>
export default {
  props: ['width', 'backgroundColor', 'marginLeft'],
  data() {
    return {
      isDisplayed: true,
    };
  },
  methods: {
    onDragStart() {
      setTimeout(() => {
        this.isDisplayed = false;
      }, 0);
    },
    onDragEnd() {
      setTimeout(() => {
        this.isDisplayed = true;
      }, 0);
    },
  },
};
</script>
<style scoped>
.disk {
  background-color: #db6f48;
  height: 15px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  border: 0.25px solid rgb(80, 80, 80);
}

.no-display {
  display: none;
}
.block-display {
  display: block;
}
</style>
