<script lang="ts" setup>
const { data: avatars } = await useListAvatars();
const { data: voices } = await useListVoices();
const runtimeConfig = useRuntimeConfig();

const avatarId = ref("");
const loading = ref(false);
const voiceId = ref("");
const loggedIn = ref(false);
const prospectId = ref();
const prospects = ref([
  {
    id: "nike",
    name: "John",
    source: "NRF Conference",
    company: "Nike",
  },
  {
    id: "heineken",
    name: "Pete",
    source: "Hygraph Product Webinar",
    company: "Heineken",
  },
  {
    id: "chanel",
    name: "Nicolas",
    source: "Storytelling Lunch",
    company: "Chanel",
  },
]);

const copy = ref(`Hi {name},

I came across your name at the {source} and was wondering if you could help me out.
I have a solution for easily transitioning to a headless CMS that I think {company} could really benefit from, but I'm having trouble connecting.

Who is the right person to discuss this opportunity with, and how may I reach them?

I appreciate your time!`);

function selectProspect(id: string) {
  prospectId.value = id;
  updateCopy();
}

function selectAvatar(id: string) {
  avatarId.value = id;
}

function selectVoice(id: string) {
  voiceId.value = id;
}

function updateCopy() {
  const c = copy.value;
  copy.value = c
    .replace(
      "{name}",
      prospects.value.find((p) => p.id === prospectId.value)?.name as string
    )
    .replace(
      "{source}",
      prospects.value.find((p) => p.id === prospectId.value)?.source as string
    )
    .replace(
      "{company}",
      prospects.value.find((p) => p.id === prospectId.value)?.company as string
    );
}

function render() {
  loading.value = true;

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-key": runtimeConfig.public.heyGenToken,
    },
    body: JSON.stringify({
      background: "#ffffff",
      ratio: "16:9",
      test: false,
      version: "v1alpha",
      clips: [
        {
          avatar_id: avatarId.value,
          avatar_style: "normal",
          caption: false,
          input_text: copy.value,
          scale: 1,
          voice_id: voiceId.value,
          talking_photo_style: "normal",
        },
      ],
    }),
  };

  fetch("https://api.heygen.com/v1/video.generate", options)
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
    })
    .catch((err) => {
      console.log(err);
    });
}
</script>

<template>
  <div class="overflow-auto max-w-screen-xl mx-auto mx-4 lg:mx-auto">
    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Select HubSpot prospect data</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      Login and select your prospect's info. We will use this in our
      personalized video later.
    </p>

    <div class="mb-12 rounded-lg border-gray-200 border bg-white p-4">
      <img src="/hubspot.png" class="w-32 block mb-2" />
      <p class="mb-4 text-gray-500 text-sm">
        Generate leads, close deals, and create remarkable customer experiences.
      </p>
      <button
        v-if="!loggedIn"
        class="rounded-full border border-black bg-black px-5 py-2 text-lg text-white shadow-lg transition-all hover:bg-white hover:text-black"
        @click="loggedIn = true"
      >
        Login
      </button>

      <ul v-if="loggedIn" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <li
          class="rounded-md border border-gray-200 p-3 shadow-lg flex cursor-pointer hover:bg-gray-600 hover:text-white"
          v-for="prospect in prospects"
          :key="prospect.id"
          :id="prospect.id"
          :class="
            prospectId === prospect.id ? 'bg-gray-600 text-white' : 'bg-white'
          "
          @click="selectProspect(prospect.id)"
        >
          <ul>
            <li>Name: {{ prospect.name }}</li>
            <li>Source: {{ prospect.source }}</li>
            <li>Company: {{ prospect.company }}</li>
          </ul>
        </li>
      </ul>
    </div>

    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Select avatar</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      Select which avatar you want to use from your HeyGen account below.
    </p>

    <ul class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-12">
      <li
        :key="avatar.id"
        :id="avatar.id"
        v-for="avatar in avatars"
        class="rounded-lg border-gray-200 border hover:bg-gray-600 hover:text-white cursor-pointer shadow-lg"
        :class="avatarId === avatar.id ? 'bg-gray-600 text-white' : 'bg-white'"
        @click="selectAvatar(avatar.id)"
      >
        <img
          :src="avatar.preview"
          class="block w-full object-cover aspect-video object-[50%_30%] rounded-t-lg blur-0"
        />
        <div class="justify-between rounded-b-lg p-6">
          <p class="line-clamp-1 font-display text-2xl font-bold">
            {{ avatar.name }}
          </p>

          <p>{{ avatar.gender }}</p>
        </div>
      </li>
    </ul>

    <h3 class="text-4xl font-bold mb-2">
      <span
        class="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
        >Choose voice</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      Select which voice you want your avatar to use.
    </p>

    <div class="overflow-auto h-96 mb-12">
      <ul class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <li
          :key="voice.id"
          :id="voice.id"
          v-for="voice in voices"
          class="rounded-md border border-gray-200 p-3 shadow-lg flex cursor-pointer hover:bg-gray-600 hover:text-white"
          :class="voiceId === voice.id ? 'bg-gray-600 text-white' : 'bg-white'"
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
        >Write script</span
      >
    </h3>
    <p class="mb-4 text-gray-500 text-xl">
      This script is personalized to the prospects data you selected in step
      one. Make sure to use the personalization tokens.
    </p>

    <textarea class="copy" v-model="copy"></textarea>

    <button
      v-if="loggedIn"
      class="rounded-full border border-black bg-black px-5 py-2 text-lg text-white shadow-lg transition-all hover:bg-white hover:text-black"
      @click="render"
    >
      Create Video
    </button>
  </div>
</template>

<style lang="postcss">
.copy {
  @apply appearance-none rounded-md border border-gray-200 bg-white p-3 shadow-lg w-full text-xl text-gray-500 mb-4 h-[250px];
}
</style>
