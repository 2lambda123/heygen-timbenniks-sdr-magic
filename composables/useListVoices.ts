export function useListVoices() {
  const runtimeConfig = useRuntimeConfig()
  const data = ref(null);
  const error = ref(null);

  type AvatarVoice = {
    id: string
    name: string
    tags: string
    language: string
    flag?: string
    gender: string
    preview: string
  }

  function cleanList(voices: []) {
    const result: AvatarVoice[] = [];

    voices.forEach(voice => {
      result.push({
        id: voice.voice_id,
        name: voice.display_name,
        tags: voice.tags,
        language: voice.language,
        flag: voice.flag,
        gender: voice.gender,
        preview: voice.preview.movio,
      })
    });

    return result.filter(voice => voice.language === "English")
  }

  fetch("https://api.heygen.com/v1/voice.list", {
    headers: {
      accept: 'application/json',
      'x-api-key': runtimeConfig.public.heyGenToken
    }
  })
    .then((res) => res.json())
    .then((json) => (data.value = cleanList(json.data?.list)))
    .catch((err) => (error.value = err));

  return { data, error };
}