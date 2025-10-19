class State2 {
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

const s2 = new State2();

window.ThePeeps = class {
  bittyInit() {
    s2.bodies = [...document.querySelectorAll("[data-part=body]")].toSpliced(
      12,
    );
    s2.faces = [...document.querySelectorAll("[data-part=face]")].toSpliced(
      12,
    );
    s2.heads = [...document.querySelectorAll("[data-part=head]")].toSpliced(
      12,
    );
  }

  peep(_event, el) {
    el.replaceChildren(s2.bodies[el.dataset.num]);
    el.appendChild(s2.heads[el.dataset.num]);
    el.appendChild(s2.faces[el.dataset.num]);
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

  scrambleBody(_event, _el) {
    s2.scrambleBody();
  }

  scrambleHead(_event, _el) {
    s2.scrambleHead();
  }
}
