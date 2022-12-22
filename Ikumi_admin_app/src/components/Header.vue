<!-- HTML code -->
<template>
  <header>
    <nav
      class="navbar flex justify-between items-center py-2 px-4 min-h-[70px] bg-[#131515be] text-white"
    >
      <div href="#">
        <RouterLink to="/" class="text-2xl uppercase text-white">
          <h1 class="text-white">Ikumi</h1>
        </RouterLink>
      </div>
      <!-- Nav links -->
      <ul
        class="navMenu flex justify-between items-center gap-8 pb-2 md:pb-0"
        :class="[{ active: isActive }]"
      >
        <li class="my-3 uppercase hover:text-orange-400">
          <RouterLink to="/">Home</RouterLink>
        </li>
        <li class="my-3 uppercase hover:text-orange-400">
          <RouterLink to="/dishes">Dishes</RouterLink>
        </li>
        <li class="my-3 uppercase hover:text-orange-400">
          <RouterLink to="/drinks">Drinks</RouterLink>
        </li>
        <li class="my-3 uppercase hover:text-orange-400">
          <RouterLink to="/bookings">Bookings</RouterLink>
        </li>
      </ul>

      <!-- Hamburger menu -->
      <div
        @click="toggleHamburgerMenu()"
        class="cursor-pointer md:hidden"
        :class="['hamburger', { active: isActive }]"
      >
        <span
          class="bg-white transition ease-in-out delay-50 bar block w-7 h-0.5 rounded my-1.5"
        ></span>
        <span
          class="bg-white transition ease-in-out delay-50 bar block w-7 h-0.5 rounded my-1.5"
        ></span>
        <span
          class="bg-white transition ease-in-out delay-50 bar block w-7 h-0.5 rounded my-1.5"
        ></span>
      </div>
    </nav>
  </header>
</template>

<!-- JavaScript code -->
<script>
import { RouterLink } from "vue-router";

export default {
  data() {
    return {
      isActive: false,
      landingPage: true,
    };
  },
  name: "Header",
  methods: {
    toggleHamburgerMenu() {
      // Toggle the hamburger menu
      this.isActive = !this.isActive;
    },
    onResize() {
      // Close the hamburger menu on bigger screens
      if (window.innerWidth < 768) {
        this.isActive = !this.isActive;
      } else {
        return this.isActive;
      }
    },
  },
};
</script>

<!-- CSS styles -->
<style scoped>
@media screen and (min-width: 300px) and (max-width: 768px) {
  /* Create an 'X' once the hamburger menu has been clicked */
  .hamburger.active .bar:nth-child(2) {
    opacity: 0;
  }
  .hamburger.active .bar:nth-child(1) {
    transform: translateY(10px) rotate(45deg);
  }
  .hamburger.active .bar:nth-child(3) {
    transform: translateY(-6px) rotate(-45deg);
  }

  .navMenu {
    position: fixed;
    left: -100%;
    top: 70px;
    gap: 0;
    flex-direction: column;
    width: 100%;
    text-align: center;
    transition: 0.3s;
    background: #131515be;
  }

  .nav-item {
    margin: 16px 0;
  }

  .active {
    left: 0;
    z-index: 1;
  }
  .deactive {
    left: 100;
  }
}
</style>
