<script lang="ts">
import { defineComponent } from "vue";
import HeroBanner from "@/components/resuble/HeroBanner.vue";
import herBg from "@/assets/WhatsApp-Image-1446-10-29-at-16-18-30.xlarge.jpg";

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
  },
  data() {
    return {
      selectedLetter: "A" as string,
      herBg: herBg as string,
      activeTab: "company" as string,
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
    <HeroBanner
      titleKey="glossary.hero.title"
      title="Glossary"
      subtitleKey="glossary.hero.subtitle"
      subtitle="Maritime shipping terms and definitions"
      height="50vh"
      :media-src="herBg"
      :withImg="true"
    />

    <!-- Glossary Content -->
    <div class="glossary-container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <a href="/" class="breadcrumb-link">Homepage</a>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">FAQ</span>
      </nav>

      <!-- FAQ Tabs -->
      <div class="faq-tabs">
        <button
          :class="['faq-tab', { active: activeTab === 'company' }]"
          @click="activeTab = 'company'"
        >
          <span class="tab-text-en">Company</span>
          <span class="tab-text-ar">الشركة</span>
        </button>
        <button
          :class="['faq-tab', { active: activeTab === 'booking' }]"
          @click="activeTab = 'booking'"
        >
          <span class="tab-text-en">Booking</span>
          <span class="tab-text-ar">الحجز</span>
        </button>
        <button
          :class="['faq-tab', { active: activeTab === 'prior' }]"
          @click="activeTab = 'prior'"
        >
          <span class="tab-text-en">Prior to Booking</span>
          <span class="tab-text-ar">قبل الحجز</span>
        </button>
        <button
          :class="['faq-tab', { active: activeTab === 'documentation' }]"
          @click="activeTab = 'documentation'"
        >
          <span class="tab-text-en">Documentation</span>
          <span class="tab-text-ar">التوثيق</span>
        </button>
      </div>

      <!-- FAQ Content -->
      <div class="faq-content">
        <!-- Company -->
        <div v-show="activeTab === 'company'" class="faq-items">
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">1. Is it possible to use personal containers for shipping?</span>
                <span class="question-text-ar">1. هل من الممكن استخدام حاويات شخصية للشحن؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Yes, you can use personal containers for shipping. Please ensure
                they meet the required standards and specifications.
              </p>
              <p class="answer-ar">
                نعم، يمكنك استخدام حاويات شخصية للشحن. يرجى التأكد من أنها تستوفي المعايير والمواصفات المطلوبة.
              </p>
            </div>
          </details>
        </div>

        <!-- Booking -->
        <div v-show="activeTab === 'booking'" class="faq-items">
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">1. What types of containers does Folk Maritime offer?</span>
                <span class="question-text-ar">1. ما أنواع الحاويات التي تقدمها فولك للملاحة البحرية؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Folk Maritime offers various container types including standard
                dry containers, refrigerated containers, and specialized
                containers for specific cargo needs.
              </p>
              <p class="answer-ar">
                تقدم فولك للملاحة البحرية أنواعًا مختلفة من الحاويات بما في ذلك الحاويات الجافة القياسية والحاويات المبردة والحاويات المتخصصة لاحتياجات الشحن المحددة.
              </p>
            </div>
          </details>
        </div>

        <!-- Prior to Booking -->
        <div v-show="activeTab === 'prior'" class="faq-items">
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">1. How do I register with Folk Maritime?</span>
                <span class="question-text-ar">1. كيف أقوم بالتسجيل مع فولك للملاحة البحرية؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                You can register through our website by filling out the
                registration form with your company details and required
                documentation.
              </p>
              <p class="answer-ar">
                يمكنك التسجيل من خلال موقعنا الإلكتروني عن طريق ملء نموذج التسجيل بتفاصيل شركتك والوثائق المطلوبة.
              </p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">2. How do I obtain a shipping quote for my goods?</span>
                <span class="question-text-ar">2. كيف أحصل على عرض أسعار شحن لبضائعي؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Contact our sales team with details about your cargo,
                destination, and shipping requirements to receive a customized
                quote.
              </p>
              <p class="answer-ar">
                اتصل بفريق المبيعات لدينا مع تفاصيل عن شحنتك والوجهة ومتطلبات الشحن للحصول على عرض أسعار مخصص.
              </p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">3. Who are the designated agents for the routes?</span>
                <span class="question-text-ar">3. من هم الوكلاء المعتمدون للطرق؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Our designated agents vary by route and location. Please contact
                us with your specific route details for agent information.
              </p>
              <p class="answer-ar">
                يختلف وكلاؤنا المعتمدون حسب الطريق والموقع. يرجى الاتصال بنا مع تفاصيل طريقك المحدد للحصول على معلومات الوكيل.
              </p>
            </div>
          </details>
        </div>

        <!-- Documentation -->
        <div v-show="activeTab === 'documentation'" class="faq-items">
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">1. How and where do I get a quote for shipping my goods?</span>
                <span class="question-text-ar">1. كيف وأين أحصل على عرض أسعار لشحن بضائعي؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Visit our website or contact our customer service team via email
                or phone to request a shipping quote.
              </p>
              <p class="answer-ar">
                قم بزيارة موقعنا الإلكتروني أو اتصل بفريق خدمة العملاء لدينا عبر البريد الإلكتروني أو الهاتف لطلب عرض أسعار الشحن.
              </p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">2. What items are prohibited from containerized shipping?</span>
                <span class="question-text-ar">2. ما هي العناصر المحظورة من الشحن بالحاويات؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Prohibited items include hazardous materials, illegal
                substances, perishable goods without proper refrigeration, and
                items that violate international shipping regulations.
              </p>
              <p class="answer-ar">
                تشمل العناصر المحظورة المواد الخطرة والمواد غير القانونية والسلع القابلة للتلف بدون تبريد مناسب والعناصر التي تنتهك لوائح الشحن الدولية.
              </p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">
              <div class="question-wrapper">
                <span class="question-text">3. Does Folk Maritime facilitate the transportation of hazardous materials or dangerous goods?</span>
                <span class="question-text-ar">3. هل تسهل فولك للملاحة البحرية نقل المواد الخطرة أو البضائع الخطرة؟</span>
              </div>
              <span class="toggle-icon">+</span>
            </summary>
            <div class="faq-answer">
              <p class="answer-en">
                Yes, we can transport certain types of hazardous materials with
                proper documentation, packaging, and compliance with
                international regulations. Please contact us for specific
                requirements.
              </p>
              <p class="answer-ar">
                نعم، يمكننا نقل أنواع معينة من المواد الخطرة مع الوثائق المناسبة والتعبئة والامتثال للوائح الدولية. يرجى الاتصال بنا للحصول على المتطلبات المحددة.
              </p>
            </div>
          </details>
        </div>
      </div>

      <!-- Alphabet Filter -->
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
}

.glossary-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 4rem 1.5rem;
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

.tab-text-en {
  font-size: 1.125rem;
  line-height: 1.3;
}

.tab-text-ar {
  font-size: 0.95rem;
  font-family: "Cairo", sans-serif;
  opacity: 0.8;
  line-height: 1.3;
}

.faq-tab:first-child {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.faq-tab:hover {
  background: rgba(0, 95, 85, 0.05);
}

.faq-tab.active {
  background: #005f55;
  color: #80fd66;
  border-color: #005f55;
}

.faq-content {
  margin-bottom: 6rem;
  min-height: 300px;
}

.faq-items {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.faq-item {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.faq-item:hover {
  border-color: #005f55;
  box-shadow: 0 4px 12px rgba(0, 95, 85, 0.1);
}

.faq-item[open] {
  border-color: #005f55;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  cursor: pointer;
  list-style: none;
  transition: all 0.3s ease;
  background: transparent;
}

.faq-question::-webkit-details-marker {
  display: none;
}

.faq-question:hover {
  background: rgba(0, 95, 85, 0.05);
}

.question-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.question-text {
  font-size: 1.125rem;
  font-weight: 600;
  color: #000;
  line-height: 1.5;
}

.question-text-ar {
  font-size: 1rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.7);
  font-family: "Cairo", sans-serif;
  line-height: 1.5;
  direction: rtl;
  text-align: right;
}

.toggle-icon {
  font-size: 1.5rem;
  color: #000;
  transition: transform 0.3s ease;
  font-weight: 300;
  flex-shrink: 0;
  margin-left: 1rem;
}

.faq-item[open] .toggle-icon {
  transform: rotate(45deg);
}

.faq-answer {
  padding: 0 2rem 2rem 2rem;
  animation: fadeIn 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.answer-en {
  font-size: 1rem;
  color: #333;
  line-height: 1.7;
  margin: 0;
}

.answer-ar {
  font-size: 1rem;
  color: rgba(51, 51, 51, 0.85);
  font-family: "Cairo", sans-serif;
  line-height: 1.8;
  direction: rtl;
  text-align: right;
  margin: 0;
}

/* Alphabet Filter */
.alphabet-filter {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  justify-content: center;
  margin-bottom: 4rem;
  padding: 2rem 1rem;
  /* background: rgba(43, 57, 144, 0.3); */
  border-radius: 12px;
  backdrop-filter: blur(10px);
}

.letter-btn {
  min-width: 48px;
  height: 48px;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: #fff;
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
}

.letter-btn:hover {
  background: var(--color-secondary);
  border-color: var(--color-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(39, 170, 225, 0.3);
}

.letter-btn.active {
  background: var(--color-primary);
  color: #fff;
  border-color: var(--color-primary);
  box-shadow: 0 4px 6px #2b39902f;
}

/* Terms Section */
.terms-section {
  min-height: 400px;
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
  align-items: center;
  gap: 2rem;
}

.term-title {
  color: #f00;
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.3;
}

.term-definition {
  color: #333;
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
    padding: 1.5rem 1rem;
    margin-bottom: 2rem;
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
    padding: 1rem 0.5rem;
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
    padding: 2.5rem 2rem;
  }

  .letter-btn {
    min-width: 52px;
    height: 52px;
  }
}
</style>
