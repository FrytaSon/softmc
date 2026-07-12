const SERVER_IP = "softmc.eu";

const elements = {
    status: document.getElementById("server-status"),
    state: document.getElementById("server-state"),
    players: document.getElementById("players-online"),
    playersBig: document.getElementById("players-online-big"),
    playersMax: document.getElementById("players-max"),
    ping: document.getElementById("server-ping"),
    version: document.getElementById("server-version")
};

async function updateServerStatus() {

    try {

        const response = await fetch(
            `https://api.mcstatus.io/v2/status/java/${SERVER_IP}`
        );

        if (!response.ok) {
            throw new Error("API Error");
        }

        const data = await response.json();
        console.log(data);

        if (!data.online) {

            elements.status.innerHTML = "🔴 Offline";
            elements.state.innerHTML = "OFFLINE";

            elements.players.innerHTML = "0";
            elements.playersBig.innerHTML = "0";
            elements.playersMax.innerHTML = "0";

            elements.ping.innerHTML = "--";
            return;
        }

        elements.status.innerHTML =
            "<span class='online'>🟢 Online</span>";

        elements.state.innerHTML = "ONLINE";

        elements.players.innerHTML =
            data.players.online;

        elements.playersBig.innerHTML =
            data.players.online;

        elements.playersMax.innerHTML =
            data.players.max;

        elements.ping.innerHTML =
            data.latency
                ? `${data.latency} ms`
                : "--";

        if (data.version) {

            elements.version.innerHTML = "1.21.x";

        }

        changeFavicon(data);

        updateMOTD(data);

        updatePlayerList(data);

    } catch (e) {

        console.error(e);

        elements.status.innerHTML = "⚠️ Błąd";

        elements.state.innerHTML = "NIEDOSTĘPNY";

    }

}

function changeFavicon(data) {

    if (!data.icon) return;

    let favicon =
        document.querySelector("link[rel='icon']");

    favicon.href = data.icon;

}

function updateMOTD(data) {

    const motd = document.getElementById("server-motd");

    if (!motd) return;

    if (!data.motd || !data.motd.clean) {

        motd.innerHTML = "Brak MOTD";

        return;

    }

    if (Array.isArray(data.motd.clean)) {

        motd.innerHTML = data.motd.clean.join("<br>");

    } else {

        motd.innerHTML = data.motd.clean;

    }

}

function updatePlayerList(data) {

    let container =
        document.getElementById("online-players");

    if (!container) return;

    container.innerHTML = "";

    if (
        !data.players ||
        !data.players.list
    ) {

        container.innerHTML =
            "<p>Lista graczy ukryta.</p>";

        return;

    }

    data.players.list.forEach(player => {

        let div =
            document.createElement("div");

        div.className = "player";

        div.innerHTML =
            "🟢 " + (player.name_clean || player.name);

        container.appendChild(div);

    });

}

function copyIP() {

    navigator.clipboard.writeText(SERVER_IP);

    const button =
        document.querySelector(".copy-ip");

    if (button) {

        const old =
            button.innerHTML;

        button.innerHTML =
            "✅ Skopiowano";

        setTimeout(() => {

            button.innerHTML = old;

        }, 2000);

    } else {

        alert("Skopiowano IP: " + SERVER_IP);

    }

}

updateServerStatus();

setInterval(updateServerStatus, 15000);