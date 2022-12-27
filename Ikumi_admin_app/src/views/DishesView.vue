<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-8"
  >
    Manage Dishes
  </h1>

  <div class="mb-3 mt-4" v-if="deleteSuccessMsg">
    <p class="text-center text-lg font-semibold text-green-700">
      Dish deleted!
    </p>
  </div>

  <!-- Text content above the product table -->
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
                  @click="sortByName()"
                >
                  Name
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByCategory()"
                >
                  Category
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByDescription()"
                >
                  Description
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByPrice()"
                >
                  Price
                </th>
                <th class="text-left p-2">Edit</th>
                <th class="text-left p-2">Delete</th>
              </tr>
            </thead>
            <tbody class="flex-1 text-gray-700 sm:flex-none">
              <!-- Create an instance of the InventoryData component and loop through each product -->
              <DishMenu
                v-for="dish in dishes"
                :dish="dish"
                :key="dish._id"
                @deleteDish="deleteDish(dish._id)"
                @sendEditData="fillEditForm"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Dish Form -->
  <section class="mb-24">
    <h2 class="text-center font-bold text-[1.7rem]">Dish form</h2>
    <DishForm
      @dishAdded="getDishes()"
      @dishUpdated="getDishes()"
      :dish="dish"
    />
  </section>
  <Footer />
</template>

<!-- JavaScript code -->
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import DishMenu from "../components/DishMenu.vue";
import DishForm from "../components/DishForm.vue";
export default {
  components: {
    Header,
    Footer,
    DishMenu,
    DishForm,
  },
  data() {
    return {
      dishes: [],
      dish: null,
      deleteSuccessMsg: false,
    };
  },
  methods: {
    async getDishes() {
      const resp = await fetch("http://localhost:3000/api/dishes");

      const data = await resp.json();

      this.dishes = data;
    },
    async deleteDish(id) {
      const resp = await fetch("http://localhost:3000/api/dishes/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
      });

      const data = await resp.json();

      this.getDishes();
      this.deleteSuccessMsg = true;
      window.scrollTo(0, 0);

      setTimeout(() => {
        this.deleteSuccessMsg = false;
      }, 6000);
    },
    fillEditForm({ dish }) {
      this.dish = dish;
    },
    sortByName() {
      this.dishes.sort((a, b) => {
        const dishName1 = a.title.toUpperCase();
        const dishName2 = b.title.toUpperCase();

        if (dishName1 < dishName2) {
          return -1;
        } else if (dishName1 > dishName2) {
          return 1;
        }

        // The titles are equal
        return 0;
      });
    },
    sortByCategory() {
      this.dishes.sort((a, b) => {
        const dishCategory1 = a.category.toUpperCase();
        const dishCategory2 = b.category.toUpperCase();

        if (dishCategory1 < dishCategory2) {
          return -1;
        } else if (dishCategory1 > dishCategory2) {
          return 1;
        }

        return 0;
      });
    },
    sortByDescription() {
      this.dishes.sort((a, b) => {
        const dishDescription1 = a.description.toUpperCase();
        const dishDescription2 = b.description.toUpperCase();

        if (dishDescription1 < dishDescription2) {
          return -1;
        } else if (dishDescription1 > dishDescription2) {
          return 1;
        }

        return 0;
      });
    },
    sortByPrice() {
      this.dishes.sort((a, b) => {
        return a.price - b.price;
      });
    },
  },
  mounted() {
    this.getDishes();
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
