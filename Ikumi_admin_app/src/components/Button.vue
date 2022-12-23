<!-- HTML code -->
<template>
  <button class="bg-[#8fb0c1] rounded text-white hover:bg-[#6392a9]">
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
