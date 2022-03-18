<template>
  <div class="viewport">
    <YUVRender ref="yuv" />
    <button class="btn btn-default btn-primary" @click="start">Click here</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import YUVRender from './components/YUVRender.vue';

export default defineComponent({
  name: 'App',
  components: {
    YUVRender,
  },
  methods: {
    start() {
      (this as any).$refs.yuv.start();
    }
  }
});
</script>

<style lang="stylus">
.viewport
  margin 20px auto auto auto
  width fit-content

  &>button
    margin-top 8px

.btn
  display: inline-block;
  position: relative;
  outline: none;
  font-weight: 400;
  appearance: none;
  user-select: none;
  cursor: pointer;
  white-space: nowrap;
  transition: all .1s linear;
  box-sizing: border-box;
  line-height: 1.5715;

  &:active 
    border-color: transparent;
    color: #fff;
    background-color: rgb(14,66,210);

  &:hover
    border-color: transparent;
    color: #fff;
    background-color: rgb(64,128,255);

.btn-default
  padding: 0 15px;
  font-size: 14px;
  height: 32px;
  border-radius: 2px;

.btn-primary
  background-color: rgb(22,93,255);
  color: #fff;
  border: 1px solid transparent;
</style>
