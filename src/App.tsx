import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { guests } from "./data_encrypted.json";
import we from "./we.png";
import weddingSrc from "./wedding.png";
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
      </div>

      {showHint ? (
        <div className="fixed bottom-0 left-0 text-6xl">💰</div>
      ) : null}
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
