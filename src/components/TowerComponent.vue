<template lang="">
  <div
    class="tower"
    @dragenter="(event) => dragEnter(event)"
    @dragleave="dragLeave"
    @dragover="dragOver"
    @drop="onDrop(towerIndex)"
  >
    <div class="vertical-line">
      <ul class="disks">
        <disk-component
          v-for="(disk, index) in disks"
          :key="disk.size"
          :width="disk.size * 2 + 'px'"
          :backgroundColor="disk.color"
          :marginLeft="(-1 * (disk.size * 2 - 20)) / 2 + 'px'"
          :draggable="index == disks.length - 1"
          @drag="onDrag(towerIndex)"
        />
      </ul>
    </div>
    <div class="horizontal-line"></div>
    <div class="tower-title">
      <h1>{{ title }}</h1>
    </div>
  </div>
</template>

<script>
import diskComponent from './DiskComponent.vue';
export default {
  props: ['disks', 'towerIndex', 'title'],
  inject: ['setTowerDraggedFrom', 'setTowerDroppedIn', 'moveDisk'],
  components: {
    diskComponent,
  },
  methods: {
    random_rgba() {
      let o = Math.round,
        r = Math.random,
        s = 255;
      return 'rgb(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ')';
    },
    onDrag(index) {
      this.setTowerDraggedFrom(index);
      setTimeout(() => {}, 0);
    },
    dragEnter(e) {
      e.preventDefault();
    },
    dragLeave(e) {
      e.preventDefault();
    },
    dragOver(e) {
      e.preventDefault();
    },
    onDrop(index) {
      this.setTowerDroppedIn(index);
      this.moveDisk();
    },
  },
};
</script>
<style scoped>
.tower {
  width: 20rem;
  height: 100%;
}

.tower .vertical-line {
  width: 1.25rem;
  height: 95%;
  margin: auto;
  background-color: #484877;
}
.tower .horizontal-line {
  width: 100%;
  height: 5%;
  background-color: #484877;
}

.tower .tower-title {
  color: #3f3faa;
  font-size: 1rem;
  font-weight: bold;
  width: fit-content;
  margin: 0.75rem auto;
}

ul {
  list-style: none;
}

.disks {
  display: flex;
  flex-direction: column-reverse;
  height: 100%;
}
</style>
