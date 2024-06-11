<template>
  <div style="margin-top:5rem;"></div>
  <NavigationBarKPI />
  <div class="hlavna-cast">
    <div class="veci-nalavo">
      <div class="toggle-buttons">
        <button :class="{ 'active-button': stupenButton === 'BCbutton' }" @click="setStupenButton('BCbutton')"
          class="first-toggle-button">
          1. stupeň - Bakalárske štúdium
        </button>
        <button :class="{ 'active-button': stupenButton === 'INGbutton' }" @click="setStupenButton('INGbutton')"
          class="second-toggle-button">
          2. stupeň - Inžinierske štúdium
        </button>
      </div>

      <div ref="dropdown">
        <label for="dropdown" class="dropdown-label">Výber predmetov:</label>
        <div class="dropdown">

          <div class="select-box" @click="toggleDropdown">
            <span>{{ selectedOptionsText }}</span>
            <img src="../assets/dropdown_arrow.png" style="max-width: 15px" />
          </div>

          <div v-if="isDropdownVisible" class="dropdown-content">
            <input type="checkbox" id="option-all" v-model="selectAll" @change="toggleAll" />
            <label for="option-all">Všetky</label>
            <div class="checkbox-container">
              <div class="inside-checkbox" v-for="(option, index) in options" :key="index">
                <div class="checkbox-items">
                  <input style="margin-top: 5px;" ref="check" type="checkbox" :id="'option-' + index"
                    v-model="option.selected" @change="onFilterChanged" />
                  <div class="option-text">
                    <label :for="'option-' + index">{{ option.label }}</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <div class="legenda" v-if="(this.stupenButton == 'BCbutton')">
        <h3>Legenda:</h3>
        <div v-for="(color, categoryName) in legendaCategoryColors" :key="categoryName" class="prvok-v-legende" @click="clickedLegendItem(categoryName)">
          <div class="rect" :style="{ backgroundColor: color }">
            <!-- This div will now have the background color of the category dynamically -->
          </div>
          <div :class="{ 'prvok-v-legende-unselected': isCategoryUnselected(categoryName) }">
            {{ categoryName }}
          </div>
        </div>
      </div>
    </div>



    <div class="bc-rozvrh" v-if="(this.stupenButton == 'BCbutton')">
      <div class="switch-rozvrh-buttons">
      <button :class="{ 'active-button': semesterButton === 'ZSbutton' }" @click="setSemesterButton('ZSbutton')">ZS</button>
      <button :class="{ 'active-button': semesterButton === 'LSbutton' }" @click="setSemesterButton('LSbutton')">LS</button>
     </div>
      <div v-for="(semesters, year) in filteredSubjectsBC" class="rocnik" :key="year">
        <h3>{{ year }}</h3>

        <transition-group name="fade">
          <div v-for="(subjectsList, semester) in semesters" class="semester" :key="semester">
            <div v-for="subject in subjectsList" class="predmet" :key="subject.path" @click="openSubjectPopup(subject)"
                 :style="{
              backgroundColor: categoryColors[subject.category],
              color: calculateTextColor(categoryColors[subject.category])
            }">
              <div class="predmet-text">{{ subject.name }}</div>
            </div>
          </div>
        </transition-group>
      </div>
    </div>


    <div class="ing-rozvrh" v-if="(this.stupenButton == 'INGbutton')">

      <h3 style="text-align: center; width: 100%">Povinné predmety</h3>
      <div class="ing-section">
        <div v-for="(semesters, year) in filteredSubjectsIng.Povinné" class="ing-section" :key="year">

          <div v-for="(subjectsList, semester) in semesters" class="semester" :key="semester">
            <h3>{{ year }} {{ semester }}</h3>
            <div v-for="subject in subjectsList" class="predmet" :key="subject.path" @click="openSubjectPopup(subject)"
              :style="{
                backgroundColor: categoryColors[subject.category],
                color: calculateTextColor(categoryColors[subject.category]),
                width: '17vw'
              }">
              <div class="predmet-text">{{ subject.name }}</div>
            </div>
          </div>

        </div>
      </div>

      <h3 style="text-align: center; width: 100%">Povinne voliteľné predmety</h3>
      <div class="ing-section">
        <div v-for="(semesters, semesterName) in filteredSubjectsIng['Povinne voliteľné']" :key="semesterName">
          <h3 style="width:100%; text-align: center; margin-bottom: 10px;">{{ semesterName }}</h3>
          <div class="ing-semester">

            <div v-for="subject in semesters" :key="subject.path">
              <div class="predmet" :key="subject.path" @click="openSubjectPopup(subject)" :style="{
                backgroundColor: categoryColors[subject.category],
                color: calculateTextColor(categoryColors[subject.category]),
                marginBottom: '10px',
                width: '17vw'
              }">
                <div class="predmet-text">{{ subject.name }}</div>
              </div>
            </div>            
          </div>

        </div>
      </div>

    </div>


    <transition name="popup">
      <div v-if="isPopupOpen" class="popup-container" ref="popup"
        :style="{ borderLeftColor: categoryColors[currentCategory] }">
        <SubjectInfo ref="subjectInfoComponent" :source="currentSubject" :zapocetColor="categoryColors[currentCategory]"
          :textColorInZapocet="calculateTextColor(categoryColors[currentCategory])" />

        <div class="close-popup" @click="closeSubjectPopup"><img src="../assets/close.png" alt="Close"></div>
      </div>
    </transition>
  </div>
  <FooterComponentKPI />
</template>

<script>
import SubjectInfo from "./SubjectInfo.vue";
import FooterComponentKPI from "@/components/kpi/FooterComponent.vue";
import NavigationBarKPI from "@/components/kpi/NavigationBar.vue";

export default {
  components: {
    SubjectInfo,
    FooterComponentKPI,
    NavigationBarKPI,
  },
  data() {
    return {
      optionsBc: [
        { label: "Základy algoritmizácie a programovania", selected: true },
        { label: "Repetitórium z matematiky", selected: true },
        { label: "Matematika 1", selected: true },
        { label: "Matematika 2", selected: true },
        { label: "Programovanie", selected: true },
        { label: "Základy softvérového inžinierstva", selected: true },
        { label: "Princípy počítačového inžinierstva", selected: true },
        
        { label: "Diskrétna matematika", selected: true },
        { label: "Údajové štruktúry a algoritmy", selected: true },
        { label: "Objektové programovanie", selected: true },
        { label: "Operačné systémy", selected: true },
        { label: "Architektúry poč. systémov", selected: true },
        { label: "Kyberbezpečnosť", selected: true },
        

        { label: "Komponentové programovanie", selected: true },
        { label: "Num. matematika a štatistika", selected: true },
        { label: "Formálne jazyky", selected: true },
        { label: "Databázové systémy", selected: true },
        { label: "Počítačové siete", selected: true },
        { label: "Bezpečnostný manažment", selected: true },
        
        { label: "Bakalársky projekt", selected: true },
        { label: "Manažment projektov", selected: true },
        { label: "Inteligentné systémy v informatike", selected: true },
        { label: "Používateľské rozhrania", selected: true },
        { label: "Aplikácie poč. sietí", selected: true },
        { label: "Základy kryptografie", selected: true },
        { label: "Priemyselná a systémová bezpečnosť", selected: true },
        { label: "CCNA Security", selected: true },

        { label: "SAP ABAP Programovanie", selected: true },
        { label: "IoT a chytré zariadenia", selected: true },
        { label: "Bakalárska práca", selected: true },
        { label: "Bezpečnosť v počítačových systémoch", selected: true },
        { label: "Počítačové hry", selected: true },
        { label: "Asembler", selected: true },
        { label: "Právne otázky kyber. bezpečnosti", selected: true },
      ],
      optionsIng: [
        { label: "Aktuálne trendy v informatike a kyberbezpečnosti 1", selected: true },
        { label: "Tímový projekt", selected: true },
        { label: "Sémantika programovacích jazykov", selected: true },
        { label: "Diplomový projekt 1", selected: true },
        { label: "Paralelné počítačové systémy", selected: true },
        { label: "Aktuálne trendy v informatike a kyberbezpečnosti 2", selected: true },
        { label: "Bezpečnosť informačných a komunikačných systémov", selected: true },
        { label: "Diplomový projekt 2", selected: true },
        { label: "Paralelné programovanie", selected: true },
        { label: "Pracovné a obchodné právo", selected: true },
        { label: "Základy podnikateľských zručností pre neekonómov", selected: true },
        { label: "Evolúcia softvérových systémov", selected: true },
        { label: "Číslicové systémy a jazyk VHDL", selected: true },
        { label: "Smerovacie algoritmy v počítačových sieťach", selected: true },
        { label: "Aplikácie počítačových sietí", selected: true },
        { label: "Aplikácie zabezpečenia počítačových sietí", selected: true },
        { label: "Vývoj doménovo-špecifických jazykov", selected: true },
        { label: "Funkcionálne programovanie", selected: true },
        { label: "Teória typov", selected: true },
        { label: "Technológie a systémy spracovania údajov", selected: true },
        { label: "Modelovanie a simulácia", selected: true },
        { label: "Distribuované systémy", selected: true },
        { label: "Výskumné metódy v informatike a kyberbezpečnosti", selected: true },
        { label: "Inžinierstvo požiadaviek", selected: true },
        { label: "Počítačová grafika", selected: true },
        { label: "Zručnosti pre úspech – z univerzity do praxe", selected: true },
        { label: "Riešenie problémov rozsiahlych infraštruktúr", selected: true },
        { label: "Technológie na báze prepínaných sietí", selected: true },
        { label: "Forenzná analýza", selected: true },
        { label: "Softvérová bezpečnosť", selected: true }
      ],
      justOpenedDropDown: false,
      selectAll: true,
      isDropdownVisible: false,
      stupenButton: "BCbutton",
      semesterButton: null,
      isPopupOpen: false,
      currentSubject: null,
      justOpenedPopup: false,
      categoryColors: {
        'Matematika': "#FFDE5E", // Gold
        'Algoritmizácia': "#BCD74C", // Green
        'Vývoj softvéru': "#00A58B", // Dark Green
        'Kyberbezpečnosť': "#D5EDE6", // Light Turquoise
        'Hardvér, Počítačové siete': "#7FB7D2", // Blue
        'Technológie': "#F69256", // Orange
        'Princípy': "#B796C5", // Purple
        'ing': '#FFFFFF',
      },
      currentCategory: "Algoritmizácia", // Example current category
      subjectsBC: {
        "1. ročník": {
          ZS: [
            {
              name: "Základy algoritmizácie a programovania",
              path: "bc/1rocnik/ZS/ZAP.md",
              category: "Algoritmizácia",
            },
            {
              name: "Repetitórium z matematiky",
              path: "bc/1rocnik/ZS/RzM.md",
              category: "Matematika",
            },
            {
              name: "Matematika 1",
              path: "bc/1rocnik/ZS/MAT1.md",
              category: "Matematika",
            },
            // ... more subjects for 1rocnik ZS
          ],
          LS: [
            {
              name: "Matematika 2",
              path: "bc/1rocnik/LS/MAT2.md",
              category: "Matematika",
            },
            {
              name: "Programovanie",
              path: "bc/1rocnik/LS/PROGR.md",
              category: "Algoritmizácia",
            },
            {
              name: "Základy softvérového inžinierstva",
              path: "bc/1rocnik/LS/ZSwI.md",
              category: "Vývoj softvéru",
            },
            {
              name: "Princípy počítačového inžinierstva",
              path: "bc/1rocnik/LS/PPI.md",
              category: "Hardvér, Počítačové siete",
            },
            {
              name: "Kyberbezpečnosť",
              path: "bc/1rocnik/LS/KB.md",
              category: "Kyberbezpečnosť",
            },
          ]
        },
        "2. ročník": {
          ZS: [
            {
              name: "Diskrétna matematika",
              path: "bc/2rocnik/ZS/DM.md",
              category: "Matematika",
            },
            {
              name: "Údajové štruktúry a algoritmy",
              path: "bc/2rocnik/ZS/USaA.md",
              category: "Algoritmizácia",
            },
            {
              name: "Objektové programovanie",
              path: "bc/2rocnik/ZS/OOP.md",
              category: "Vývoj softvéru",
            },
            {
              name: "Operačné systémy",
              path: "bc/2rocnik/ZS/OS.md",
              category: "Princípy",
            },
            {
              name: "Architektúry poč. systémov",
              path: "bc/2rocnik/ZS/APS.md",
              category: "Hardvér, Počítačové siete",
            },
            {
              name: "Bezpečnostný manažment",
              path: "bc/2rocnik/ZS/BM.md",
              category: "Kyberbezpečnosť",
            },

          ],
          LS: [
            {
              name: "Num. matematika a štatistika",
              path: "bc/2rocnik/LS/NMPaS.md",
              category: "Matematika",
            },
            {
              name: "Formálne jazyky",
              path: "bc/2rocnik/LS/FJ.md",
              category: "Algoritmizácia",
            },
            {
              name: "Komponentové programovanie",
              path: "bc/2rocnik/LS/KP.md",
              category: "Vývoj softvéru",
            },
            {
              name: "Databázové systémy",
              path: "bc/2rocnik/LS/DBS.md",
              category: "Princípy",
            },
            {
              name: "Počítačové siete",
              path: "bc/2rocnik/LS/PS.md",
              category: "Hardvér, Počítačové siete",
            },
            {
              name: "Základy kryptografie",
              path: "bc/2rocnik/LS/ZK.md",
              category: "Kyberbezpečnosť",
            },
          ],
        },
        "3. ročník": {
          ZS: [

            {
              name: "Bakalárska práca",
              path: "bc/3rocnik/ZS/BP.md",
              category: "Algoritmizácia",
            },
            {
              name: "Manažment projektov",
              path: "bc/3rocnik/ZS/MSP.md",
              category: "Vývoj softvéru",
            },
            {
              name: "Inteligentné systémy v informatike",
              path: "bc/3rocnik/ZS/ISI.md",
              category: "Princípy",
            },
            {
              name: "Používateľské rozhrania",
              path: "bc/3rocnik/ZS/UX.md",
              category: "Princípy",
            },
            {
              name: "Aplikácie poč. sietí",
              path: "bc/3rocnik/ZS/APS.md",
              category: "Hardvér, Počítačové siete",
            },
            {
              name: "SAP ABAP Programovanie",
              path: "bc/3rocnik/ZS/SAP.md",
              category: "Technológie",
            },
            {
              name: "IoT a chytré zariadenia",
              path: "bc/3rocnik/ZS/IOT1.md",
              category: "Technológie",
            },
            {
              name: "Priemyselná a systémová bezpečnosť",
              path: "bc/3rocnik/ZS/PSB.md",
              category: "Kyberbezpečnosť",
            },
            {
              name: "CCNA Security",
              path: "bc/3rocnik/ZS/CCNA-S.md",
              category: "Kyberbezpečnosť",
            },

          ],
          LS: [

            {
              name: "Bakalársky projekt",
              path: "bc/3rocnik/LS/BP.md",
              category: "Algoritmizácia",
            },

            {
              name: "Bezpečnosť v počítačových systémoch",
              path: "bc/3rocnik/LS/BvPS.md",
              category: "Princípy",
            },
            {
              name: "Asembler",
              path: "bc/3rocnik/LS/ASM.md",
              category: "Hardvér, Počítačové siete",
            },
            {
              name: "Počítačové hry",
              path: "bc/3rocnik/LS/GameDev.md",
              category: "Technológie",
            },
            {
              name: "Právne otázky kyber. bezpečnosti",
              path: "bc/3rocnik/LS/POKB.md",
              category: "Kyberbezpečnosť",
            },
            
          ],
        },
      },
      filteredSubjectsBC: {

      },
      subjectsING: {
        "Povinné": {
          "1. ročník": {
            ZS: [
              {
                name: "Aktuálne trendy v informatike a kyberbezpečnosti 1",
                path: "ing/povinne/1rocnik/ZS/ATIK1.md",
                category: "ing",
              },
              {
                name: "Tímový projekt",
                path: "ing/povinne/1rocnik/ZS/TP.md",
                category: "ing",
              },
              {
                name: "Sémantika programovacích jazykov",
                path: "ing/povinne/1rocnik/ZS/SPJ.md",
                category: "ing",
              }
            ],
            LS: [
              {
                name: "Diplomový projekt 1",
                path: "ing/povinne/1rocnik/LS/DP1.md",
                category: "ing",
              },
              {
                name: "Paralelné počítačové systémy",
                path: "ing/povinne/1rocnik/LS/PPS.md",
                category: "ing",
              },
              {
                name: "Aktuálne trendy v informatike a kyberbezpečnosti 2",
                path: "ing/povinne/1rocnik/LS/ATIK2.md",
                category: "ing",
              }
            ]

          },
          "2.ročník": {
            ZS: [
              {
                name: "Bezpečnosť informačných a komunikačných systémov",
                path: "ing/povinne/2rocnik/ZS/BiaKS.md",
                category: "ing",
              },
              {
                name: "Diplomový projekt 2",
                path: "ing/povinne/2rocnik/ZS/DP2.md",
                category: "ing",
              },
              {
                name: "Paralelné programovanie",
                path: "ing/povinne/2rocnik/ZS/PP.md",
                category: "ing",
              }
            ],
            LS: [
              {
                name: "Pracovné a obchodné právo",
                path: "ing/povinne/2rocnik/LS/POP.md",
                category: "ing",
              },
              {
                name: "Základy podnikateľských zručností pre neekonómov",
                path: "ing/povinne/2rocnik/LS/ZPZpNDL.md",
                category: "ing",
              }
            ]
          }

        },
        "Povinne voliteľné": {
          ZS: [
            {
              name: "Evolúcia softvérových systémov",
              path: "ing/povinne-volitelne/ZS/ESS.md",
              category: "ing",
            },
            {
              name: "Číslicové systémy a jazyk VHDL",
              path: "ing/povinne-volitelne/ZS/CaVHDL.md",
              category: "ing",
            },
            {
              name: "Smerovacie algoritmy v počítačových sieťach",
              path: "ing/povinne-volitelne/ZS/SAvPS.md",
              category: "ing",
            },
            {
              name: "Aplikácie počítačových sietí",
              path: "ing/povinne-volitelne/ZS/APs.md",
              category: "ing",
            },
            {
              name: "Aplikácie zabezpečenia počítačových sietí",
              path: "ing/povinne-volitelne/ZS/AZPS.md",
              category: "ing",
            },
            {
              name: "Vývoj doménovo-špecifických jazykov",
              path: "ing/povinne-volitelne/ZS/VD-SJ.md",
              category: "ing",
            },
            {
              name: "Funkcionálne programovanie",
              path: "ing/povinne-volitelne/ZS/FP.md",
              category: "ing",
            },
            {
              name: "Teória typov",
              path: "ing/povinne-volitelne/ZS/TT.md",
              category: "ing",
            },
            {
              name: "Technológie a systémy spracovania údajov",
              path: "ing/povinne-volitelne/ZS/TaSSÚ.md",
              category: "ing",
            },
            {
              name: "Modelovanie a simulácia",
              path: "ing/povinne-volitelne/ZS/MaS.md",
              category: "ing",
            },
            {
              name: "Distribuované systémy",
              path: "ing/povinne-volitelne/ZS/DS.md",
              category: "ing",
            },
            {
              name: "Výskumné metódy v informatike a kyberbezpečnosti",
              path: "ing/povinne-volitelne/ZS/VMIK.md",
              category: "ing",
            },
            {
              name: "Inžinierstvo požiadaviek",
              path: "ing/povinne-volitelne/ZS/IP.md",
              category: "ing",
            },
            {
              name: "Počítačová grafika",
              path: "ing/povinne-volitelne/ZS/PG.md",
              category: "ing",
            },
            {
              name: "Zručnosti pre úspech – z univerzity do praxe",
              path: "ing/povinne-volitelne/ZS/ZpÚ.md",
              category: "ing",
            }
          ],
          LS: [
            {
              name: "Evolúcia softvérových systémov",
              path: "ing/povinne-volitelne/LS/ESS.md",
              category: "ing",
            },
            {
              name: "Riešenie problémov rozsiahlych infraštruktúr",
              path: "ing/povinne-volitelne/LS/RPRRI.md",
              category: "ing",
            },
            {
              name: "Smerovacie algoritmy v počítačových sieťach",
              path: "ing/povinne-volitelne/LS/SAvPS.md",
              category: "ing",
            },
            {
              name: "Technológie na báze prepínaných sietí",
              path: "ing/povinne-volitelne/LS/TnBPS.md",
              category: "ing",
            },
            {
              name: "Číslicové systémy a jazyk VHDL",
              path: "ing/povinne-volitelne/LS/CaVHDL.md",
              category: "ing",
            },
            {
              name: "Forenzná analýza",
              path: "ing/povinne-volitelne/LS/FA.md",
              category: "ing",
            },
            {
              name: "Vývoj doménovo-špecifických jazykov",
              path: "ing/povinne-volitelne/LS/VD-SJ.md",
              category: "ing",
            },
            {
              name: "Funkcionálne programovanie",
              path: "ing/povinne-volitelne/LS/FP.md",
              category: "ing",
            },
            {
              name: "Teória typov",
              path: "ing/povinne-volitelne/LS/TT.md",
              category: "ing",
            },
            {
              name: "Technológie a systémy spracovania údajov",
              path: "ing/povinne-volitelne/LS/TaSSÚ.md",
              category: "ing",
            },
            {
              name: "Modelovanie a simulácia",
              path: "ing/povinne-volitelne/LS/MaS.md",
              category: "ing",
            },
            {
              name: "Distribuované systémy",
              path: "ing/povinne-volitelne/LS/DS.md",
              category: "ing",
            },
            {
              name: "Výskumné metódy v informatike a kyberbezpečnosti",
              path: "ing/povinne-volitelne/LS/VMIK.md",
              category: "ing",
            },
            {
              name: "Inžinierske požiadaviek",
              path: "ing/povinne-volitelne/LS/IP.md",
              category: "ing",
            },
            {
              name: "Počítačová grafika",
              path: "ing/povinne-volitelne/LS/PG.md",
              category: "ing",
            },
            {
              name: "Zručnosti pre úspech – z univerzity do praxe",
              path: "ing/povinne-volitelne/LS/ZpÚ.md",
              category: "ing",
            },
            {
              name: "Softvérová bezpečnosť",
              path: "ing/povinne-volitelne/LS/SB.md",
              category: "ing",
            }
          ]
        }

      },
      filteredSubjectsIng: {

      },
    };
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
    this.filteredSubjectsBC = this.subjectsBC;
    this.filteredSubjectsIng = this.subjectsING;
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add a class to #app when this component is mounted
    const app = document.getElementById('app');
    if (app) {
      app.classList.add('kpi-page-active');
    }
  },

  computed: {
    legendaCategoryColors() {
      const colors = {...this.categoryColors};
      delete colors['ing'];
      return colors;
    },

    selectedOptionsText() {
      if (this.selectAll) {
        return "Všetky";
      }

      const selectedOptions = this.options.filter((option) => option.selected);
      if (selectedOptions.length === 0) {
        return "Predmet nebol vybratý";
      }

      if (selectedOptions.length > 3) {
        return (
          selectedOptions
            .slice(0, 3)
            .map((option) => option.label)
            .join(", ") + ", ..."
        );
      }

      return selectedOptions.map((option) => option.label).join(", ");
    },

    options() {
      if (this.stupenButton === 'BCbutton') {
        return this.optionsBc;
      } else if (this.stupenButton === 'INGbutton') {
        return this.optionsIng;
      } else {
        return null;
      }
    }
  },

  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
    // Remove the class from #app when this component is destroyed
    const app = document.getElementById('app');
    if (app) {
      app.classList.remove('kpi-page-active');
    }

  },
  methods: {
    setStupenButton(button) {
      this.stupenButton = button;
      // reset select
      this.semesterButton = null;
      this.options.forEach(o => o.selected = true);
      this.onFilterChanged();
    },
    setSemesterButton(button) {
      if (button === this.semesterButton) {
        // unselected
        this.semesterButton = null;
      } else {
        // selected
        this.semesterButton = button;
      }
      this.onFilterChanged();
    },
    getSubjectsInCategory(category) {
      const subjectsInCategory = new Set();
      Object.keys(this.subjectsBC).forEach(year => {
        Object.keys(this.subjectsBC[year]).forEach(semester => {
          this.subjectsBC[year][semester].forEach(subject => {
            if (subject.category === category) {
              subjectsInCategory.add(subject.name);
            }
          })
        })
      });

      return subjectsInCategory;
    },

    isCategoryUnselected(category) {
      const subjectsInCategory = this.getSubjectsInCategory(category);

      return this.optionsBc
          .filter(option => subjectsInCategory.has(option.label))
          .every(option => !option.selected);
    },

    clickedLegendItem(category) {
      if (!category) {
        return;
      }

      const isUnselected = this.isCategoryUnselected(category);
      const subjectsInCategory = this.getSubjectsInCategory(category);

      this.optionsBc.forEach(subject => {
        if (subjectsInCategory.has(subject.label)) {
          subject.selected = isUnselected;
        }
      });

      this.onFilterChanged();
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      this.justOpenedDropDown = this.isDropdownVisible;

      this.$nextTick(() => {
        document.addEventListener("click", this.handleClickOutside);
      });
    },

    toggleAll() {
      if (this.selectAll) {
        this.options.forEach((option) => (option.selected = true));
      } else {
        this.options.forEach((option) => (option.selected = false));
      }
      this.onFilterChanged();
    },

    handleClickOutside(event) {
      if (
        this.isPopupOpen &&
        !this.justOpenedPopup &&
        this.$refs.popup &&
        !this.$refs.popup.contains(event.target)
      ) {
        this.closeSubjectPopup();
      }
      if (
        this.isDropdownVisible &&
        this.$refs.dropdown &&
        !this.$refs.dropdown.contains(event.target)
      ) {
        this.isDropdownVisible = false;
      }

      this.justOpenedPopup = false;
      this.justOpenedDropDown = false;
    },
    openSubjectPopup(subject) {
      // Set the current subject path
      this.currentSubject = subject.path;
      this.currentCategory = subject.category;
      this.isPopupOpen = true;
      this.justOpenedPopup = true;

      // Wait for the next tick and then listen for clicks
      this.$nextTick(() => {
        document.addEventListener("click", this.handleClickOutside);
      });
    },

    closeSubjectPopup() {
      this.isPopupOpen = false;
      this.justOpenedPopup = false; // Reset the flag
      document.removeEventListener("click", this.handleClickOutside);
    },

    setCategoryColor(category) {
      if (this.categoryColors[category]) {
        this.currentCategory = category;
      }
    },

    calculateTextColor(backgroundColor) {
      const rgb = parseInt(backgroundColor.slice(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;

      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 150 ? 'black' : 'white';
    },

    onFilterChanged() {
      if (this.stupenButton === 'BCbutton') {
        this.onFilterChangedBc();
      } else if (this.stupenButton === 'INGbutton') {
        this.onFilterChangedIng();
      }
    },

    onFilterChangedBc() {

      const selectedSubjects = this.optionsBc.filter(subject => subject.selected);
      const isSelectedAll = selectedSubjects.length === this.optionsBc.length;

      const onlyZS = this.semesterButton === 'ZSbutton';
      const onlyLS = this.semesterButton === 'LSbutton';

      const result = {};

      Object.keys(this.subjectsBC).forEach(year => {
        const yearObj = this.subjectsBC[year];
        result[year] = {};

        Object.keys(yearObj).forEach(semester => {
          if (semester === 'LS' && onlyZS) {
            // ignore LS
            return;
          }
          if (semester === 'ZS' && onlyLS) {
            // ignore ZS
            return;
          }

          const subjectsForSemester = yearObj[semester];
          if (isSelectedAll) {
            // all subjects can stay
            result[year][semester] = subjectsForSemester;
          } else {
            // filter only selected subjects
            result[year][semester] = subjectsForSemester.filter(s => selectedSubjects.some(activeS => activeS.label === s.name));
          }
        })
      })

      this.filteredSubjectsBC = result;
    },

    onFilterChangedIng() {
      const selectedSubjects = this.optionsIng.filter(subject => subject.selected);
      const isSelectedAll = selectedSubjects.length === this.optionsIng.length;

      const onlyZS = this.semesterButton === 'ZSbutton';
      const onlyLS = this.semesterButton === 'LSbutton';

      const result = {};

      Object.keys(this.subjectsING).forEach(optionalGroupName => {
        const optionalGroupObj = this.subjectsING[optionalGroupName];
        result[optionalGroupName] = {};

        if (optionalGroupName === 'Povinné') {
          Object.keys(optionalGroupObj).forEach(year => {
            const yearObj = optionalGroupObj[year];
            result[optionalGroupName][year] = {};

            Object.keys(yearObj).forEach(semester => {
              if (semester === 'LS' && onlyZS) {
                // ignore LS
                return;
              }
              if (semester === 'ZS' && onlyLS) {
                // ignore ZS
                return;
              }

              const subjectsForSemester = yearObj[semester];
              if (isSelectedAll) {
                result[optionalGroupName][year][semester] = subjectsForSemester;
              } else {
                result[optionalGroupName][year][semester] = subjectsForSemester.filter(s => selectedSubjects.some(activeS => activeS.label === s.name));
              }
            })
          });
        } else if (optionalGroupName === 'Povinne voliteľné') {
          Object.keys(optionalGroupObj).forEach(semester => {
            if (semester === 'LS' && onlyZS) {
              // ignore LS
              return;
            }
            if (semester === 'ZS' && onlyLS) {
              // ignore ZS
              return;
            }

            const subjectsForSemester = optionalGroupObj[semester];

            if (isSelectedAll) {
              result[optionalGroupName][semester] = subjectsForSemester;
            } else {
              result[optionalGroupName][semester] = subjectsForSemester.filter(s => selectedSubjects.some(activeS => activeS.label === s.name));
            }
          });
        }
      });

      this.filteredSubjectsIng = result;
    },
  },
  watch: {
    optionsBc: {
      handler(newOptions) {
        this.selectAll = newOptions.every((option) => option.selected);
      },
      deep: true,
    },
    optionsIng: {
      handler(newOptions) {
        this.selectAll = newOptions.every((option) => option.selected);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.switch-rozvrh-buttons {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif !important;
}

.switch-rozvrh-buttons button {
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 6px 8px 6px 8px;
  cursor: pointer;
  border-radius: 3px;
  margin-bottom: 3px;
  font-family: 'Inter', sans-serif !important;
}

.hlavna-cast {
  display: flex;
  /* padding: 30px 5vw 0 5vw; */
  padding: 30px 0 30px 0;
  align-items: flex-start;
  justify-content: center;
  gap: 2%;
  min-height: 100vh;
  background-color: #F5F6F7;
  font-family: 'Inter', sans-serif;
  color: black;
}
html, body {
  margin: 0 !important;
  padding: 0 !important;
  overflow-x: hidden !important;
}
a {
  text-decoration: none !important;
  color: #00B2FF !important;
}
@media (max-width: 900px){
  .hlavna-cast {
    flex-direction: column;
    align-items: center;
    /* width: 100%; */
  }
  .bc-rozvrh {
    flex-direction: column;
    align-items: center !important;
    width: 100%;
  }
  .ing-rozvrh {
    flex-direction: column;
    align-items: center !important;
    /* width: 100%; */
  }
  .ing-section {
    flex-direction: column;
    align-items: center !important;
    /* width: 100%; */
  }
  .ing-semester {
    flex-direction: column;
    align-items: center !important;
    column-count: 1 !important;
    /* width: 100%; */
  }
  .predmet{
    width: 80vw !important;
    max-width: 350px !important;
  }
  .popup-container{
    width: 100% !important;
    height: 100% !important;
  }
  .switch-rozvrh-buttons {
  display: flex;
  flex-direction: row;
  margin-right: 5px;
}
.switch-rozvrh-buttons button {

  margin-right: 5px;
}
}

.veci-nalavo {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 30px;
  font-family: 'Inter', sans-serif;
}

.legenda {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1px;
}

.prvok-v-legende {
  display: flex;
  align-items: center;
  gap: 10px;
}
.prvok-v-legende:hover {
  cursor: pointer;
}
.prvok-v-legende-unselected {
  text-decoration: line-through;
}

.rect {
  width: 20px;
  height: 13px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: #fff972;
}

.bc-rozvrh {
  display: flex;
  align-items: flex-start;
  gap: 2vw;
}

.ing-rozvrh {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2vw;
}

.ing-section {
  display: flex;
  align-items: flex-start;
  gap: 0.5vw;
}

.ing-semester {
  column-count: 2;
  column-gap: 0.5vw;
}

.rocnik {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.semester {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  text-align: center;
}

.predmet {
  display: flex;
  width: 20vw;
  max-width: 300px;
  padding: 8px 20px;
  align-items: flex-start;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.4);
  background: #fff972;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.predmet:hover {
  transform: scale(1.05);
}

.predmet-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;
  align-self: stretch;
  font-size: 1.1rem;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
}

.popup-container {
  position: fixed;
  top: 4.6em;
  right: 0;
  width: 300px;
  max-height: calc(91vh);
  overflow-y: auto;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
  z-index: 1000;
  padding: 20px;
  border-left: 5px solid;
  -ms-overflow-style: none;
  scrollbar-width: none;

  @media (max-width: 768px) {
    top: 4.1em;
  }
}

@keyframes slideInFromRight {
  from {
    opacity: 0;
    transform: translateX(100%);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideOutToLeft {
  from {
    opacity: 1;
    transform: translateX(0);
  }

  to {
    opacity: 0;
    transform: translateX(100%);
  }
}

.popup-enter-active {
  animation: slideInFromRight 0.5s ease-out;
}

.popup-leave-active {
  animation: slideOutToLeft 0.5s ease-out;
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
.fade-enter-active {
  animation: fadeIn 0.5s;
}
.fade-leave-active {
  animation: fadeOut 0.5s;
}

/* Hide scrollbar for Chrome, Safari, and Opera */
.popup-container::-webkit-scrollbar {
  display: none;
}

.close-popup {
  position: absolute;
  top: 4px;
  right: 1px;
  cursor: pointer;
  transform: scale(0.5);
}

.toggle-buttons {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.first-toggle-button {
  border: 1px solid rgba(0, 0, 0, 0.3);
  padding: 8px 0 8px 0;
  cursor: pointer;
  border-radius: 5px 5px 0px 0px;
  cursor: pointer;
  font-family: 'Inter', sans-serif !important;
  font-size: 1rem;
}
 
.second-toggle-button {
  border-left: 1px solid rgba(0, 0, 0, 0.3);
  border-right: 1px solid rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.3);
  border-top: none;
  padding: 8px 0 8px 0;
  cursor: pointer;
  border-radius: 0px 0px 5px 5px;
  font-family: 'Inter', sans-serif !important;
  font-size: 1rem;
}

.active-button {
  background-color: #e2dfdf;
  color: black;
}

.dropdown-label {
  margin-bottom: 8px;
  display: block;
}

.dropdown {
  border-radius: 5px;
  width: 275px;
  position: relative;
  text-align: left;
}

.select-box {
  border: 1px solid #ccc;
  padding: 10px;
  cursor: pointer;
  position: relative;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
}

.dropdown-content {
  position: absolute;
  background-color: #f9f9f9;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  padding: 10px;
  border: 1px solid #ccc;
}

.dropdown-content input[type="checkbox"] {
  margin-right: 10px;
}

.checkbox-container {
  height: 210px;
  overflow-y: auto;
}

.checkbox-items {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;

}
</style>
