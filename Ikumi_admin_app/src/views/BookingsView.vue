<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-8"
  >
    Manage Bookings
  </h1>

  <div class="mb-3 mt-4" v-if="deleteSuccessMsg">
    <p class="text-center text-lg font-semibold text-green-700">
      Booking deleted!
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
                  @click="sortByEmail()"
                >
                  Email
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByGuestAmount()"
                >
                  Guests
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByDate()"
                >
                  Date
                </th>
                <th
                  class="text-left p-2 hover:bg-gray-400 hover:cursor-pointer"
                  @click="sortByTime()"
                >
                  Time
                </th>
                <th class="text-left p-2">Edit</th>
                <th class="text-left p-2">Delete</th>
              </tr>
            </thead>
            <tbody class="flex-1 text-gray-700 sm:flex-none">
              <!-- Create an instance of the BookingData component and loop through each booking -->
              <BookingData
                v-for="booking in bookings"
                :booking="booking"
                :key="booking._id"
                @deleteBooking="deleteBooking(booking._id)"
                @updateBooking="fillEditForm"
              />
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  <!-- Booking Form -->
  <section class="mb-24">
    <h2 class="text-center font-bold text-[1.7rem]">Booking form</h2>
    <BookingForm
      @bookingAdded="getBookings()"
      @bookingUpdated="getBookings()"
      :booking="booking"
    />
  </section>

  <Footer />
</template>

<!-- JavaScript code -->
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import BookingData from "../components/BookingData.vue";
import BookingForm from "../components/BookingForm.vue";
export default {
  components: {
    Header,
    Footer,
    BookingData,
    BookingForm,
  },
  data() {
    return {
      booking: null,
      bookings: [],
      deleteSuccessMsg: false,
    };
  },
  methods: {
    async getBookings() {
      try {
        const resp = await fetch("http://localhost:3000/api/bookings");

        const data = await resp.json();

        this.bookings = data;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBooking(id) {
      try {
        const resp = await fetch("http://localhost:3000/api/bookings/" + id, {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
        });

        const data = await resp.json();

        this.getBookings();
        this.deleteSuccessMsg = true;
        window.scrollTo(0, 0);

        setTimeout(() => {
          this.deleteSuccessMsg = false;
        }, 6000);
      } catch (error) {
        console.log(error);
      }
    },
    fillEditForm({ booking }) {
      this.booking = booking;
    },
    sortByName() {
      this.bookings.sort((a, b) => {
        const bookingName1 = a.firstName.toUpperCase();
        const bookingName2 = b.firstName.toUpperCase();

        if (bookingName1 < bookingName2) {
          return -1;
        } else if (bookingName1 > bookingName2) {
          return 1;
        }

        // Names are equal
        return 0;
      });
    },
    sortByEmail() {
      this.bookings.sort((a, b) => {
        const bookingEmail1 = a.email.toUpperCase();
        const bookingEmail2 = b.email.toUpperCase();

        if (bookingEmail1 < bookingEmail2) {
          return -1;
        } else if (bookingEmail1 > bookingEmail2) {
          return 1;
        }
        // Emails are equal
        return 0;
      });
    },
    sortByGuestAmount() {
      this.bookings.sort((a, b) => {
        const bookingGuestAmount1 = a.guestAmount.toUpperCase();
        const bookingGuestAmount2 = b.guestAmount.toUpperCase();

        if (bookingGuestAmount1 < bookingGuestAmount2) {
          return -1;
        } else if (bookingGuestAmount1 > bookingGuestAmount2) {
          return 1;
        }
        // Guest amounts are equal
        return 0;
      });
    },
    sortByDate() {
      this.bookings.sort((a, b) => {
        const bookingDate1 = a.date.toUpperCase();
        const bookingDate2 = b.date.toUpperCase();

        if (bookingDate1 < bookingDate2) {
          return -1;
        } else if (bookingDate1 > bookingDate2) {
          return 1;
        }
        // Dates are equal
        return 0;
      });
    },
    sortByTime() {
      this.bookings.sort((a, b) => {
        const bookingTime1 = a.time.toUpperCase();
        const bookingTime2 = b.time.toUpperCase();

        if (bookingTime1 < bookingTime2) {
          return -1;
        } else if (bookingTime1 > bookingTime2) {
          return 1;
        }
        // Times are equal
        return 0;
      });
    },
  },
  mounted() {
    this.getBookings();
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
