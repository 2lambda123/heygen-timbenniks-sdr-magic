<script lang="ts" setup>
const { data: avatars } = await useListAvatars();
const { data: voices } = await useListVoices();

const avatarId = ref("");
const voiceId = ref("");
const copy = ref("");

function selectAvatar(id: string) {
  avatarId.value = id;
}

function selectVoice(id: string) {
  voiceId.value = id;
}
</script>

<template>
  <div class="overflow-auto max-w-screen-xl mx-auto">
    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Select your avatar</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      Select which avatar you want to use from your HeyGen account below.
    </p>

    <ul class="grid grid-cols-3 gap-4 mb-12">
      <li
        :key="avatar.id"
        :id="avatar.id"
        v-for="avatar in avatars"
        class="rounded-lg border border-gray-200 bg-white hover:bg-gray-50 cursor-pointer"
        @click="selectAvatar(avatar.id)"
      >
        <img
          :src="avatar.preview"
          class="block w-full object-cover aspect-video object-[50%_30%] rounded-t-xl blur-0"
        />
        <div class="justify-between rounded-b-lg p-6">
          <p class="line-clamp-1 font-display text-2xl font-bold text-gray-700">
            {{ avatar.name }}
          </p>

          <p>{{ avatar.gender }}</p>
        </div>
      </li>
    </ul>

    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Choose your voice</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      Select which voice you want your avatar to use.
    </p>

    <div class="overflow-auto h-96 mb-12">
      <ul class="grid grid-cols-3 gap-4">
        <li
          :key="voice.id"
          :id="voice.id"
          v-for="voice in voices"
          class="rounded-md border border-gray-200 bg-white p-3 shadow-lg flex cursor-pointer hover:bg-gray-50"
          @click="selectVoice(voice.id)"
        >
          <img
            :src="voice.flag"
            :alt="voice.language"
            class="mr-2 w-6 relative top-[5px] self-start"
          />
          <p>{{ voice.name }}</p>
        </li>
      </ul>
    </div>

    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Write your script</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      This script is personalized to the prospects data you selected in step
      one. Make sure to use the personalization tokens.
    </p>

    <textarea
      class="rounded-md border border-gray-200 bg-white p-3 shadow-lg w-full h-[400px] text-xl text-gray-500"
    >
Dear "name",
bla die bla bla
  </textarea
    >
  </div>
</template>
