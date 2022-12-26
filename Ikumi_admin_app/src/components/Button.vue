<!-- HTML code -->
<template>
  <button
    class="bg-[#8fb0c1] rounded hover:bg-[#6392a9] hover:text-white text-black"
  >
    {{ btnText }}
  </button>
</template>

<!-- JavaScript code -->
<script>
export default {
  props: {
    btnText: String,
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
