import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import DishesView from "../views/DishesView.vue";
// import DrinksView from "../views/DrinksView.vue";
// import BookingsView from "../views/BookingsView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/dishes",
      name: "dishes",
      component: DishesView,
    },
    // {
    //   path: "/drinks",
    //   name: "drinks",
    //   component: DrinksView,
    // },
    // {
    //   path: "/bookings",
    //   name: "bookings",
    //   component: BookingsView,
    // },
  ],
});

export default router;
