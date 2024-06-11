<template>
  <div class="navbar">
    <a href="https://kpi.fei.tuke.sk/sk">
      <img :src="isMobile ? require('@/assets/kpi_logo_small.png') : require('@/assets/kpi_logo.png')" alt="LogoKPI" />
    </a>

    <div class="veci-napravo">
      <div class="actual-week">
        <span class="week-prefix"> Aktuálny týždeň: </span>
        <span> {{ getCurrentWeek() }} </span>
      </div>

      
      <!-- <div class="input-field" v-if="showInputField">
        <v-icon class="icon" icon="mdi-magnify" @click="showInputOnMobile" v-if="isMobile"></v-icon>
        <v-text-field class="search-bar" density="compact" label="Hľadaj predmet" append-inner-icon="mdi-magnify"
          single-line hide-details persistent-clear variant="outlined" @click:append-inner="onClick"></v-text-field>
      </div> -->
    </div>
  </div>
  <!-- <hr class="navbar-horizontal-line" /> -->
  <!-- <div class="input-field-mobile" v-if="showMobileInput">
    <v-text-field :loading="loading" density="compact" variant="filled" label="Hľadaj predmet" single-line hide-details
      @click:append-inner="onClick"></v-text-field>
  </div> -->
</template>

<script>
export default {
  data() {
    return {
      showInputField: true,
      isMobile: false,
      showMobileInput: false,
    };
  },
  methods: {
    showInputOnMobile() {
      this.showMobileInput = !this.showMobileInput;
    },
    toggleInputField() {
      this.showInputField = !this.showInputField;
    },
    checkMobileDevice() {
      this.isMobile = window.innerWidth <= 900;
      if (window.innerWidth > 768) {
        this.showMobileInput = false;
      }
    },
    //https://github.com/lubomirdruga/jaky-je-boha-tyzden
    getCurrentWeek() {
      const startDateOfSemester = new Date("2023-09-25");
      startDateOfSemester.setHours(0, 0, 0, 0);
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      let week = Math.round(
        (currentDate - startDateOfSemester) / (7 * 24 * 60 * 60 * 1000)
      );
      week = [0, 5, 6].includes(currentDate.getDay()) ? week : week + 1;

      return week;
    },
  },
  mounted() {
    this.checkMobileDevice();
    window.addEventListener("resize", this.checkMobileDevice);
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.checkMobileDevice);
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 5vw 0 5vw;
  height: 4.5em;
  background-color: #F5F6F7;

  @media (max-width: 900px) {
    height: 4em;
  }
}

.navbar-horizontal-line {
  width: 100%;
  background-color: rgba(37, 37, 37, 0.3);
  color: transparent;
  box-shadow: 0px -3px 5px rgba(0, 0, 0, 0.3);
  height: 1px;
}

@media (max-width: 900px) {
  .logo-kpi {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
  .week-prefix {
    display: none;
  }
  .input-field .search-bar {
    display: none;
  }

  .input-field .icon {
    cursor: pointer;
  }

  .input-field {
    max-width: 3rem;
  }
}

@media (min-width: 901px) {
  .input-field-mobile {
    display: none;
  }
}
.veci-napravo {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.input-field {
  width: 20rem;
  padding-bottom: 10px;
  color: black;
  background-color: red !important;
}

.actual-week {
  color: black;
  font-family: Inter;
  font-family: Inter, sans-serif !important;
  font-weight: 600;
  line-height: normal;
  margin-right: 10px;
  padding-bottom: 0.5rem;
}

.input-field .search-bar {
  cursor: pointer;
}
</style>
