class State {
  constructor() {
    this.bodies = [...document.querySelectorAll("[data-part=body]")].toSpliced(
      12,
    );
    this.faces = [...document.querySelectorAll("[data-part=face]")].toSpliced(
      12,
    );
    this.heads = [...document.querySelectorAll("[data-part=head]")].toSpliced(
      12,
    );
  }

  scrambleBody() {
    shuffleArray(this.bodies);
  }

  scrambleHead() {
    shuffleArray(this.heads);
  }
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
}

const s = new State();

export default class {
  bittyInit() {
    document.documentElement.style.setProperty("--page-visibility", "visible");
  }

  peep(_event, el) {
    el.replaceChildren(s.bodies[el.dataset.num]);
    el.appendChild(s.heads[el.dataset.num]);
    el.appendChild(s.faces[el.dataset.num]);
  }

  async peeps(_event, el) {
    for (let num = 0; num < 12; num += 1) {
      let peep = document.createElement("div");
      peep.dataset.num = num;
      peep.dataset.receive = "peep";
      await el.appendChild(peep);
    }
    this.api.forward(null, "peep");
  }

  scrambleBody(_event, el) {
    s.scrambleBody();
  }

  scrambleHead(_event, el) {
    s.scrambleHead();
  }
}