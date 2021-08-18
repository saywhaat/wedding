import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { guests } from "./data_encrypted.json";
import we from "./we.png";
import "wired-elements";
import history from "./history";
import { SHA256, AES, enc } from "crypto-js";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wired-button": any;
    }
  }
}

const DEFAULT_GUEST = {
  name: "Привет друг! Если ты получал персональную ссылку, то",
  text:
    "Ну, а если ты не получал именную персональную ссылку, то просто закрой сайт",
  single: true
};

function Home() {
  const [showHint, setShowHint] = React.useState(false);
  let { secret } = useParams<{ secret: string }>();
  const encryptedGuest = guests.find(d => d.id === SHA256(secret).toString());
  const guest = encryptedGuest
    ? JSON.parse(AES.decrypt(encryptedGuest.data, secret).toString(enc.Utf8))
    : DEFAULT_GUEST;

  return (
    <div className="container max-w-screen-md	 mx-auto py-32 overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl">{guest.name}</div>
        <div className="text-2xl max-w-xs mt-16">
          Приглашаем {guest.single ? "тебя" : "вас"} на свадьбу 17 сентября
          (пятница)
        </div>
        <div className="text-lg mt-8">Интересно к кому?</div>
        <img src={we} className="w-60" style={{ mixBlendMode: "multiply" }} />
        <div className="text-lg flex gap-4 max-w-xs mt-8">
          <div>Диме Кузнецову</div>
          <div>Даше Елисеевой</div>
        </div>
      </div>

      <div className="flex flex-col items-center mt-24">
        <div className="text-5xl">История отношений</div>
        {history.map((d, i) => (
          <div
            className={`flex flex-col lg:flex-row gap-8 mt-8 ${
              i % 2 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img src={d.image} className="lg:w-2/5" />
            <div className="flex flex-col justify-center">
              <div>{d.title}</div>
              <div className="mt-4">{d.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-24">
        <div className="text-5xl">
          Где собираемся? Куда едем? Как одеваться? Что дарить
          <span
            style={{
              color: "#5DB4EC",
              cursor: "pointer",
              textDecoration: "underline"
            }}
            onMouseEnter={() => setShowHint(true)}
            onMouseLeave={() => setShowHint(false)}
          >
            ?
          </span>
        </div>
        <div className="text-lg mt-8">
          Вся информация очень скоро появится на этом сайте. Следите за
          обновлениями!
        </div>
        {guest.text ? <div className="text-lg mt-4">{guest.text}</div> : null}
      </div>

      {showHint ? (
        <div className="fixed bottom-0 left-0 text-6xl">💰</div>
      ) : null}

      <a href="https://github.com/saywhaat/wedding">
        <svg
          className="fixed top-4 right-4 w-10 h-10 rounded-full"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="GitHub"
          role="img"
          viewBox="0 0 512 512"
        >
          <rect width="512" height="512" rx="15%" fill="#1B1817" />
          <path
            fill="#fff"
            d="M335 499c14 0 12 17 12 17H165s-2-17 12-17c13 0 16-6 16-12l-1-50c-71 16-86-28-86-28-12-30-28-37-28-37-24-16 1-16 1-16 26 2 40 26 40 26 22 39 59 28 74 22 2-17 9-28 16-35-57-6-116-28-116-126 0-28 10-51 26-69-3-6-11-32 3-67 0 0 21-7 70 26 42-12 86-12 128 0 49-33 70-26 70-26 14 35 6 61 3 67 16 18 26 41 26 69 0 98-60 120-117 126 10 8 18 24 18 48l-1 70c0 6 3 12 16 12z"
          />
        </svg>
      </a>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path={["/:secret", ""]}>
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
