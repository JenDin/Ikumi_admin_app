<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-8"
  >
    Manage Drinks
  </h1>

  <div class="text-gray-700 p-8 mb-10">
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
              <DrinkMenu
                v-for="drink in drinks"
                :drink="drink"
                :key="drink._id"
                @deleteDrink="deleteDrink(drink._id)"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Drink Form -->
  <section class="mb-24">
    <h2 class="text-center text-2xl font-bold">Add a drink</h2>
    <DrinkForm @drinkAdded="getDrinks()" />
  </section>

  <Footer />
</template>

<!-- JavaScript code -->
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import DrinkMenu from "../components/DrinkMenu.vue";
import DrinkForm from "../components/DrinkForm.vue";
export default {
  components: {
    Header,
    Footer,
    DrinkMenu,
    DrinkForm,
  },
  data() {
    return {
      drinks: [],
    };
  },
  methods: {
    async getDrinks() {
      try {
        const resp = await fetch("http://localhost:3000/api/drinks");

        const data = await resp.json();

        this.drinks = data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteDrink(id) {
      try {
        const resp = await fetch("http://localhost:3000/api/drinks/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });

        const data = await resp.json();

        this.getDrinks();
      } catch (error) {
        console.log(error);
      }
    },
  },
  mounted() {
    this.getDrinks();
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>