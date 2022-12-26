<!-- HTML code -->
<template>
  <!-- Display a suitable message after a form submit -->
  <div class="mb-3 mt-4" v-if="postSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      A new dish has been added!
    </p>
  </div>

  <div class="mb-3 mt-4" v-if="putSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      Dish details have been updated!
    </p>
  </div>

  <form class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      class="relative px-4 py-5 bg-white mx-8 md:mx-10 shadow rounded-xl sm:p-10"
    >
      <div class="max-w-md mx-auto">
        <div class="flex items-center space-x-5">
          <div class="block font-semibold text-xl self-start text-gray-700">
            <!-- Change the text inside the form based on if the user adds or updates a dish -->
            <h2 class="leading-relaxed font-bold" v-if="addBtn">
              Add a new dish
            </h2>
            <h2 class="leading-relaxed font-bold" v-if="updateBtn">
              Update dish
            </h2>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
          >
            <!-- Dish name label and input -->
            <div class="flex flex-col">
              <label for="name" class="text-[.9rem] font-medium">Name</label>
              <input
                id="name"
                type="text"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="name"
              />
              <p v-if="nameErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a dish name
              </p>
            </div>
            <!-- Dish label and select box -->
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
                <option value="Sashimi/Nigiri">Sashimi/Nigiri</option>
                <option value="Rolls">Rolls</option>
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
            btnText="Add new dish"
            @click.prevent="addDish()"
          />
          <!-- Update button -->
          <Button
            v-if="updateBtn"
            class="flex justify-center items-center w-full px-4 py-3 mt-0"
            btnText="Update dish"
            @click.prevent="updateDish()"
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
  name: "DishForm",
  components: {
    Button,
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
      isSent: false,
      addBtn: true,
      updateBtn: false,
    };
  },
  emits: ["dishAdded", "dishUpdated"],
  props: {
    dish: Object,
  },
  watch: {
    dish() {
      this.name = this.dish.title;
      this.category = this.dish.category;
      this.description = this.dish.description;
      this.price = this.dish.price;

      this.addBtn = false;
      this.updateBtn = true;
    },
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
    async addDish() {
      this.isSent = true;

      const dishBody = {
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
          const resp = await fetch("http://localhost:3000/api/dishes", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(dishBody),
          });

          const data = await resp.json();

          this.name = "";
          this.category = "";
          this.description = "";
          this.price = "";
          this.isSent = false;
          this.$emit("dishAdded");
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateDish() {
      this.isSent = true;

      const dishBody = {
        title: this.name,
        category: this.category,
        description: this.description,
        price: this.price,
      };

      try {
        const resp = await fetch(
          "http://localhost:3000/api/dishes/" + this.dish._id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(dishBody),
          }
        );

        const data = await resp.json();

        this.name = "";
        this.category = "";
        this.description = "";
        this.price = "";
        this.addBtn = true;
        this.updateBtn = false;
        this.isSent = false;
        this.$emit("dishUpdated");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
