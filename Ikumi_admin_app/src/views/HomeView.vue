<!-- HTML code -->
<template>
  <Header />
  <h1
    class="text-[1.6rem] md:text-4xl text-center uppercase font-extrabold mt-8 mb-10"
  >
    Administration
  </h1>

  <div class="flex flex-wrap justify-center max-w-[1000px] m-auto mb-24">
    <div class="w-full sm:1/3 md:w-1/2 xl:w-1/2 p-3">
      <!--  Card 1-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="rounded p-3 bg-customBlue">
            <i class="fa fa-wallet fa-2x fa-fw fa-inverse"></i>
          </div>

          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-500">Total Revenue</h5>
            <h3 class="font-bold text-2xl md:text-3xl">
              ¥4 524 459
              <span class="text-black"><i class="fas fa-caret-up"></i></span>
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 xl:w-1/2 p-3">
      <!-- Card 2-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="rounded p-3 bg-customBlue">
            <i class="fa fa-rocket fa-2x fa-fw fa-inverse text-white"></i>
          </div>

          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-700">Growth</h5>
            <h3 class="font-bold text-2xl md:text-3xl">
              27%
              <span class="text-black"><i class="fas fa-caret-up"></i></span>
            </h3>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 xl:w-1/2 p-3">
      <!-- Card 3-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="rounded p-3 bg-customBlue">
            <i class="fa fa-user fa-2x fa-fw fa-inverse text-white"></i>
          </div>

          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-700">Website visitors</h5>
            <h3 class="font-bold text-2xl md:text-3xl">1 548</h3>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full md:w-1/2 xl:w-1/2 p-3">
      <!-- Card 4-->
      <div class="bg-white border rounded shadow p-2">
        <div class="flex flex-row items-center">
          <div class="rounded p-3 bg-customBlue">
            <i class="fa fa-users fa-2x fa-fw fa-inverse text-white"></i>
          </div>
          <div class="flex-1 text-right md:text-center">
            <h5 class="font-bold uppercase text-gray-700">
              Customers (monthly)
            </h5>
            <h3 class="font-bold text-2xl md:text-3xl">322</h3>
          </div>
        </div>
      </div>
    </div>
    <img class="p-3" src="src/assets/graph.jpg" alt="" />
  </div>
  <Footer />
</template>

<!-- JavaScript code -->
<script>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>

<!-- CSS styles -->
<style scoped></style>
