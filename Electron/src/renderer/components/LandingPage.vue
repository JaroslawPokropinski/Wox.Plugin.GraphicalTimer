<template>
  <div id='wrapper'>
    <img class='clock-image' src='/static/baseline-alarm-24px.svg'>
    <h3>30m 00s</h3>
    <button class='cancel-button'>Cancel</button>
  </div>
</template>

<script>
  export default {
    name: 'landing-page',
    components: { },
    methods: { }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

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
