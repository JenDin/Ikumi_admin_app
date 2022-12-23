<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-8"
  >
    Manage Dishes
  </h1>

  <!-- Text content above the product table -->
  <div class="text-gray-700 p-8 mb-24">
    <div class="container space-y-8 text-sm mx-auto">
      <div class="space-y-2">
        <!-- Product Table -->
        <div
          class="bg-white shadow-lg hover:shadow-xl rounded-md overflow-hidden"
        >
          <table class="table table-auto w-full leading-normal">
            <thead
              class="uppercase text-gray-600 text-md font-semibold bg-gray-200"
            >
              <tr class="hidden md:table-row">
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                >
                  Name
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                >
                  Category
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                >
                  Description
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                >
                  Price
                </th>
                <th class="text-left p-2">Edit</th>
                <th class="text-left p-2">Delete</th>
              </tr>
            </thead>
            <tbody class="flex-1 text-gray-700 sm:flex-none">
              <!-- Create an instance of the InventoryData component and loop through each product -->
              <DishMenu v-for="dish in dishes" :dish="dish" :key="dish.id" />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<!-- JavaScript code -->
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import DishMenu from "../components/DishMenu.vue";
export default {
  components: {
    Header,
    Footer,
    DishMenu,
  },
  data() {
    return {
      dishes: [],
    };
  },
  methods: {
    async getDishes() {
      const resp = await fetch("http://localhost:3000/api/dishes");

      const data = await resp.json();

      this.dishes = data;
    },
  },
  mounted() {
    this.getDishes();
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
