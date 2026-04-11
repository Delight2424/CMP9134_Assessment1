import fetch from "node-fetch";

class RobotService {
  constructor() {
    this.baseUrl = "http://localhost:5000";
  }

  async parseResponse(response, label) {
    const text = await response.text();

    if (!response.ok) {
      throw new Error(`${label} failed (${response.status}): ${text}`);
    }

    try {
      return JSON.parse(text);
    } catch {
      throw new Error(`${label} returned invalid JSON: ${text}`);
    }
  }

  async fetchStatus() {
    const response = await fetch(`${this.baseUrl}/api/status`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return this.parseResponse(response, "fetchStatus");
  }

  async moveTo(x, y) {
    const response = await fetch(`${this.baseUrl}/api/move`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ x, y }),
    });

    return this.parseResponse(response, "moveTo");
  }

  async resetPosition() {
    const response = await fetch(`${this.baseUrl}/api/reset`, {
      method: "POST",
    });

    return this.parseResponse(response, "resetPosition");
  }

  async fetchMap() {
    const response = await fetch(`${this.baseUrl}/api/map`);
    return this.parseResponse(response, "fetchMap");
  }

  async fetchSensors() {
    const response = await fetch(`${this.baseUrl}/api/sensor`);
    return this.parseResponse(response, "fetchSensors");
  }
}

export default new RobotService();
