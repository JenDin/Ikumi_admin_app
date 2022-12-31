<!-- HTML code -->
<template>
  <!-- Display a suitable message after a form submit -->
  <div class="mb-3 mt-4" v-if="postSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      A new reservation has been added!
    </p>
  </div>

  <div class="mb-3 mt-4" v-if="putSuccessMsg">
    <p class="text-center font-semibold text-green-700">
      Reservation details have been updated!
    </p>
  </div>

  <!-- Booking form -->
  <form class="relative py-3 sm:max-w-xl sm:mx-auto">
    <div
      class="relative px-4 py-5 bg-white mx-8 md:mx-10 shadow rounded-xl sm:p-10"
    >
      <div class="max-w-md mx-auto">
        <div class="flex items-center space-x-5">
          <div class="block font-semibold text-xl self-start text-gray-700">
            <!-- Change the text inside the form based on if the user adds or updates a booking -->
            <h2 class="leading-relaxed font-bold" v-if="addBtn">
              Add a new booking
            </h2>
            <h2 class="leading-relaxed font-bold" v-if="updateBtn">
              Update booking
            </h2>
          </div>
        </div>
        <div class="divide-y divide-gray-200">
          <div
            class="py-4 text-base leading-6 space-y-4 text-gray-700 sm:text-md sm:leading-7"
          >
            <!-- Booking first name label and input -->
            <div class="flex flex-col">
              <label for="firstName" class="text-[.9rem] font-medium"
                >First name</label
              >
              <input
                id="firstName"
                type="text"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="firstName"
              />
              <!-- First name error message -->
              <p v-if="firstNameErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a first name
              </p>
            </div>
            <!-- Booking last name label and input -->
            <div class="flex flex-col">
              <label for="lastName" class="text-[.9rem] font-medium"
                >Last name</label
              >
              <input
                id="lastName"
                type="text"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="lastName"
              />
              <!-- Last name error message -->
              <p v-if="lastNameErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a last name
              </p>
            </div>
            <!-- Booking email label and input -->
            <div class="flex flex-col">
              <label for="email" class="text-[.9rem] font-medium">Email</label>
              <input
                id="email"
                type="email"
                class="px-1 py-1.5 border focus:ring-gray-500 focus:border-gray-900 w-full sm:text-sm border-gray-300 rounded-md focus:outline-none text-gray-600"
                v-model="email"
              />
              <!-- Email error message -->
              <p v-if="emailErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter an email
              </p>
            </div>
            <!-- Guest amount label and select box -->
            <div class="flex flex-col">
              <label for="guestAmount" class="text-[.9rem] font-medium"
                >Guest amount</label
              >
              <select
                id="guestAmount"
                class="text-sm py-1.5 border bg-white border-gray-300 rounded-md focus:border-gray-900 text-gray-600 focus:outline-none pl-1"
                v-model="guestAmount"
              >
                <!-- Make this the default value at the start -->
                <option disabled value="">Choose amount</option>
                <option value="1">1 guest</option>
                <option value="2">2 guests</option>
                <option value="3">3 guests</option>
                <option value="4">4 guests</option>
                <option value="5">5 guests</option>
                <option value="6">6 guests</option>
                <option value="7">7 guests</option>
                <option value="8">8 guests</option>
              </select>
              <!-- Guest amount error message -->
              <p
                v-if="guestAmountErrorMsg"
                class="text-sm text-customRed mt-0.5"
              >
                * Please enter the guest amount
              </p>
            </div>
            <!-- Date -->
            <div class="mb-5">
              <label for="date" class="text-[.9rem] font-medium"> Date </label>
              <Datepicker
                class="bg-white border-gray-300 rounded-md focus:border-gray-900 text-gray-600 focus:outline-none"
                v-model="date"
                :min-date="new Date()"
                :enable-time-picker="false"
              />
              <!-- Date error message -->
              <p v-if="dateErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a date
              </p>
            </div>

            <!-- Time -->
            <div class="mb-5">
              <label for="time" class="text-[.9rem] font-medium"> Time </label>
              <select
                name="time"
                v-model="time"
                class="w-full text-sm py-1.5 border bg-white border-gray-300 rounded-md focus:border-gray-900 text-gray-600 focus:outline-none pl-1"
              >
                <option value="17:00">17:00</option>
                <option value="17:30">17:30</option>
                <option value="18:00">18:00</option>
                <option value="18:30">18:30</option>
                <option value="19:00">19:00</option>
                <option value="19:30">19:30</option>
                <option value="20:00">20:00</option>
                <option value="20:30">20:30</option>
                <option value="21:00">21:00</option>
              </select>
              <!-- Time error message -->
              <p v-if="timeErrorMsg" class="text-sm text-customRed mt-0.5">
                * Please enter a time
              </p>
            </div>
            <!-- Add button -->
            <Button
              v-if="addBtn"
              class="flex justify-center items-center w-full px-4 py-3 mt-0"
              btnText="Add new booking"
              @click.prevent="addBooking()"
            />
            <!-- Update button -->
            <Button
              v-if="updateBtn"
              class="flex justify-center items-center w-full px-4 py-3 mt-0"
              btnText="Update booking"
              @click.prevent="updateBooking()"
            />
          </div>
        </div>
      </div>
    </div>
  </form>
</template>

<!-- JavaScript code -->
<script>
import Button from "../components/Button.vue";
export default {
  name: "BookingForm",
  components: {
    Button,
  },
  emits: ["bookingAdded"],
  props: {
    booking: Object,
  },
  watch: {
    booking() {
      this.firstName = this.booking.firstName;
      this.lastName = this.booking.lastName;
      this.email = this.booking.email;
      this.guestAmount = this.booking.guestAmount;
      this.date = this.booking.date;
      this.time = this.booking.time;
      this.addBtn = false;
      this.updateBtn = true;
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      guestAmount: "",
      date: "",
      time: "",
      firstNameErrorMsg: false,
      lastNameErrorMsg: false,
      emailErrorMsg: false,
      guestAmountErrorMsg: false,
      dateErrorMsg: false,
      timeErrorMsg: false,
      postSuccessMsg: false,
      putSuccessMsg: false,
      addBtn: true,
      updateBtn: false,
      isSent: false,
    };
  },
  computed: {
    firstNameErrorMsg() {
      if (this.firstName === "" && this.isSent) {
        return true;
      }
      return false;
    },
    lastNameErrorMsg() {
      if (this.lastName === "" && this.isSent) {
        return true;
      }
      return false;
    },
    emailErrorMsg() {
      if (this.email === "" && this.isSent) {
        return true;
      }
      return false;
    },
    guestAmountErrorMsg() {
      if (this.guestAmount === "" && this.isSent) {
        return true;
      }
      return false;
    },
    dateErrorMsg() {
      if (this.date === "" && this.isSent) {
        return true;
      }
      return false;
    },
    timeErrorMsg() {
      if (this.time === "" && this.isSent) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async addBooking() {
      this.isSent = true;

      const bookingBody = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        guestAmount: this.guestAmount,
        date: this.date,
        time: this.time,
      };

      try {
        if (
          this.firstName !== "" &&
          this.lastName !== "" &&
          this.email !== "" &&
          this.guestAmount !== "" &&
          this.date !== "" &&
          this.time !== ""
        ) {
          const resp = await fetch("http://localhost:3000/api/bookings", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(bookingBody),
          });

          const data = await resp.json();
          this.firstName = "";
          this.lastName = "";
          this.email = "";
          this.guestAmount = "";
          this.date = "";
          this.time = "";
          this.isSent = false;
          this.postSuccessMsg = true;
          this.$emit("bookingAdded");

          setTimeout(() => {
            this.postSuccessMsg = false;
          }, 6000);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async updateBooking() {
      this.isSent = true;
      this.addBtn = false;
      this.updateBtn = true;

      const bookingBody = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        guestAmount: this.guestAmount,
        date: this.date,
        time: this.time,
      };

      try {
        const resp = await fetch(
          "http://localhost:3000/api/bookings/" + this.booking._id,
          {
            method: "PUT",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify(bookingBody),
          }
        );

        const data = await resp.json();
        this.firstName = "";
        this.lastName = "";
        this.email = "";
        this.guestAmount = "";
        this.date = "";
        this.time = "";
        this.isSent = false;
        this.addBtn = true;
        this.updateBtn = false;
        this.putSuccessMsg = true;
        this.$emit("bookingUpdated");

        setTimeout(() => {
          this.putSuccessMsg = false;
        }, 6000);
      } catch (error) {
        console.log("error");
      }
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
