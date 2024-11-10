<script setup>
import { ref } from 'vue';

const words = [
    "Dream",    // 5 letters like "Bring"
    "Divine",   // 6 letters like "Layers"
    "Joy",      // 3 letters like "toL"
    "Veil",     // 4 letters like "Bold"
    "Wonder",   // 6 letters like "Layout"
    "Silk",     // 4 letters like "Hero"
    "Create",   // 6 letters like "Create"
    "The",      // 3 letters like "the"
    "Magic",    // 5 letters like "Focal"
    "Moment",   // 6 letters like "Design"
    "That",     // 4 letters like "that"
    "Vows"      // 4 letters like "Pops"
];

</script>

<template>
  <div class="content-wrap">
    <div class="text-container">
      <span v-for="(word, index) in words" 
            :key="index" 
            class="word">
        {{ word }}
      </span>
    </div>
    <div class="side-section">
      <h2 class="mb-4">永恆的誓約</h2>
      <p>與我們的專家團隊一起發現完美的婚禮規劃體驗。從精心挑選場地到提供專業建議，我們將確保您的特別日子充滿難忘的瞬間。</p>
      <!-- <div class="button">Get Started</div> -->
    </div>
  </div>
</template>

<style scoped>
@font-face {
        font-family: 'ChenYuluoyan-Thin';
        src: url('@/assets/fonts/ChenYuluoyan-Thin.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

.side-section h2 {
        font-family: 'ChenYuluoyan-Thin', sans-serif;
        font-size: 3em; 
}
.side-section p {
        font-size: 1.4em; 
}



.content-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1em 2em;
  margin: 5em;
  --lgrad: linear-gradient(#000 0 0);
  --thickness: 0.4em;
  --sz: 2em;
  border: solid var(--thickness) #0003;
  mask: var(--lgrad) padding-box,
    conic-gradient(at var(--sz) var(--sz), #0000 75%, #000 0%) 0 0 /
      calc(100% - var(--sz)) calc(100% - var(--sz));
  transition: border 0.4s ease-in-out;
}

.text-container {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
  max-width: 400px;
  padding: 2em;
  margin-left: 4em;
}

.word {
  font-family: monospace;
  font-size: 2em;
  font-weight: bold;
  color: #333;
  text-transform: uppercase;
}

.side-section {
  width: 100%;
  max-height: 250px;
  max-width: 0px;
  overflow: hidden;
  color: #333;
  transition: all 1s ease-in-out;
  opacity: 0;
  
  
}

.content-wrap:hover {
  border: solid var(--thickness) #000;
  /* padding-left: 25em; */
  
}

.content-wrap:hover .side-section {
  margin-left: 5em;
  max-width: 1000px;
  opacity: 1;
}

h2 {
  font-size: 2em;
  line-height: 1;
  margin: 0;
  padding: 0;
}

p {
  max-width: 100%;
  font-size: 1.2em;
  font-weight: 500;
}

.button {
  font-size: 1.2em;
  padding: 0.6em 2em;
  background: #3330;
  color: #333;
  width: fit-content;
  border: 3px solid #333;
  cursor: pointer;
}

.button:hover {
  background: #333;
  color: #fff;
}

@media screen and (max-width: 600px) {
  .content-wrap {
    flex-direction: column;
    padding: 1em;
    font-size: min(3vw, 0.8em);
  }
  
  .text-container {
    padding: 1em;
  }
  
  .word {
    font-size: 1.5em;
  }
  
  .side-section {
    margin-left: 0;
    width: 100%;
    max-height: 0px;
    max-width: 0px;
  }
  
  .content-wrap:hover .side-section {
    margin-left: 0;
    margin-top: 2em;
    max-height: 1000px;
    opacity: 1;
    padding: 2em;
  }
}
</style>