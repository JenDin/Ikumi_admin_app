<!-- HTML code -->
<template>
  <tr
    class="border-t first:border-t-0 flex p-1 md:p-3 hover:bg-gray-100 md:table-row flex-col w-full flex-wrap"
  >
    <!-- Booking Name -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden"
        >Name</span
      >
      <p>{{ booking.firstName }} {{ booking.lastName }}</p>
    </td>
    <!-- Booking Email -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden"
        >Email</span
      >
      <p>{{ booking.email }}</p>
    </td>
    <!-- Booking guest amount -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden">
        Guests
      </span>
      <p>{{ booking.guestAmount }}</p>
    </td>
    <!-- Booking date -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden">
        Date
      </span>
      <p>{{ booking.date }}</p>
    </td>
    <!-- Booking time -->
    <td class="p-1 md:p-2">
      <span class="text-sm text-customBlueGray uppercase font-bold md:hidden">
        Date
      </span>
      <p>{{ booking.time }}</p>
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
        @click="sendBookingData()"
      />
    </td>
  </tr>
</template>

<!-- JavaScript code -->
<script>
import Button from "../components/Button.vue";
export default {
  name: "BookingData",
  components: {
    Button,
  },
  emits: ["deleteBooking", "updateBooking"],
  props: {
    booking: Object,
  },
  methods: {
    sendBookingData() {
      this.$emit("deleteBooking");
    },
    sendEditData() {
      this.$emit("updateBooking", { booking: this.booking });

      // Scroll to the bottom of the page where the form is
      window.scrollTo(0, document.body.scrollHeight);
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
