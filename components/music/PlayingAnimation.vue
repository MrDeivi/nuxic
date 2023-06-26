<script lang="ts" setup>

</script>

<template>
  <div class="playing">
    <span class="playing__bar playing__bar1" />
    <span class="playing__bar playing__bar2" />
    <span class="playing__bar playing__bar3" />
  </div>
</template>

<style scoped>
.playing {
  background: rgba(255, 255, 255, 0.1);
  width: 3rem;
  height: 3rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 0.5rem;
  box-sizing: border-box;
}

.playing__bar {
  display: inline-block;
  background: white;
  width: 30%;
  border-radius: .5rem;
  height: 100%;
  -webkit-animation: up-and-down 1.3s ease infinite alternate;
  animation: up-and-down 1.3s ease infinite alternate;
}

.playing__bar1 {
  height: 60%;
}

.playing__bar2 {
  height: 30%;
  -webkit-animation-delay: -2.2s;
          animation-delay: -2.2s;
}

.playing__bar3 {
  height: 75%;
  -webkit-animation-delay: -3.7s;
          animation-delay: -3.7s;
}

@-webkit-keyframes up-and-down {
  10% {
    height: 30%;
  }
  30% {
    height: 100%;
  }
  60% {
    height: 50%;
  }
  80% {
    height: 75%;
  }
  100% {
    height: 60%;
  }
}

@keyframes up-and-down {
  10% {
    height: 30%;
  }
  30% {
    height: 100%;
  }
  60% {
    height: 50%;
  }
  80% {
    height: 75%;
  }
  100% {
    height: 60%;
  }
}
</style>
