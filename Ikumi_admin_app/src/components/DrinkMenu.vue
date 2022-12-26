<!-- HTML code -->
<template>
  <tr
    class="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap"
  >
    <!-- Drink Name -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden"
        >Name</span
      >
      <p>{{ drink.title }}</p>
    </td>
    <!-- Drink Category -->
    <td class="p-1 md:p-2 md:max-w-[2rem]">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden"
        >Category</span
      >
      <p>{{ drink.category }}</p>
    </td>
    <!-- Drink Description -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden">
        Description
      </span>
      <p>{{ drink.description }}</p>
    </td>
    <!-- Drink Price -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden">
        Price
      </span>
      <p>{{ drink.price }}</p>
    </td>
    <!-- Edit Button -->
    <td class="p-1 md:p-2">
      <p class="text-sm uppercase font-bold md:hidden">Edit</p>
      <Button
        class="text-sm px-3 py-1 mt-3 text-center inline-flex items-center mb-1.5"
        btnText="Edit"
        @click="sendEditData()"
      />
    </td>
    <!-- Delete Button -->
    <td class="p-1 md:p-2">
      <p class="text-sm uppercase font-bold md:hidden">Delete</p>
      <Button
        class="text-sm px-3 py-1 mt-3 text-center inline-flex items-center mb-1.5"
        btnText="Delete"
        @click="sendDrinkData()"
      />
    </td>
  </tr>
</template>

<!-- JavaScript code -->
<script>
import Button from "../components/Button.vue";
export default {
  name: "DrinkMenu",
  components: {
    Button,
  },
  emits: ["deleteDrink", "sendEditData"],
  props: {
    drink: Object,
  },
  methods: {
    sendDrinkData() {
      this.$emit("deleteDrink");
    },
    sendEditData() {
      this.$emit("sendEditData", { drink: this.drink });
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
