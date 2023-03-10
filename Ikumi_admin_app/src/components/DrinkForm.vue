<!-- HTML code -->
<template>
  <!-- Display a suitable message after a form submit -->
  <div class="mb-3 mt-4" v-if="postSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      A new drink has been added!
    </p>
  </div>

  <div class="mb-3 mt-4" v-if="putSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      Drink details have been updated!
    </p>
  </div>

  <!-- Drink form -->
  <form class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      class="relative px-4 py-5 bg-white mx-8 md:mx-10 shadow rounded-xl sm:p-10"
    >
      <div class="max-w-md mx-auto">
        <div class="flex items-center space-x-5">
          <div class="block font-semibold text-xl self-start text-gray-700">
            <!-- Change the text inside the form based on if the user adds or updates a drink -->
            <h2 class="leading-relaxed font-bold" v-if="addBtn">
              Add a new drink
            </h2>
            <h2 class="leading-relaxed font-bold" v-if="updateBtn">
              Update drink
            </h2>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
          >
            <!-- Drink name label and input -->
            <div class="flex flex-col">
              <label for="name" class="text-[.9rem] font-medium">Name</label>
              <input
                id="name"
                type="text"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="name"
              />
              <p v-if="nameErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a drink name
              </p>
            </div>
            <!-- Drink label and select box -->
            <div class="flex flex-col">
              <label for="colors" class="text-[.9rem] font-medium"
                >Category</label
              >
              <select
                id="category"
                class="text-sm py-1.5 border bg-white border-gray-300 rounded-md focus:border-gray-900 text-gray-600 focus:outline-none pl-1"
                v-model="category"
              >
                <!-- Make this the default value at the start -->
                <option disabled value="">Choose a category</option>
                <option value="Sake">Sake</option>
                <option value="Wine">Wine</option>
              </select>
              <p v-if="categoryErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a category
              </p>
            </div>
            <!-- Description label and input -->
            <div class="flex flex-col">
              <label for="description" class="text-[.9rem] font-medium"
                >Description</label
              >
              <input
                id="description"
                type="text"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="description"
              />
              <p
                v-if="descriptionErrorMsg"
                class="text-sm text-customRed mt-0.5"
              >
                * Please enter a description
              </p>
            </div>
            <!-- Price label and input -->
            <div class="flex flex-col">
              <label for="price" class="text-[.9rem] font-medium">Price</label>
              <input
                id="price"
                type="number"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="price"
              />
              <p v-if="priceErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a price
              </p>
            </div>
          </div>
          <!-- Add button -->
          <Button
            v-if="addBtn"
            class="flex justify-center items-center w-full px-4 py-3 mt-0"
            btnText="Add new drink"
            @click.prevent="addDrink()"
          />
          <!-- Update button -->
          <Button
            v-if="updateBtn"
            class="flex justify-center items-center w-full px-4 py-3 mt-0"
            btnText="Update drink"
            @click.prevent="updateDrink()"
          />
        </div>
      </div>
    </div>
  </form>
</template>

<!-- JavaScript code -->
<script>
import Button from "../components/Button.vue";
export default {
  name: "DrinkForm",
  components: {
    Button,
  },
  emits: ["drinkAdded"],
  props: {
    drink: Object,
  },
  watch: {
    drink() {
      this.name = this.drink.title;
      this.category = this.drink.category;
      this.description = this.drink.description;
      this.price = this.drink.price;
      this.addBtn = false;
      this.updateBtn = true;
    },
  },
  data() {
    return {
      name: "",
      category: "",
      description: "",
      price: "",
      nameErrorMsg: false,
      categoryErrorMsg: false,
      descriptionErrorMsg: false,
      priceErrorMsg: false,
      postSuccessMsg: false,
      putSuccessMsg: false,
      addBtn: true,
      updateBtn: false,
      isSent: false,
    };
  },
  computed: {
    nameErrorMsg() {
      if (this.name === "" && this.isSent) {
        return true;
      }
      return false;
    },
    categoryErrorMsg() {
      if (this.category === "" && this.isSent) {
        return true;
      }
      return false;
    },
    descriptionErrorMsg() {
      if (this.description === "" && this.isSent) {
        return true;
      }
      return false;
    },
    priceErrorMsg() {
      if (this.price === "" && this.isSent) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async addDrink() {
      this.isSent = true;

      const drinkBody = {
        title: this.name,
        category: this.category,
        description: this.description,
        price: this.price,
      };

      try {
        if (
          this.name !== "" &&
          this.category !== "" &&
          this.description !== "" &&
          this.price !== ""
        ) {
          const resp = await fetch("http://localhost:3000/api/drinks", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(drinkBody),
          });

          const data = await resp.json();
          this.name = "";
          this.category = "";
          this.description = "";
          this.price = "";
          this.isSent = false;
          this.postSuccessMsg = true;
          this.$emit("drinkAdded");

          setTimeout(() => {
            this.postSuccessMsg = false;
          }, 6000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateDrink() {
      this.isSent = true;

      const drinkBody = {
        title: this.name,
        category: this.category,
        description: this.description,
        price: this.price,
      };

      try {
        const resp = await fetch(
          "http://localhost:3000/api/drinks/" + this.drink._id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(drinkBody),
          }
        );
        const data = await resp.json();
        this.name = "";
        this.category = "";
        this.description = "";
        this.price = "";
        this.isSent = false;
        this.addBtn = true;
        this.updateBtn = false;
        this.putSuccessMsg = true;
        this.$emit("drinkUpdated");

        setTimeout(() => {
          this.putSuccessMsg = false;
        }, 6000);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
