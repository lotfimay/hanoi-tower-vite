<template>
  <div class="game-header">
    <div
      class="disks"
      :class="{
        hidden: moves != 0,
      }"
    >
      <img src="../assets/remove.svg" @click="removeDisk" alt="" />
      <p>
        Disks: <span>{{ this.disksNumber }}</span>
      </p>
      <img src="../assets/add.svg" @click="addDisk" alt="" />
    </div>
    <p v-if="isWin" class="moves">Congrats you won !</p>
    <p v-else class="moves">moves : {{ moves }}</p>
    <div class="actions">
      <img src="../assets/arrow-back.svg" alt="" />
      <img src="../assets/arrow-forward.svg" alt="" />
      <button
        :class="{
          hidden: moves != 0,
        }"
        @click="this.resolveGame()"
      >
        Solve !
      </button>
    </div>
  </div>
</template>
<script>
export default {
  inject: [
    'towers',
    'movesStack',
    'canceledMovesStack',
    'addMove',
    'removeMove',
    'resolveGame',
    'incrementDisksNumber',
    'decrementDisksNumber',
  ],
  props: ['moves', 'isWin', 'disksNumber'],
  methods: {
    addDisk() {
      if (this.towers[0].disks.length == 10) return;
      const size = this.towers[0].disks[0].size + 10;
      this.towers[0].disks.unshift({
        size: size,
        color: `rgb(165,85,236)`,
      });
      this.incrementDisksNumber();
    },
    removeDisk() {
      if (this.towers[0].disks.length > 3) {
        this.towers[0].disks.shift();
        this.decrementDisksNumber();
      }
    },
    goBack() {
      console.table(this.movesStack);
      if (this.movesStack.length == 0) return;
      const historyItem = this.movesStack.pop();
      const disk = this.towers[historyItem.destination].disks.pop();
      this.towers[historyItem.source].disks.push(disk);
      this.canceledMovesStack.push(historyItem);
      this.removeMove();
    },
    goForward() {
      console.table(this.canceledMovesStack);
      if (this.canceledMovesStack.length == 0) return;
      const historyItem = this.canceledMovesStack.pop();
      const disk = this.towers[historyItem.source].disks.pop();
      this.towers[historyItem.destination].disks.push(disk);
      this.movesStack.push(historyItem);
      this.addMove();
    },
  },
};
</script>

<style scoped>
.game-header {
  padding: 1.5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.game-header .disks {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
svg {
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
}

.actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.actions button {
  padding: 0.25rem 0.5rem;
  border-radius: 5px;
  color: white;
  font-family: inherit;
  font-size: 1rem;
  font-weight: bold;
  background-color: #243595;
  border: 1px #243595 solid;
}

img {
  width: 1.5rem;
  height: 1.5rem;
  cursor: pointer;
}

button.icon-container {
  background: none;
  border: none;
}

.hidden {
  visibility: hidden;
}
</style>
