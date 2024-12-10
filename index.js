class room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = null;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  describe() {
    return (
      "Looking around the " + this._name + " you can see " + this._description
    );
  }

  getDetails() {
    const entries = Object.entries(this._linkedRooms);
    let details = [];
    for (const [direction, room] of entries) {
      let text = `The ${room._name} is to the ${direction}`;
      details.push(text);
    }
    return details.join("<br>");
  }

  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You're Lost, try another way");
      return this;
    }
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }

  set character(character) {
    this._character = character;
  }

  get character() {
    return this._character;
  }
}

class character {
  constructor(name) {
    this._name = name;
    this._description = "";
    this._conversation = "";
  }

  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }

  set description(value) {
    if (value.length < 4) {
      alert("Description is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("Conversation is too short.");
      return;
    }
    this._conversation = value;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get conversation() {
    return this._conversation;
  }

  describe() {
    return `This is ${this._name}. ${this._description}`;
  }

  converse() {
    return `${this._name} says: ${this._conversation}`;
  }
}

// Rooms and Characters
const Entrance = new room(
  "entrance",
  "mirrors everywhere.  Quick grooming check before heading south into the Dungeon.  One must always look their best for the Dungeon. Jeffrey the buttler is here to greet you."
);
const Dungeon = new room(
  "dungeon",
  "a dark, damp, miserable place. But after you checked yourself in the mirrors you look fantastic!  Windy isn't too happy here but we think it's for the best. ahem..."
);

const Hall = new room(
  "hall",
  "is littered with broken paintings (Napoleon's doing we guess)."
);
const GamesRoom = new room(
  "games room",
  "a large card table at its center. Trixy has a smirk on her face."
);
const BallRoom = new room(
  "ball room",
  "a very grand room and if you made it here you have won the game.  CONGRATULATIONS!!!"
);

// Characters
const Jeffrey = new character("Jeffrey");
Jeffrey.description =
  "Jeffrey the butler is a snobbish tall bloke wearing his full butler kit.  he'll help you open the next room.";
Jeffrey.conversation =
  "'Ca va? Here is your key to the Dungeon 🔑  Head south now and mind your step. Au revoir.";

const Windy = new character("Windy");
Windy.description =
  "Windy is a fairy-like creature who now resides in the dungeon due to her social issues.";
Windy.conversation = "'Not sure why they put me here, do you?'";

const Napoleon = new character("Napoleon");
Napoleon.description =
  "Napoleon is a short, angry old man. He hangs out in the hall, unlike the paintings that once did before he unhung them.  Don't listen to him, just keep on going weary traveller.";
Napoleon.conversation =
  "'Où penses-tu aller? Je t'accrocherai comme l'une de mes peintures si tu oses me passer!'";

const Trixy = new character("Trixy");
Trixy.description =
  "Trixy think's she is smart. Her favourite game is tic-tac-toe. You've got this.  She isn't that good.";
Trixy.conversation =
  "'How very dare you narrator! You think you can beat me at my favourite game.  Good luck!'";

const Marie = new character("Marie");
Marie.description =
  "Marie Antoinette greets you with cake, congratulates you on keeping your head and has a rant about Napoleon.";
Trixy.conversation =
  "'Ooh la la, regarde-toi avec ta tête sur les épaules. Félicitations pour ta quête, mon fidèle sujet.  Napoléon est un tel idiot'";

// Linking characters to rooms
Entrance.character = Jeffrey;
Dungeon.character = Windy;
Hall.character = Napoleon;
GamesRoom.character = Trixy;
BallRoom.character = Marie;

// Linking rooms DIRECTIONS
Entrance.linkRoom("south", Dungeon);
Dungeon.linkRoom("north", Entrance);
Dungeon.linkRoom("east", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Dungeon);
GamesRoom.linkRoom("west", BallRoom);
GamesRoom.linkRoom("north", Hall);
BallRoom.linkRoom("east", GamesRoom);

// Function to display room information
const displayRoomInfo = (room) => {
  let occupantMsg = "";

  // Check if the room has a character
  if (room.character) {
    const character = room.character; // Get the character from the room
    occupantMsg = `<strong>${character.name}</strong> is here. ${character.description}`;
    // Optional: Display character's conversation
    occupantMsg += `<br><em>${character.conversation}</em>`;
  } else {
    occupantMsg = "There's no one in this room.";
  }

  let textContent =
    "<p>" +
    room.describe() +
    "</p>" +
    "<p>" +
    occupantMsg +
    "</p>" +
    "<p>" +
    room.getDetails() +
    "</p>";

  document.getElementById("textarea").innerHTML = textContent;
  document.getElementById("buttonarea").innerHTML =
    '> <input type="text" id="usertext"/>';
  document.getElementById("usertext").focus();
};

// Starting the game
const startGame = () => {
  let currentRoom = Entrance;
  displayRoomInfo(currentRoom);

  // Add the 'hidden' class to <h1> and <h2> elements when the game starts
  document.querySelector("h1").classList.add("hidden");
  document.querySelector("h2").classList.add("hidden");

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"];

      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        document.getElementById("usertext").value = "";
        displayRoomInfo(currentRoom);
      } else {
        alert("Not a valid command. Please try again.");
        displayRoomInfo(currentRoom);
        document.getElementById("usertext").value = "";
      }
    }
  });
};

document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    document.getElementById("startGameButton").style.display = "none";
    document.getElementById("gamearea").style.display = "block";
    startGame();
  });
