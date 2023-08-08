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
      isDark: false,
      contacts: [],
      currentContactId: 1,
      newMessage: "",
      searchedContact: "",
      isEmojiMenu: false,
      emotes: [
        "✌",
        "😂",
        "😝",
        "😁",
        "😱",
        "👉",
        "🙌",
        "🍻",
        "🔥",
        "🌈",
        "☀",
        "🎈",
        "🌹",
        "💄",
        "🎀",
        "⚽",
        "🎾",
        "🏁",
        "😡",
        "👿",
        "🐻",
        "🐶",
        "🐬",
        "🐟",
        "🍀",
        "👀",
        "🚗",
        "🍎",
        "💝",
        "💙",
        "👌",
        "❤",
        "😍",
        "😉",
        "😓",
        "😳",
        "💪",
        "💩",
        "🍸",
        "🔑",
        "💖",
        "🌟",
        "🎉",
        "🌺",
        "🎶",
        "👠",
        "🏈",
        "⚾",
        "🏆",
        "👽",
        "💀",
        "🐵",
        "🐮",
        "🐩",
        "🐎",
        "💣",
        "👃",
        "👂",
        "🍓",
        "💘",
        "💜",
        "👊",
        "💋",
        "😘",
        "😜",
        "😵",
        "🙏",
        "👋",
        "🚽",
        "💃",
        "💎",
        "🚀",
        "🌙",
        "🎁",
        "⛄",
        "🌊",
        "⛵",
        "🏀",
        "🎱",
        "💰",
        "👶",
        "👸",
        "🐰",
        "🐷",
        "🐍",
        "🐫",
        "🔫",
        "👄",
        "🚲",
        "🍉",
        "💛",
        "💚",
      ],
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
    startListening() {
      if ("webkitSpeechRecognition" in window) {
        this.listening = true;
        const recognition = new webkitSpeechRecognition();
        // lingua di registrazione
        recognition.lang = "it-IT";
        recognition.continuous = false;
        recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.newMessage += transcript;
        };
        recognition.start();
        setTimeout(() => {
          this.listening = false;
        }, 5000);
      } else {
        // se non disponibile
        alert("Errore: riconoscimento vocale non disponibile");
      }
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
