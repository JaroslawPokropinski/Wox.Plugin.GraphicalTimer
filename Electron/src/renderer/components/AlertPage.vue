<template>
  <div id='wrapper'>
    <img class='clock-image' v-bind:src="imageUrl">
    <h3>0m 00s</h3>
    <button class='dismiss-button' v-on:click="onDismiss()">Dismiss</button>
  </div>
</template>

<script>
  const { remote } = window.require('electron')

  export default {
    name: 'landing-page',
    data: function () {
      return {
        audio: null,
        imageUrl: 'static/baseline-alarm-24px.svg'
      }
    },
    components: { },
    methods: {
      onDismiss: function () {
        this.audio.pause()
        const window = remote.getCurrentWindow()
        window.close()
      }
    },
    created () {
      this.audio = new Audio('http://soundbible.com/mp3/Loud_Alarm_Clock_Buzzer-Muk1984-493547174.mp3')
      this.audio.volume = 0.2
      this.audio.play()
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

  .dismiss-button {
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
