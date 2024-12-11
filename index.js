class room {
  constructor(name, description) {
    this._name = name;
    this._description = description;
    this._linkedRooms = {};
    this._character = null;
    this._questions = [];
    this._correctAnswers = 0;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }
  set questions(value) {
    this._questions = value;
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
  "mirrors everywhere.  Quickly check your grooming standards before heading south into the Dungeon.  One must always look their finest for the Dungeon."
);
const Dungeon = new room(
  "dungeon",
  "a dark, damp, miserable place. But after you checked yourself in the entrance mirrors you look fantastic!"
);

const Hall = new room(
  "hall",
  "is littered with broken paintings (Napoleon's doing we guess)."
);
const GamesRoom = new room(
  "games room",
  "a large gaming table at its center. If you zoom in, Louis has a smirk on his face."
);
const BallRoom = new room(
  "ball room",
  "a grand room and if you made it here you have won the game.  CONGRATULATIONS!!!"
);

GamesRoom.questions = [
  {
    question:
      "Click the correct answer of what was Marie Antoinette's favourite food?",
    answer: "Roast Duck",
    options: [
      {
        answer: "Roast Duck",
        correct: true,
      },
      {
        answer: "Foie Gras",
        correct: false,
      },
      {
        answer: "Beef Bourguignon",
        correct: false,
      },
    ],
  },
];

// Characters
const Jeffrey = new character("Jeffrey");
Jeffrey.description =
  "Jeffrey the butler is a snobbish tall bloke wearing his full butler kit.  He'll help you open the next room.";
Jeffrey.conversation =
  "'Ca va? Here is your key to the Dungeon 🔑  Head south to the Dungeon and mind your step. Au revoir.";

const Snuggles = new character("Snuggles");
Snuggles.description = "Snuggles the snuggly dragon would like a snuggle.  ";
Snuggles.conversation =
  "'Bring it in here you! (sunggles you to the brink of breaking wind)... You're mission is clear.  Head east but be careful.  Napoleon is in a bad mood!'";

const Napoleon = new character("Napoleon");
Napoleon.description =
  "Happy looking chap isn't he. He hangs out in the hall, unlike the paintings that once did before he unhung them.  Don't listen to him, just keep on going weary traveller. And yeah we don't understand his accent either.  Just head to the games room.  You need to pass a test before 🥂 and 🎂 with Marie.";
Napoleon.conversation =
  "'Où penses-tu aller? Je t'accrocherai comme l'une de mes peintures si tu oses me passer!'";

const Louis = new character("Louis");
Louis.description =
  "Louis think's he is smart. His favourite game is tic-tac-toe. You've got this.  He isn't that good.";
Louis.conversation =
  "'How very dare you narrator! You think you can beat me at my favourite game.  Good luck!'";

const Marie = new character("Marie");
Marie.description =
  "Marie Antoinette greets you with a tune on her harp, congratulates you on keeping your head and has a rant about Napoleon.";
Louis.conversation =
  "'Ooh la la, regarde-toi avec ta tête sur les épaules. Félicitations pour ta quête, mon fidèle sujet.  Napoléon est un tel idiot'";

// Linking characters to rooms
Entrance.character = Jeffrey;
Dungeon.character = Snuggles;
Hall.character = Napoleon;
GamesRoom.character = Louis;
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

// Image for each room
const roomImages = {
  entrance: "butler.jpeg",
  dungeon: "snuggles.jpg",
  hall: "napoleon.jpeg",
  //the below code only works this way for some reason please check!!!!
  "games room": "louis.jpeg",
  "ball room": "ballroomMarie.jpeg",
};

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  // Check if the room has a character
  if (room.character) {
    const character = room.character; // Get the character from the room
    occupantMsg = `Meet <strong>${character.name}</strong>. ${character.description}`;
    occupantMsg += `<br><em>${character.conversation}</em>`;
  } else {
    occupantMsg = "There's no one in this room.";
  }

  const validateAnswer = (isCorrect) => {
    console.log("This is working", isCorrect);

    if (isCorrect) {
      room._correctAnswers++;
    }

    // Check if the correct answer is selected and move to BallRoom
    if (isCorrect) {
      if (room === GamesRoom) {
        // Move to the BallRoom directly
        room.move("west"); // BallRoom is to the west from GamesRoom
        displayRoomInfo(BallRoom); // Show the BallRoom details
      }
    }
  };

  // If the room has questions, display them
  if (room._questions.length !== 0) {
    let html =
      "<div class='question-wrapper'>" +
      "<div>" +
      room._questions
        .map((question) => {
          return "<p>" + question.question + "</p>";
        })
        .join("") +
      "</div>" +
      "<div class='answer-wrapper'>" +
      room._questions
        .map((question) => {
          return question.options
            .map((option) => {
              return `<p class='answer' data-correct='${option.correct}'>${option.answer}</p>`;
            })
            .join("");
        })
        .join("") +
      "</div>" +
      "</div>";
    document.getElementById("textarea").innerHTML = html;

    // Add event listeners AFTER inserting the HTML
    const answers = document.getElementsByClassName("answer");
    Array.from(answers).forEach((answer) => {
      answer.addEventListener("click", function () {
        const isCorrect = this.getAttribute("data-correct") === "true";
        console.log(isCorrect);
        validateAnswer(isCorrect);
      });
    });
  } else {
    // Your existing else block code
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
  }

  // Show or hide the "Take me back to the entrance" button if NOT in the Entrance
  const backToEntranceButton = document.getElementById("backToEntranceButton");
  if (room !== Entrance) {
    backToEntranceButton.classList.remove("hidden");
  } else {
    backToEntranceButton.classList.add("hidden");
  }

  // Update the room image based on the current room
  const roomImage = document.getElementById("room-image");
  const roomImagePath = roomImages[room.name.toLowerCase()] || ""; // Default to an empty string if no match
  roomImage.src = roomImagePath;

  // Update the button/input area for user commands
  document.getElementById("buttonarea").innerHTML =
    '<input type="text" id="usertext"/>';
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
