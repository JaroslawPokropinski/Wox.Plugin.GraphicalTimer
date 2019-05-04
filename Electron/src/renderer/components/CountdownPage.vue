<template>
  <div id='wrapper'>
    <img class='clock-image' v-bind:src="imageUrl">
    <h3>{{time}}</h3>
    <button class='cancel-button' v-on:click="onPause()">{{(interval === null) ? 'Start' : 'Pause'}}</button>
  </div>
</template>

<script>
  const { ipcRenderer } = window.require('electron')

  export default {
    name: 'landing-page',
    data: function () {
      return {
        seconds: 10,
        time: '2m 00s',
        interval: null,
        imageUrl: 'static/baseline-alarm-24px.svg'
      }
    },
    methods: {
      onPause: function () {
        if (this.interval === null) {
          this.interval = setInterval(() => {
            this.seconds -= 1
            this.time = `${Math.floor(this.seconds / 60)}m ${(this.seconds % 60 === 0) ? '0' : ''}${this.seconds % 60}s`
            if (this.seconds === 0) {
              clearInterval(this.interval)
              this.$router.push('/alert')
            }
          }, 1000)
        } else {
          clearInterval(this.interval)
          this.interval = null
        }
      }
    },
    created () {
      const arg = ipcRenderer.sendSync('getArgs')
      this.seconds = arg
      this.time = `${Math.floor(this.seconds / 60)}m ${(this.seconds % 60 === 0) ? '0' : ''}${this.seconds % 60}s`
      this.interval = setInterval(() => {
        this.seconds -= 1
        this.time = `${Math.floor(this.seconds / 60)}m ${(this.seconds % 60 === 0) ? '0' : ''}${this.seconds % 60}s`
        if (this.seconds === 0) {
          clearInterval(this.interval)
          this.$router.push('/alert')
        }
      }, 1000)
    }
  }
</script>

<style>
  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .clock-image {
    height: 96px;
    width: 96px;
    padding-bottom: 8px;
  }

  .cancel-button {
  background-color: #f44336; /* Green */
  border: none;
  color: white;
  padding: 8px 16px;
  margin-top: 32px;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
</style>
