<template>
  <div class="bg">
    <div class="bg-content"></div>
  </div>
</template>

<style>
.bg {
  top: 0;
  left: 0;
  width: 100vw;
  min-height: 100vh;
  position: fixed;
  z-index: -1;
  display: flex;
  justify-content: center;
  padding: 120px 24px 160px;
  pointer-events: none;
}

.bg:before {
  background: radial-gradient(circle, rgba(2, 0, 36, 0) 0, #fafafa 100%);
  position: absolute;
  content: "";
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
}

.bg:after {
  content: "";
  background-image: url(https://dub.co/_static/grid.svg);
  z-index: 1;
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  opacity: 0.4;
  filter: invert(1);
}

.bg-content {
  height: fit-content;
  z-index: 3;
  max-width: 1000px;
  background-image: radial-gradient(at 27% 37%, #3a8bfd 0, transparent 0),
    radial-gradient(at 97% 21%, #72fe7d 0, transparent 50%),
    radial-gradient(at 52% 99%, #fd3a4e 0, transparent 50%),
    radial-gradient(at 10% 29%, #855afc 0, transparent 50%),
    radial-gradient(at 97% 96%, #e4c795 0, transparent 50%),
    radial-gradient(at 33% 50%, #8ca8e8 0, transparent 50%),
    radial-gradient(at 79% 53%, #eea5ba 0, transparent 50%);
  position: absolute;
  content: "";
  width: 100%;
  height: 100%;
  filter: blur(100px) saturate(150%);
  top: 80px;
  opacity: 0.15;
}
</style>
