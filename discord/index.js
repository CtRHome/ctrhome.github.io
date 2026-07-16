const IMAGES = "assets/images/";
const ANIMFRAMES = ["anim0", "anim1", "anim2", "anim3", "anim4"];

let bgscale = 1;

function loadimg(src) {
  return new Promise(res => {
    const img = new Image();
    img.onload = () => (img.decode ? img.decode() : Promise.resolve()).catch(() => {}).then(() => res(img));
    img.onerror = () => res(img);
    img.src = src;
  });
}

async function loadall() {
  const bg = await loadimg(IMAGES + "bg.png");
  const anim = await Promise.all(ANIMFRAMES.map(n => loadimg(IMAGES + n + ".png")));
  return {bg, anim};
}

/*//////////////////////////////////////////////////////////////////////*/

function fitground() {
  bgscale = window.innerHeight / 240;
  document.querySelector(".ground").style.height = (14 * bgscale) + "px";
}

/*//////////////////////////////////////////////////////////////////////*/

function settext(el, str, color = null) {
  el.textContent = str;
  if (color) el.style.color = color;
}

/*//////////////////////////////////////////////////////////////////////*/

const STATUSORDER = {online: 0, idle: 1, dnd: 2, offline: 3};
const HIDDEN = ["sapphire", "starboard", "widgetbot", "wick"];

function rendermembers(data) {
  settext(document.querySelector(".servername"), data.name);
  settext(document.querySelector(".presence"), data.presence_count + " online", "lightgray");

  const join = document.querySelector(".join");
  if (data.instant_invite) join.href = data.instant_invite;
  else join.style.display = "none";

  const list = document.querySelector(".memberlist");
  list.textContent = "";

  const members = data.members.filter(m => !HIDDEN.includes(m.username.toLowerCase())).sort((a, b) =>
    (STATUSORDER[a.status] ?? 4) - (STATUSORDER[b.status] ?? 4) ||
    a.username.localeCompare(b.username));

  for (const m of members) {
    const row = document.createElement("div");
    row.className = "member";

    const wrap = document.createElement("div");
    wrap.className = "avatarwrap";
    const avatar = document.createElement("img");
    avatar.className = "avatar";
    avatar.src = m.avatar_url;
    avatar.loading = "lazy";
    const dot = document.createElement("div");
    dot.className = "statusdot " + (STATUSORDER[m.status] !== undefined ? m.status : "offline");
    wrap.append(avatar, dot);

    const info = document.createElement("div");
    info.className = "memberinfo";
    const name = document.createElement("div");
    name.className = "membername";
    settext(name, m.username);
    info.append(name);
    if (m.game && m.game.name) {
      const game = document.createElement("div");
      game.className = "membergame";
      settext(game, "playing " + m.game.name, "#949ba4");
      info.append(game);
    }

    row.append(wrap, info);
    list.append(row);
  }
}

async function updatemembers() {
  try {
    const res = await fetch("https://discord.com/api/guilds/1112531659078762617/widget.json");
    if (!res.ok) throw new Error(res.status);
    rendermembers(await res.json());
  } catch {
    const list = document.querySelector(".memberlist");
    if (!list.children.length) {
      const err = document.createElement("div");
      err.className = "membererror";
      settext(err, "member list unavailable", "#949ba4");
      list.append(err);
    }
  }
}

/*//////////////////////////////////////////////////////////////////////*/

async function init() {
  fitground();
  window.addEventListener("resize", fitground);
  settext(document.querySelector(".join"), "Join Server");
  updatemembers();
  setInterval(updatemembers, 60000);
}

init();
