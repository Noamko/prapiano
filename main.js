function TileClick(color, tile) {
  if (color === "black") {
    var container = document.getElementById("black-tiles");
    var tile = container.children[tile - 1];
    tile.style.backgroundColor = "purple";
  } else {
    var container = document.getElementById("white-tiles");
    var tile = container.children[tile - 1];
    tile.style.backgroundColor = "purple";
  }
}

function restoreBackground(color, tile) {
  if (color === "black") {
  var container = document.getElementById("black-tiles");
  var tile = container.children[tile - 1];
    tile.style.backgroundColor = "black";
  } else {
    var container = document.getElementById("white-tiles");
    var tile = container.children[tile - 1];
    tile.style.backgroundColor = "white";
  }
}

function do_si_clicked(id) {
  action = {type: "do-si-clicked", value: id}
  game.notify(action)
}
const {
  Factory,
  EasyScore,
  System,
  StaveNote,
  GhostNote,
  Voice,
  Formatter,
  stave,
} = Vex.Flow;

class Game {
  constructor(notes) {
    this.notes = notes;
    this.stage = 0
    this.current_notes = []
    this.div = document.getElementById("score-container");
    this.vf = new Vex.Flow.Factory({
      renderer: { elementId: "score-container", width: 700, height: 500 },
    });
    this.vf.getContext().scale(1.5, 1.5)
    this.system = this.vf.System()
    this.score = this.vf.EasyScore()
  }

  notify(action) {
    if (action.type === "do-si-clicked") {
      if (action.value == this.current_notes[this.stage][0]) {
        this.stage += 1
        if (this.stage >= 4) {
          this.restart()
        }
        // this.current_notes.push[this.note]
        this.set(this.current_notes.slice(0, this.stage + 1))
      }
    }
  }

  clear() {
    this.div.innerHTML = "";
    this.vf = new Vex.Flow.Factory({
      renderer: { elementId: "score-container", width: 700, height: 500 },
    });
    this.vf.getContext().scale(3, 3)
    this.system = this.vf.System({
      width: 200
      // x: 10,
      // y: 40
  })
    this.score = this.vf.EasyScore()
  }

  set(notes) {
    var staveNotes = []
    notes.forEach((note, index) => {
       var t = new StaveNote({
        keys: [note],
        duration: "q",
      }).setStyle({
        fillStyle: "black", 
        strokeStyle: "black",
      })
      staveNotes.push(t)
    })
    if (notes.length < 4) {
        for(let i = 0; i < 4 - notes.length; i++) {
          staveNotes.push(
            new GhostNote({keys: [game.notes[0]], duration: "q"}))
        }
    }
    this.clear()
    this.system.addStave({
      voices: [this.score.voice(staveNotes)],
    }).addClef("treble").addTimeSignature("4/4");
    this.vf.draw();
  }

  restart() {
    this.stage = 0
    this.current_notes = []
    for (let i = 0; i < 4; i++) {
      let rand_note_index = Math.floor(Math.random() * this.notes.length);
      this.current_notes.push(this.notes[rand_note_index]);
    }
    this.set([this.current_notes[this.stage]])
  }
}

let game = new Game([
  "a/3",
  "b/3",
  "c/4",
  "d/4",
  "e/4",
  "f/4",
  "g/4",
  "a/4",
  "b/4",
  "c/5",
  "d/5",
  "e/5",
  "f/5",
  "g/5",
  "a/5",
  "b/5",
]);

game.restart()