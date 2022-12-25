<template>
  <div class="container">
    <div class="game-frame">
      <game-header :moves="moves" :isWin="isWin" :disksNumber="disksNumber" />
      <div class="towers">
        <tower-component
          v-for="(tower, index) in towers"
          :key="index"
          :disks="tower.disks"
          :towerIndex="index"
          :title="tower.title"
        />
      </div>
    </div>
  </div>
</template>

<script>
import GameHeader from './GameHeader.vue';
import TowerComponent from './TowerComponent.vue';
import { getTemporaryTower } from '../utils/utils';
export default {
  components: {
    TowerComponent,
    GameHeader,
  },
  data() {
    return {
      towers: [
        {
          title: 'Deb',
          disks: [
            {
              size: 40,
              color: `rgb(165,85,236)`,
            },
            {
              size: 30,
              color: `rgb(165,85,236)`,
            },
            {
              size: 20,
              color: `rgb(165,85,236)`,
            },
          ],
        },
        {
          title: 'Mid',
          disks: [],
        },
        {
          title: 'Fin',
          disks: [],
        },
      ],
      towerDraggedFrom: null,
      towerDroppedIn: null,
      moves: 0,
      movesStack: [],
      canceledMovesStack: [],
      solutionSteps: [],
      disksNumber: 3,
      isWin: false,
    };
  },
  methods: {
    setTowerDraggedFrom(index) {
      this.towerDraggedFrom = this.towers[index];
    },
    setTowerDroppedIn(index) {
      this.towerDroppedIn = this.towers[index];
    },
    addMove() {
      this.moves++;
    },
    removeMove() {
      this.moves--;
    },
    incrementDisksNumber() {
      this.disksNumber++;
    },
    decrementDisksNumber() {
      this.disksNumber--;
    },
    moveDisk() {
      const towerDraggedFromLength = this.towerDraggedFrom.disks.length;
      const towerDroppedInLength = this.towerDroppedIn.disks.length;

      let disk = this.towerDraggedFrom.disks[towerDraggedFromLength - 1];

      if (towerDroppedInLength > 0) {
        const topDisk = this.towerDroppedIn.disks[towerDroppedInLength - 1];
        if (topDisk.size < disk.size) {
          return;
        }
      }
      disk = this.towerDraggedFrom.disks.pop();
      this.towerDroppedIn.disks.push(disk);
      this.addMove();
      this.movesStack.push({
        source: this.towers.indexOf(this.towerDraggedFrom),
        destination: this.towers.indexOf(this.towerDroppedIn),
      });
      this.verifyWininig();
    },
    verifyWininig() {
      if (this.towers[2].disks.length == this.disksNumber) {
        this.isWin = true;
      }
    },
    async resolveGame() {
      this.initSolutionStack();
      while (this.solutionSteps.length > 0) {
        const current = this.solutionSteps.pop();
        const disk = this.towers[current.source].disks.pop();
        this.towers[current.destination].disks.push(disk);
        await this.delay(1500);
      }
    },
    initSolutionStack() {
      const stack = [];
      this.solutionSteps = [];
      stack.push({ source: 1, destination: 2, nb: this.disksNumber - 1 });
      stack.push({ source: 0, destination: 2, nb: 1 });
      stack.push({ source: 0, destination: 1, nb: this.disksNumber - 1 });
      while (stack.length > 0) {
        const top = stack.pop();
        if (top.nb > 1) {
          stack.push({
            source: getTemporaryTower(top.source, top.destination),
            destination: top.destination,
            nb: top.nb - 1,
          });
          stack.push({
            source: top.source,
            destination: top.destination,
            nb: 1,
          });
          stack.push({
            source: top.source,
            destination: getTemporaryTower(top.source, top.destination),
            nb: top.nb - 1,
          });
        } else {
          this.solutionSteps.unshift(top);
        }
      }
    },
    delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    },
  },
  provide() {
    return {
      setTowerDraggedFrom: this.setTowerDraggedFrom,
      setTowerDroppedIn: this.setTowerDroppedIn,
      towers: this.towers,
      movesStack: this.movesStack,
      canceledMovesStack: this.canceledMovesStack,
      moveDisk: this.moveDisk,
      addMove: this.addMove,
      removeMove: this.removeMove,
      resolveGame: this.resolveGame,
      incrementDisksNumber: this.incrementDisksNumber,
      decrementDisksNumber: this.decrementDisksNumber,
    };
  },
};
</script>

<!-- Add "scoped" att
TowerComponentribute to limit CSS to this component only -->
<style scoped>
.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.game-frame {
  width: 100%;
  height: 70%;
  padding: 1.5rem;
  background-color: rgb(108, 137, 226);
  display: flex;
  flex-direction: column;
}

.moves {
  font-weight: bold;
  font-size: 1.2rem;
}

.game-frame .towers {
  width: 100%;
  height: 50%;
  margin-top: auto;
  margin-bottom: 5rem;
  display: flex;
  justify-content: space-around;
  caret-color: transparent;
}
</style>
