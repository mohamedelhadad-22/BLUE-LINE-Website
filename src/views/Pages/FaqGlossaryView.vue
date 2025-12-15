<script lang="ts">
import { defineComponent } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import herBg from "@/assets/WhatsApp-Image-1446-10-29-at-16-18-30.xlarge.jpg";
import AccordionComponent from "@/components/resuble/accordionComponent.vue";

interface GlossaryTerm {
  term: string;
  termKey?: string;
  definition: string;
  definitionKey?: string;
}

export default defineComponent({
  name: "FaqGlossaryView",
  components: {
    HeroBanner,
    AccordionComponent,
  },
  data() {
    return {
      selectedLetter: "A" as string,
      herBg: herBg as string,
      activeTab: "company" as string,
      companySteps: [
        {
          title: "Interview with a recruiter",
          description:
            "Discuss your work experience and aspirations with our expert recruiter.",
        },
      ],
    };
  },
  computed: {
    glossaryData(): Record<string, GlossaryTerm[]> {
      // @ts-ignore
      const $t = this.$t || ((key: string) => key);
      return {
        A: [
          {
            term: "Affiliate",
            definition:
              "A company or entity that is associated with another through ownership, control, or a business relationship.",
          },
          {
            term: "Automatic Identification System - AIS",
            definition:
              "A tracking system used by ships and vessel traffic services to identify and locate vessels by electronically exchanging data.",
          },
          {
            term: "Agent",
            definition:
              "A representative who acts on behalf of a shipowner, charterer, or operator in a specific port or region.",
          },
          {
            term: "All Risks Coverage",
            definition:
              "An insurance policy that provides the broadest form of protection for cargo during transit.",
          },
          {
            term: "Ad Valorem",
            definition:
              "A tariff or duty based on the value of the goods being shipped, expressed as a percentage of the total value.",
          },
        ] as GlossaryTerm[],
        B: [
          {
            term: "Ballast",
            definition:
              "Heavy material, such as water, used to provide stability to a vessel.",
          },
          {
            term: "Backhaul",
            definition:
              "The return leg of a liner service voyage, typically from the destination port back to the origin.",
          },
          {
            term: "Base Cargo",
            definition:
              "The minimum amount of cargo a ship should carry to ensure it operates efficiently and economically.",
          },
          {
            term: "Bill of Lading - B/L",
            definition:
              "A legal document issued by a carrier to a shipper, detailing the type, quantity, and destination of the goods being shipped.",
          },
          {
            term: "Bill of Exchange - B/E",
            definition:
              "A written financial document used in international trade where one party orders another party to pay a specified amount.",
          },
        ] as GlossaryTerm[],
        C: [
          {
            term: "Cabotage",
            definition:
              "Transport of goods between two places in the same country by a vessel from another country.",
          },
          {
            term: "Cargo",
            definition:
              "Goods or merchandise carried by a ship, airplane, truck, or other transportation means.",
          },
          {
            term: "Cargo Manifest",
            definition:
              "A detailed list of all cargo on board a liner vessel for customs clearance and tracking.",
          },
          {
            term: "Certificate of Origin",
            definition:
              "A document certifying goods are produced or manufactured in a particular country.",
          },
          {
            term: "Charter Party",
            definition:
              "A contract between a vessel owner and a charterer who rents the vessel or cargo space.",
          },
          {
            term: "Coastal Shipping",
            definition:
              "Transportation of goods along the coast within a specific regional area.",
          },
          {
            term: "Common Carrier",
            definition:
              "A shipping line offering services to the public, transporting goods on a non-discriminatory basis.",
          },
          {
            term: "Containerization",
            definition:
              "Using standardized containers to transport goods efficiently across transportation modes.",
          },
        ] as GlossaryTerm[],
        D: [
          {
            term: "Deadweight Tonnage - DWT",
            definition:
              "The total weight a ship can safely carry, including cargo, fuel, crew, and provisions.",
          },
          {
            term: "Demurrage",
            definition:
              "A penalty fee charged for delaying a ship's departure beyond the agreed-upon laytime.",
          },
          {
            term: "Dry Dock",
            definition:
              "A specialized facility for vessel maintenance, repairs, or inspection out of water.",
          },
        ] as GlossaryTerm[],
        E: [
          {
            term: "E-Navigation",
            definition:
              "Using electronic systems to enhance navigational safety and efficiency.",
          },
        ] as GlossaryTerm[],
        F: [
          {
            term: "Feeder Service",
            definition:
              "A shipping service transporting containers from smaller ports to larger ports.",
          },
          {
            term: "Freight",
            definition:
              "Goods transported from one place to another, or the cost of transportation.",
          },
          {
            term: "Freight Forwarder",
            definition:
              "A company arranging shipping and handling of goods on behalf of shippers.",
          },
        ] as GlossaryTerm[],
        G: [
          {
            term: "Gateway Port",
            definition:
              "A port that acts as an entry or exit point for regional maritime trade, often linked to major international shipping routes.",
          },
          {
            term: "Gross Tonnage - GT",
            definition:
              "The total internal volume of a ship, including all enclosed spaces, used to determine its size and capacity.",
          },
          {
            term: "Gross Weight",
            definition:
              "The total weight of a shipment, including the cargo and its packaging or container. It represents the complete weight of the goods as they are shipped.",
          },
        ] as GlossaryTerm[],
        H: [
          {
            term: "Harbor",
            definition:
              "A sheltered coastal area where ships can dock, anchor, and seek protection.",
          },
        ] as GlossaryTerm[],
        I: [
          {
            term: "Incoterms",
            definition:
              "International Commercial Terms defining buyer and seller responsibilities in goods transportation.",
          },
        ] as GlossaryTerm[],
        L: [
          {
            term: "Laytime",
            definition: "The agreed time for loading and unloading a vessel.",
          },
          {
            term: "Liner Service",
            definition:
              "A regular, scheduled service by shipping companies between specified ports.",
          },
        ] as GlossaryTerm[],
        M: [
          {
            term: "Manifest",
            definition:
              "A detailed list of a ship's cargo, passengers, and crew.",
          },
        ] as GlossaryTerm[],
        N: [
          {
            term: "Non-Vessel Operating Common Carrier - NVOCC",
            definition:
              "A company offering shipping services without operating ships.",
          },
        ] as GlossaryTerm[],
        O: [] as GlossaryTerm[],
        P: [
          {
            term: "Port Authority",
            definition:
              "The organization responsible for managing and regulating activities within a port, including cargo handling and vessel operations.",
          },
          {
            term: "Port Connectivity",
            definition:
              "The ability of ports within a region to effectively link with each other and with global shipping routes, supported by infrastructure and logistics systems.",
          },
          {
            term: "Port of Call",
            definition:
              "A scheduled stop at a port during a ship's voyage for cargo loading or unloading.",
          },
          {
            term: "Port of Loading",
            definition: "The port where cargo is loaded onto a vessel.",
          },
          {
            term: "Port of Discharge",
            definition: "The port where cargo is unloaded from a vessel.",
          },
          {
            term: "Port Rotation",
            definition:
              "The sequence of ports that a feeder vessel visits during its scheduled voyage, often linking smaller ports to a central hub.",
          },
          {
            term: "Port Tariff",
            definition:
              "A published schedule of fees and charges for services provided at a port, such as docking, loading, and unloading.",
          },
          {
            term: "Port Community System - PCS",
            definition:
              "An electronic platform that facilitates information exchange and coordination among port stakeholders.",
          },
          {
            term: "Protection and Indemnity - P&I Insurance",
            definition:
              "A type of marine insurance covering third-party liabilities, including injury, loss of life, or damage to cargo.",
          },
        ] as GlossaryTerm[],
        R: [
          {
            term: "Roll-on/Roll-off - Ro-Ro Ship",
            definition:
              "A type of vessel designed to carry wheeled cargo, such as cars and trucks, that are driven on and off the ship.",
          },
          {
            term: "Reefer",
            definition:
              "A refrigerated container or ship designed to transport perishable goods that require temperature control.",
          },
          {
            term: "Relay Service",
            definition:
              "A service that involves the transfer of cargo between vessels at an intermediate port.",
          },
          {
            term: "Regional Connectivity Index",
            definition:
              "A measure of how well regional ports and shipping routes are integrated and connected.",
          },
          {
            term: "Regional Shipping",
            definition:
              "Shipping services that operate within a specific region or set of ports.",
          },
          {
            term: "Regional Trade Agreement",
            definition:
              "An agreement between countries within a region to facilitate trade and improve maritime connectivity.",
          },
        ] as GlossaryTerm[],
        S: [
          {
            term: "Safety of Life at Sea - SOLAS",
            definition:
              "An international maritime treaty ensuring that ships comply with minimum safety standards in construction, equipment, and operation.",
          },
          {
            term: "Sailing Schedule",
            definition:
              "The published itinerary of a liner service, detailing the departure and arrival dates and times for each port of call.",
          },
          {
            term: "Sea Freight",
            definition:
              "The movement of goods by sea, often in containers, bulk carriers, or tankers, typically used for international shipments.",
          },
          {
            term: "Shipping",
            definition:
              "The process of transporting goods or cargo from one location to another by sea, air, rail, or road.",
          },
          {
            term: "Shipping line",
            definition:
              "A company that operates ships and provides maritime transportation services.",
          },
          {
            term: "Shipbroker",
            definition:
              "A person or firm that arranges the hiring or sale of ships on behalf of shipowners or charterers.",
          },
          {
            term: "Ship-to-Shore Communication",
            definition:
              "The exchange of information between ships and port facilities or other shore-based entities, including data on cargo, navigation, and safety.",
          },
          {
            term: "Ship's Agent",
            definition:
              "A representative in a port who handles a ship's business and administrative tasks on behalf of the shipowner or charterer.",
          },
          {
            term: "Ship Management System",
            definition:
              "Software used to manage the operational aspects of a vessel, including maintenance, crew management, and compliance.",
          },
          {
            term: "Short Sea Shipping",
            definition:
              "The transportation of goods by sea over relatively short distances, typically within the same continent or region.",
          },
          {
            term: "Slot Charter",
            definition:
              "An agreement where a shipping line leases space (slots) on a feeder vessel operated by another company.",
          },
          {
            term: "Slot Sharing",
            definition:
              "An arrangement where different shipping lines share space on each other's vessels.",
          },
          {
            term: "Spot Market",
            definition:
              "The market for immediate, one-time cargo shipping contracts.",
          },
        ] as GlossaryTerm[],
        T: [
          {
            term: "Transshipment",
            definition:
              "The transfer of goods from one vessel to another during their journey to the final destination.",
          },
          {
            term: "TEU - Twenty-foot Equivalent Unit",
            definition:
              "A standard unit of measurement for container capacity, based on a 20-foot container.",
          },
        ] as GlossaryTerm[],
        V: [
          {
            term: "Vessel Traffic Service - VTS",
            definition:
              "A shore-based system that monitors and manages vessel traffic within a designated area to ensure safety and efficiency.",
          },
          {
            term: "Vessel Sharing Agreement - VSA",
            definition:
              "An agreement between shipping lines to share space on each other's vessels to optimize capacity and efficiency.",
          },
          {
            term: "Vessel Rotation",
            definition:
              "The sequence of ports that a liner vessel visits on its scheduled route, crucial for maintaining the fixed schedule of liner services.",
          },
          {
            term: "Vessel Tracking",
            definition:
              "The process of monitoring the location and movement of vessels using GPS and other tracking technologies.",
          },
        ] as GlossaryTerm[],
        W: [
          {
            term: "Warehousing",
            definition:
              "The storage of goods in a facility before they are transported to their final destination.",
          },
        ] as GlossaryTerm[],
      };
    },
    availableLetters(): string[] {
      return Object.keys(this.glossaryData).sort();
    },
    currentTerms(): GlossaryTerm[] {
      return this.glossaryData[this.selectedLetter] || [];
    },
  },
  methods: {
    selectLetter(letter: string) {
      this.selectedLetter = letter;
    },
    getTermText(term: GlossaryTerm): string {
      // @ts-ignore
      return term.termKey && this.$t
        ? // @ts-ignore
          String(this.$t(term.termKey))
        : term.term;
    },
    getDefinitionText(term: GlossaryTerm): string {
      // @ts-ignore
      return term.definitionKey && this.$t
        ? // @ts-ignore
          String(this.$t(term.definitionKey))
        : term.definition;
    },
  },
});
</script>

<template>
  <div class="glossary-page">
    <!-- Hero Section -->
    <div class="container">
      <HeroBanner
        titleKey="glossary.hero.title"
        title="Glossary"
        subtitleKey="glossary.hero.subtitle"
        subtitle="Maritime shipping terms and definitions"
        height="50vh"
        :media-src="herBg"
        :withImg="true"
      />
      <nav class="breadcrumbs" aria-label="breadcrumb">
        <a href="/">{{ $t("Home") }}</a>
        <span class="sep" aria-hidden="true">/</span>
        <span class="current">{{ $t("FeedersServices.FeedersServices") }}</span>
      </nav>
    </div>

    <div class="container">
      <!-- Glossary Content -->
      <div class="glossary-container">
        <div class="faq-tabs">
          <button
            :class="['faq-tab', { active: activeTab === 'company' }]"
            @click="activeTab = 'company'"
          >
            <span class="tab-text-en">{{ $t("glossary.Company") }}</span>
          </button>
          <button
            :class="['faq-tab', { active: activeTab === 'booking' }]"
            @click="activeTab = 'booking'"
          >
            <span class="tab-text-en">{{ $t("glossary.Booking") }}</span>
          </button>
          <button
            :class="['faq-tab', { active: activeTab === 'prior' }]"
            @click="activeTab = 'prior'"
          >
            <span class="tab-text-en">{{ $t("glossary.PriorBooking") }}</span>
          </button>
          <button
            :class="['faq-tab', { active: activeTab === 'documentation' }]"
            @click="activeTab = 'documentation'"
          >
            <span class="tab-text-en">{{ $t("glossary.Documentation") }}</span>
          </button>
        </div>

        <!-- FAQ Content -->
        <div class="faq-content">
          <!-- Company -->
          <div v-show="activeTab === 'company'" class="faq-items">
            <AccordionComponent :steps="companySteps" />
          </div>

          <!-- Booking -->
          <div v-show="activeTab === 'booking'" class="faq-items">
            <AccordionComponent :steps="companySteps" />
          </div>

          <!-- Prior to Booking -->
          <div v-show="activeTab === 'prior'" class="faq-items">
            <AccordionComponent :steps="companySteps" />
          </div>

          <!-- Documentation -->
          <div v-show="activeTab === 'documentation'" class="faq-items">
            <AccordionComponent :steps="companySteps" />
          </div>
        </div>
      </div>
    </div>

    <div class="terms_container">
      <!-- Alphabet Filter -->
      <div class="section">
        <div class="alphabet-filter">
          <button
            v-for="letter in availableLetters"
            :key="letter"
            :class="['letter-btn', { active: selectedLetter === letter }]"
            @click="selectLetter(letter)"
          >
            {{ letter }}
          </button>
        </div>
        <!-- Terms List -->
        <div class="terms-section">
          <div v-if="currentTerms.length > 0" class="terms-list">
            <div
              v-for="(term, index) in currentTerms"
              :key="index"
              class="term-item"
            >
              <h3 class="term-title">{{ getTermText(term) }}</h3>
              <p class="term-definition">{{ getDefinitionText(term) }}</p>
            </div>
          </div>
          <div v-else class="no-terms">
            <p>No terms available for letter {{ selectedLetter }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="container"></div>
  </div>
</template>

<style scoped>
.glossary-page {
  min-height: 100vh;
  /* background: linear-gradient(
    180deg,
    var(--color-primary) 0%,
    var(--surface) 50%,
    var(--surface-2) 100%
  ); */
  padding: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.glossary-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
  margin: 6rem 0;
}

/* Breadcrumb */
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  font-size: 0.95rem;
  color: #666;
}

.breadcrumb-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.breadcrumb-link:hover {
  color: var(--color-primary);
}

.breadcrumb-separator {
  color: #999;
}

.breadcrumb-current {
  color: #000;
  font-weight: 600;
}

/* FAQ Tabs */
.faq-tabs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  margin-bottom: 3rem;
  background: #fff;
  border-radius: 0;
  overflow: hidden;
}

.faq-tab {
  padding: 1.5rem 2rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #000;
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-left: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-items: center;
}

.faq-tab.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 4px 6px #2b39902f;
}

/* Alphabet Filter */
.alphabet-filter {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  border-bottom: 1px solid#FFF;
}

.letter-btn {
  min-height: clamp(46px, 3.7419354839vw, 58px);
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    color 0.3s,
    background-color 0.3s,
    font-weight 0.3s;
  background-color: transparent;
  cursor: pointer;
  padding: 1.2rem;
  line-height: 1.8;
  color: inherit;
  font-size: 2rem;
  font-weight: 300;
  border: none;
  outline: none;
  text-transform: uppercase;
  border-right: 1px solid#FFF;
}
.letter-btn:last-child {
  border-right: 0;
}
.letter-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 4px 6px #2b39902f;
  border-bottom: 1px solid var(--color-primary);
}

/* Terms Section */
.terms-section {
  /* min-height: 400px; */
  position: relative;
  opacity: 1;
  z-index: 1;
  padding-block: clamp(32px, 3.0967741935vw, 48px);
  padding-inline: 6.078%;
  width: 100%;
}

.terms-list {
  display: grid;
  gap: 2rem;
}

.term-item {
  /* background: linear-gradient(
    135deg,
    rgba(19, 26, 58, 0.9) 0%,
    rgba(14, 20, 51, 0.95) 100%
  ); */
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.term-title {
  color: #fff;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
  max-width: 40%;
  width: 100%;
}

.term-definition {
  color: #fff;
  font-size: 1.125rem;
  line-height: 1.8;
  margin: 0;
}

.no-terms {
  text-align: center;
  padding: 4rem 2rem;
  color: var(--muted-ink);
  font-size: 1.25rem;
}

.no-terms p {
  margin: 0;
  opacity: 0.7;
}

.terms_container {
  display: flex;
  flex-direction: column;
  padding-block: clamp(64px, 9.2903225806vw, 144px);
  position: relative;
  margin-bottom: 2rem;
  background-color: #262262;
  overflow: hidden;
  color: #fff;
  padding-inline: 8.42%;
}

.terms_container .section {
  background-color: #2b3990;
}

/* Responsive Design */
@media (max-width: 768px) {
  .glossary-container {
    padding: 2rem 1rem;
  }

  .faq-tabs {
    grid-template-columns: repeat(2, 1fr);
    margin-bottom: 2rem;
  }

  .faq-tab {
    padding: 1rem 1.5rem;
    font-size: 1rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  .faq-tab:nth-child(2n) {
    border-left: 1px solid rgba(0, 0, 0, 0.1);
  }

  .faq-content {
    margin-bottom: 4rem;
  }

  .faq-question {
    padding: 1.25rem;
    font-size: 1rem;
  }

  .faq-answer {
    padding: 0 1.25rem 1.5rem 1.25rem;
  }

  .answer-en,
  .answer-ar {
    font-size: 0.95rem;
  }

  .alphabet-filter {
    gap: 0.5rem;
  }

  .letter-btn {
    min-width: 40px;
    height: 40px;
    padding: 0.5rem 0.75rem;
    font-size: 0.9rem;
  }

  .term-item {
    padding: 1.5rem;
  }

  .term-title {
    font-size: 1.25rem;
  }

  .term-definition {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .faq-tab {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }

  .faq-question {
    padding: 1rem;
    font-size: 0.9rem;
  }

  .toggle-icon {
    font-size: 1.25rem;
  }

  .faq-answer {
    padding: 0 1rem 1.25rem 1rem;
  }

  .answer-en,
  .answer-ar {
    font-size: 0.875rem;
  }

  .alphabet-filter {
    gap: 0.4rem;
  }

  .letter-btn {
    min-width: 36px;
    height: 36px;
    padding: 0.4rem 0.6rem;
    font-size: 0.85rem;
  }

  .term-item {
    padding: 1.25rem;
  }

  .term-title {
    font-size: 1.1rem;
  }

  .term-definition {
    font-size: 0.95rem;
    line-height: 1.6;
  }
}

/* Large Screens */
@media (min-width: 1024px) {
  .glossary-container {
    padding: 5rem 2rem;
  }

  .faq-tab {
    padding: 2rem 2.5rem;
    font-size: 1.25rem;
  }

  .faq-question {
    padding: 2rem 2.5rem;
    font-size: 1.25rem;
  }

  .faq-answer {
    padding: 0 2.5rem 2.5rem 2.5rem;
  }

  .answer-en,
  .answer-ar {
    font-size: 1.125rem;
  }

  .alphabet-filter {
  }

  .letter-btn {
    min-width: 52px;
    height: 52px;
  }
}
</style>
