const url_api = "http://localhost/boolzap_api_db/api/index.php";

// Controllo JS
console.log("JSOK");

// Controllo Vue

console.log("Vue OK", Vue);

// Estarpolo il metodo createApp

const { createApp } = Vue;

// Inizializzo l'app Vue

const app = createApp({
  data() {
    return {
      contacts: [],
      currentContactId: 1,
    };
  },
  computed: {
    activeContact() {
      return this.contacts.find(
        (contact) => contact.id == this.currentContactId
      );
    },
  },
  methods: {
    setCurrentContactId(id) {
      this.currentContactId = id;
    },
  },
  mounted() {
    axios.get(url_api).then((res) => {
      this.contacts = res.data;
    });
  },
});

// La monto nell'elemento HTML

app.mount("#root");
