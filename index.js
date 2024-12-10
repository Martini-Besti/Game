class Room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
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
      alert("description is too short.");
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
    // object entries returns an array of both the key and value of items in the object
    const entries = Object.entries(this._linkedRooms);
    // initialise an empty details array which will hold the formatted string based on the linked room entries
    let details = [];
    // use a for loop to loop over the entries array and specify we want the key and the value
    for (const [direction, room] of entries) {
      // format a string based on the object. We only take the information we want.
      let text = `The ${room._name} is to the ${direction}`;
      details.push(text);
      return details;
    }
  }
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction];
    } else {
      alert("You can't go that way");
      return this;
    }
  }

  linkRoom(direction, roomToLink) {
    this._linkedRooms[direction] = roomToLink;
  }
}
class Character {
  constructor(name) {
    (this._name = name), (this._description = "");
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
      alert("Decription is too short.");
      return;
    }
    this._description = value;
  }

  set conversation(value) {
    if (value.length < 4) {
      alert("conversation is too short.");
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
    return `${this._name} says ${this._conversation}`;
  }
}

// for the assignment link character to room

const Entrance = new Room("entrance");
Entrance.description =
  "fairy lights and flowers. Snuggles the Dragon is here to greet you.";
const Dungeon = new Room("dungeon");
Dungeon.description = "a dark, damp, miserable place. Snuggles moved out weeks ago he just couldn't bare it.";
const GamesRoom = new Room("games room");
GamesRoom.description = "a large card table at it's centre.  Trixy has a smirk on her face.  Don't let her win!";
const Hall = new Room("hall");
Hall.description =
  "it is literred with broken paintings (Deniro's doing we guess).";



const Snuggles = new Character("Snuggles");
Snuggles.description = "Sunggles the Dragon is a friendly fella.  His favourite drink is a Flaming Lamborghini.  Do you have any on you? Give him his favourite drink and he will give you the flame to open the next room.";
Snuggles.conversation = "Don't spose you got any Flaming Lambo onya?";
const Windy = new Character("Windy");
Windy.description = "Windy was sent to live in the dungeon.  She's a beautiful fairy like creature but has a small social issue, which is why she now resides in the dungeon.";
Windy.conversation = "Not sure why they put me here, do you? If you know why I will tell you which direction to head and give you a can of beans.  I don't need them";
const Napoleon = new Character("Napoleon");
Napoleon.description = "Napoleon is a very short and angry old man.  He hangs out in the hall like he's lost a war. Don't trust him.  He has tiny man sydrome.";
Napoleon.conversation = "Where the heck do you think you're going, this is all mine and more!  Give me your can of Beans then go North or I will fight you!";
const Trixy = new Character("trixy");
Trixy.description = "Trixy is incredibly smart.  Her favourite game is tik-tac-toe.  Good luck.  You will need to win to carry on or you will be sent back to Snuggles at the entrance.";
Trixy.conversation = "Phffff. You think you can beat me? I'm Tricky Trixy!";

Entrance.linkRoom("south", Dungeon);
Entrance.linkRoom("east", Hall);
Dungeon.linkRoom("north", Entrance);
Dungeon.linkRoom("east", GamesRoom);
GamesRoom.linkRoom("west", Dungeon);
GamesRoom.linkRoom("north", Hall);
Hall.linkRoom("south", GamesRoom);
Hall.linkRoom("west", Entrance);



//the room parameter to this function is a room object

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  if (room.character) {
    ////logic for displaying chacter in the room and their dialogue
    occupantMsg = `<strong>${character.name}</strong> is here. ${character.description}`;
    // if (character.dialogue) {
    //     occupantMsg += `<br><em>${character.dialogue}</em>`;
    //   }
} else {
    occupantMsg = "theres noone in this room";
  }
  textContent =
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

const startGame = () => {
  currentRoom = Entrance;
  displayRoomInfo(currentRoom);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      //grab the contenst of the input box
      const command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"];

      if (directions.includes(command.toLowerCase())) {
        currentRoom = currentRoom.move(command);
        document.getElementById("usertext").value = "";
        displayRoomInfo(currentRoom);
      } else {
        alert("Not a valid command.  Please try again.");
        displayRoomInfo(currentRoom);
        document.getElementById("usertext").value = "";
      }
    }
  });
};
startGame();
