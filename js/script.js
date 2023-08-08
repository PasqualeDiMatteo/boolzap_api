const url_api = "http://localhost/boolzap_api/api/index.php";

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
    };
  },
  created() {
    axios.get(url_api).then(function (res) {
      this.contacts = res.data;
    });
  },
});

// La monto nell'elemento HTML

app.mount("#root");
