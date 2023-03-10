<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-8"
  >
    Manage Drinks
  </h1>

  <div class="mb-3 mt-4" v-if="deleteSuccessMsg">
    <p class="text-center text-lg font-semibold text-green-700">
      Drink deleted!
    </p>
  </div>

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
              <DrinkMenu
                v-for="drink in drinks"
                :drink="drink"
                :key="drink._id"
                @deleteDrink="deleteDrink(drink._id)"
                @sendEditData="fillEditForm"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Drink Form -->
  <section class="mb-24">
    <h2 class="text-center font-bold text-[1.7rem]">Drink form</h2>
    <DrinkForm
      @drinkAdded="getDrinks()"
      @drinkUpdated="getDrinks()"
      :drink="drink"
    />
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
      drink: null,
      drinks: [],
      deleteSuccessMsg: false,
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
        this.deleteSuccessMsg = true;
        window.scrollTo(0, 0);

        setTimeout(() => {
          this.deleteSuccessMsg = false;
        }, 6000);

        this.getDrinks();
      } catch (error) {
        console.log(error);
      }
    },
    fillEditForm({ drink }) {
      this.drink = drink;
    },
    sortByName() {
      this.drinks.sort((a, b) => {
        const drinkName1 = a.title.toUpperCase();
        const drinkName2 = b.title.toUpperCase();

        if (drinkName1 < drinkName2) {
          return -1;
        } else if (drinkName1 > drinkName2) {
          return 1;
        }
        // Names are eqal
        return 0;
      });
    },
    sortByCategory() {
      this.drinks.sort((a, b) => {
        const drinkCategory1 = a.category.toUpperCase();
        const drinkCategory2 = b.category.toUpperCase();

        if (drinkCategory1 < drinkCategory2) {
          return -1;
        } else if (drinkCategory1 > drinkCategory2) {
          return 1;
        }

        // Categories are equal
        return 0;
      });
    },
    sortByDescription() {
      this.drinks.sort((a, b) => {
        const drinkDescription1 = a.description.toUpperCase();
        const drinkDescription2 = b.description.toUpperCase();

        if (drinkDescription1 < drinkDescription2) {
          return -1;
        } else if (drinkDescription1 > drinkDescription2) {
          return 1;
        }
        // Descriptions are equal
        return 0;
      });
    },
    sortByPrice() {
      this.drinks.sort((a, b) => {
        return a.price - b.price;
      });
    },
  },
  mounted() {
    this.getDrinks();
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
