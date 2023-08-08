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
      newMessage: "",
      searchedContact: "",
    };
  },
  computed: {
    activeContact() {
      return this.contacts.find(
        (contact) => this.currentContactId === contact.id
      );
    },
    filteredContacts() {
      const term = this.searchedContact.toLowerCase();
      return this.contacts.filter(({ name }) =>
        name.toLowerCase().includes(term)
      );
    },
  },
  methods: {
    setCurrentContactId(id) {
      this.currentContactId = id;
    },
    addNewMessage() {
      const data = { message: this.newMessage, id: this.currentContactId };
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      axios.post(url_api, data, config).then((res) => {
        this.activeContact.messages.push(res.data);
        this.newMessage = "";
      });
      setTimeout(() => {
        this.activeContact.messages.push({
          id: new Date().getTime(),
          date: new Date().toLocaleString(),
          message: "Ok",
          status: "received",
        });
      }, 2000);
    },
  },
  created() {
    axios.get(url_api).then((res) => {
      this.contacts = res.data;
    });
  },
});

// La monto nell'elemento HTML

app.mount("#root");
