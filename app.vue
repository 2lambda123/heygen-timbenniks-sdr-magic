<template>
  <div
    class="sticky inset-x-0 top-0 z-30 w-full transition-all border-b border-gray-200 bg-white/75 backdrop-blur-lg"
  >
    <div class="mx-auto w-full max-w-screen-xl">
      <div class="flex max-w-[300px]">
        <img
          class="w-12 py-2"
          src="https://resource.heygen.com/image/cd03ab4a9dc04d678087c895fb11525d/original"
        />
        <div class="font-black text-4xl mx-2 relative top-2.5">+</div>
        <img src="/heygen.svg" class="w-32 py-2" />
      </div>
    </div>
  </div>
  <main class="py-12">
    <hero />
    <steps />
    <selectit />
  </main>
  <bg />
</template>
