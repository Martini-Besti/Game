/**
 * Characters move to a new room based on the given direction.
 * @param {string} direction - The direction to move ("north", "south", "east", "west").
 * @returns {room} - The new room after the move.
 * @author Martina Best
 */

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

  // The move method goes here
  move(direction) {
    if (direction in this._linkedRooms) {
      return this._linkedRooms[direction]; // Move to the linked room in the given direction
    } else {
      alert("You're Lost, try another way"); // Show an alert if no linked room in that direction
      return this; // Stay in the current room if the direction is invalid
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

/**
 * Each room has a different character
 * @param {string} character - an image, name, description, and conversation appear with the character in their assigned linked room.
 */

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
  "mirrors everywhere. Quickly check your grooming standards before heading south into the Dungeon. One must always look their finest for the Dungeon."
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
  "a grand room and if you made it here you have won the game. CONGRATULATIONS!!!"
);

// GamesRoom questions
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
  "Jeffrey the butler is a snobbish tall bloke wearing his full butler kit. He'll help you open the next room.";
Jeffrey.conversation =
  "'Ca va? Get yourself to Marie ASAP.  She is in the Ballroom. Here is your key to the Dungeon 🔑  Head south and mind your step. Au revoir.'";

const Snuggles = new character("Snuggles");
Snuggles.description = "Snuggles the snuggly dragon would like a snuggle.";
Snuggles.conversation =
  "'Bring it in here you! (snuggles you to the brink of breaking wind)... Your mission is clear is to get to the Marie. Head east but be careful. Napoleon is in a bad mood!'";

const Napoleon = new character("Napoleon");
Napoleon.description =
  "Happy looking chap isn't he? He hangs out in the hall, unlike the paintings that once did before he unhung them. Don't listen to him, just keep on going weary traveller.";
Napoleon.conversation =
  "'Où penses-tu aller? Je t'accrocherai comme l'une de mes peintures si tu oses me passer!'";

// Code hidden or not working ***************
const Louis = new character("Louis");
Louis.description = "Louis has a distracted look, too busy for conversation.";
Louis.conversation = "Louis gives you a nod without saying anything";

const Marie = new character("Marie");
Marie.description =
  "Marie Antoinette greets you with a tune on her harp, congratulates you on keeping your head, and has a rant about Napoleon.";
Marie.conversation =
  "'Ooh la la, regarde-toi avec ta tête sur les épaules. Félicitations pour ta quête, mon fidèle sujet. Napoléon est un tel idiot'";

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
  "games room": "louis.jpeg",
  "ball room": "ballroomMarie.jpeg",
};

const displayRoomInfo = (room) => {
  let occupantMsg = "";

  // Check if the room has a character
  if (room.character) {
    const character = room.character;
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
    if (isCorrect && room === GamesRoom) {
      const nextRoom = room.move("west"); // BallRoom is to the west from GamesRoom
      displayRoomInfo(nextRoom); // Show the BallRoom details
    }
  };

  // If the room has questions, display them
  if (room._questions.length !== 0) {
    let html =
      "<div class='question-wrapper'>" +
      "<div>" +
      room._questions
        .map((question) => {
          return `<p><strong>${question.question}</strong></p>`;
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
        validateAnswer(isCorrect); // Call validateAnswer function
      });
    });

    // If the room is the GamesRoom, change the placeholder to the new text
    if (room === GamesRoom) {
      document.getElementById("usertext").placeholder =
        "Answer the question above to gain access to the Ballroom";
    }
  } else {
    // If no questions, display basic room info
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

  // Reset the placeholder to the default text when not in the GamesRoom
  if (room !== GamesRoom) {
    document.getElementById("usertext").placeholder = "Enter a command...";
  }

  // Show or hide the "Take me back to the entrance" button if NOT in the Entrance
  const backToEntranceButton = document.getElementById("backToEntranceButton");
  if (room !== Entrance) {
    backToEntranceButton.classList.remove("hidden");

    // Change button text when in the BallRoom to take you back to the start of the game
    if (room === BallRoom) {
      backToEntranceButton.innerText = "Restart Game";
    } else {
      backToEntranceButton.innerText = "I'm lost! Send me back to the Entrance"; // Default text for other rooms
    }
  } else {
    backToEntranceButton.classList.add("hidden");
  }

  // Update the room image based on the current room
  const roomImage = document.getElementById("room-image");
  const roomImagePath = roomImages[room.name.toLowerCase()] || "default.jpg"; // Default image in case of error
  roomImage.src = roomImagePath;
};

// Back to Entrance or Restart Game button handler
document
  .getElementById("backToEntranceButton")
  .addEventListener("click", function () {
    // Check if we're in the BallRoom
    if (currentRoom === BallRoom) {
      // Restart the game by calling startGame
      startGame();
    } else {
      // If not in the BallRoom, reset to the entrance as before
      let currentRoom = Entrance;
      displayRoomInfo(currentRoom);
      document.getElementById("usertext").value = "";
    }
  });

// Starting the game
const startGame = () => {
  let currentRoom = Entrance;
  displayRoomInfo(currentRoom);

  // Add the 'hidden' class to <h1>, <h2> and <h3> elements when the game starts
  document.querySelector("h1").classList.add("hidden");
  document.querySelector("h2").classList.add("hidden");
  document.querySelector("h3").classList.add("hidden");

  document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const command = document.getElementById("usertext").value;
      const directions = ["north", "south", "east", "west"];

      if (directions.includes(command.toLowerCase())) {
        // Try to move in the specified direction
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

// Back to Entrance button handler
document
  .getElementById("backToEntranceButton")
  .addEventListener("click", function () {
    // Reset the current room to Entrance
    let currentRoom = Entrance;
    displayRoomInfo(currentRoom); // Display the entrance room

    // Reset the input for next command (prevent any lingering input)
    document.getElementById("usertext").value = "";
  });

document
  .getElementById("startGameButton")
  .addEventListener("click", function () {
    document.getElementById("startGameButton").style.display = "none";
    document.getElementById("gamearea").style.display = "block";
    startGame();
  });
