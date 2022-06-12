class ClockComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    console.log("Clock running");
  }

  connectedCallback() {
    this.tipo = this.getAttribute("tipo");
    console.log(`Clock is ${this.tipo}`);
    this.createClock();
    setInterval(() => {
      this.updateClock();
    }, 1000);
  }

  createClock() {
    this.svg = document.getElementById("clock");
    this.clock = this.svg.content.cloneNode(true);
    console.log(this.clock);
    this.clock.firstElementChild.setAttribute("id", "app-clock");
    this.shadowRoot.append(this.clock);
  }

  updateClock() {
    let time = new Date();
    let hour = time.getHours();
    let minute = time.getMinutes();
    let seconds = time.getSeconds();

    this.shadowRoot.querySelector("#app-clock svg").innerHTML = `
      <circle cx="100" cy="100" r="75" fill="none" stroke="black" stroke-width="2" />
      <g class="hour" transform="rotate(${this.rotateHours(hour)},100,100)">
        <path stroke="black" stroke-width="4" d="M 100 100 l 0 -35"></path>
      </g>

      <g class="minute" transform="rotate(${this.rotateMinutes(minute)},100,100)">
        <path stroke="black" stroke-width="2" d="M 100 100 l 0 -60"></path>
      </g>

      <g class="second" transform="rotate(${this.rotateSeconds(seconds)},100,100)">
        <path stroke="red" stroke-width="1" d="M 100 100 l 0 -60"></path>
      </g>
    `;
  }

  rotateSeconds(seconds) {
    let rotation = (360.0 * seconds) / 60;
    return rotation;
  }

  rotateMinutes(minutes) {
    let rotation = (360.0 * minutes) / 60;
    return rotation;
  }

  rotateHours(hours) {
    let rotation = (360.0 * hours) / 12;
    return rotation;
  }
}

customElements.define("clock-component", ClockComponent);
