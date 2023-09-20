export function useListAvatars() {
  const runtimeConfig = useRuntimeConfig()
  const data = ref(null);
  const error = ref(null);
  type AvatarLite = {
    id: string
    name: string
    gender: string
    preview: string
  }

  function onlyAvatarLight(avatars: []) {
    const result: AvatarLite[] = [];

    avatars.forEach(avatar => {
      avatar.avatar_states.forEach(state => {
        if (state.custom_avatar_type === 'lite') {
          result.push({
            id: state.id,
            name: state.name,
            gender: state.gender,
            preview: state.normal_preview,
          })
        }
      })
    });

    return result
  }

  fetch("https://api.heygen.com/v1/avatar.list", {
    headers: {
      accept: 'application/json',
      'x-api-key': runtimeConfig.public.heyGenToken
    }
  })
    .then((res) => res.json())
    .then((json) => (data.value = onlyAvatarLight(json.data?.avatars)))
    .catch((err) => (error.value = err));

  return { data, error };
}