// Mock conversations data for chat functionality
// Each conversation contains messages related to charity/volunteering

export default {
  1: {
    // Jan Kowalski - Koordynator
    messages: [
      {
        id: 1,
        content: "Cześć! Czy możesz przyjść jutro na 18:00 na spotkanie organizacyjne?",
        sender: "Jan Kowalski",
        direction: "incoming",
        timestamp: "10:30"
      },
      {
        id: 2,
        content: "Tak, oczywiście! O czym będziemy rozmawiać?",
        sender: "me",
        direction: "outgoing",
        timestamp: "10:35"
      },
      {
        id: 3,
        content: "Będziemy planować akcję charytatywną na przyszły miesiąc. Potrzebujemy 15 wolontariuszy.",
        sender: "Jan Kowalski",
        direction: "incoming",
        timestamp: "10:37"
      }
    ]
  },
  2: {
    // Anna Nowak - Koordynator
    messages: [
      {
        id: 1,
        content: "Dziękuję za udział w ostatnim wydarzeniu! Jak się czułeś podczas pracy z dziećmi?",
        sender: "Anna Nowak",
        direction: "incoming",
        timestamp: "14:20"
      },
      {
        id: 2,
        content: "Było fantastycznie! Dzieci były bardzo zaangażowane w warsztaty.",
        sender: "me",
        direction: "outgoing",
        timestamp: "14:25"
      },
      {
        id: 3,
        content: "Świetnie! Mamy kolejne wydarzenie za 2 tygodnie. Czy byłbyś zainteresowany?",
        sender: "Anna Nowak",
        direction: "incoming",
        timestamp: "14:30"
      }
    ]
  },
  3: {
    // Piotr Wiśniewski - Koordynator
    messages: [
      {
        id: 1,
        content: "Potrzebujemy pomocy przy organizacji festiwalu równości. Czy masz doświadczenie z logistyką?",
        sender: "Piotr Wiśniewski",
        direction: "incoming",
        timestamp: "09:15"
      },
      {
        id: 2,
        content: "Tak, pomagałem już przy kilku wydarzeniach. Chętnie się zaangażuję!",
        sender: "me",
        direction: "outgoing",
        timestamp: "09:45"
      }
    ]
  },
  4: {
    // Katarzyna Wójcik - Koordynator
    messages: [
      {
        id: 1,
        content: "Cześć! Widziałam Twoją aplikację na wolontariat. Masz pytania dotyczące projektu?",
        sender: "Katarzyna Wójcik",
        direction: "incoming",
        timestamp: "16:10"
      },
      {
        id: 2,
        content: "Tak, chciałbym wiedzieć więcej o harmonogramie i wymaganiach.",
        sender: "me",
        direction: "outgoing",
        timestamp: "16:15"
      },
      {
        id: 3,
        content: "Spotkajmy się w środę o 15:00, wszystko omówimy. Lokalizacja: ul. Floriańska 12.",
        sender: "Katarzyna Wójcik",
        direction: "incoming",
        timestamp: "16:18"
      }
    ]
  },
  5: {
    // Marek Kamiński - Koordynator
    messages: [
      {
        id: 1,
        content: "Dziękuję za pomoc przy sprzątaniu parku! Efekt był świetny 🌳",
        sender: "Marek Kamiński",
        direction: "incoming",
        timestamp: "12:45"
      },
      {
        id: 2,
        content: "Cieszę się, że mogłem pomóc! Kiedy następna akcja ekologiczna?",
        sender: "me",
        direction: "outgoing",
        timestamp: "13:00"
      },
      {
        id: 3,
        content: "Planujemy sadzenie drzew w październiku. Będę w kontakcie!",
        sender: "Marek Kamiński",
        direction: "incoming",
        timestamp: "13:05"
      }
    ]
  },
  6: {
    // Magdalena Lewandowska
    messages: [
      {
        id: 1,
        content: "Hej! Słyszałam o Twoim zaangażowaniu w wolontariat. Szukamy kogoś do pomocy z seniorami.",
        sender: "Magdalena Lewandowska",
        direction: "incoming",
        timestamp: "11:20"
      },
      {
        id: 2,
        content: "To brzmi interesująco! Jakie zadania by to obejmowało?",
        sender: "me",
        direction: "outgoing",
        timestamp: "11:30"
      }
    ]
  },
  7: {
    // Tomasz Zieliński
    messages: [
      {
        id: 1,
        content: "Organizujemy zbiórkę żywności dla schroniska. Możesz pomóc w sortowaniu?",
        sender: "Tomasz Zieliński",
        direction: "incoming",
        timestamp: "15:40"
      },
      {
        id: 2,
        content: "Oczywiście! Kiedy i gdzie?",
        sender: "me",
        direction: "outgoing",
        timestamp: "15:50"
      },
      {
        id: 3,
        content: "Sobota 14:00, magazyn przy ul. Krakowskiej 25. Dziękuję!",
        sender: "Tomasz Zieliński",
        direction: "incoming",
        timestamp: "15:52"
      }
    ]
  }
};