import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { data } from "./data_encrypted.json";
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

function Home() {
  let { secret } = useParams<{ secret: string }>();
  const encryptedGuest = data.find((d) => d.id === SHA256(secret).toString())!;
  const guest = {
    name: AES.decrypt(encryptedGuest.name, secret).toString(enc.Utf8),
  };

  return (
    <div className="container max-w-screen-md	 mx-auto">
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl mt-48">{guest.name}</div>
        <div className="text-2xl max-w-xs">
          Приглашаем васна свадьбу 17 сентября
        </div>
        <div className="text-lg mt-8">Интересно к кому?</div>
        <img src={we} />
        <div className="text-lg flex gap-4 max-w-xs">
          <div>Диме Кузнецову</div>
          <div>Даше Елисеевой</div>
        </div>
        <div className="text-2xl mt-12">Придете?</div>
        <div className="flex mt-6">
          <div>
            <wired-button elevation="2">
              <div className="text-lg pt-2 px-4">Конечно!</div>
            </wired-button>
          </div>
          <div className="ml-8">
            <wired-button elevation="2">
              <div className="text-lg pt-2 px-4">Нет</div>
            </wired-button>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center">
        <div className="text-5xl mt-24">История отношений</div>
        {history.map((d, i) => (
          <div className={`flex gap-8 ${i % 2 ? "flex-row-reverse" : ""}`}>
            <img src={d.image} />
            <div>
              <div>{d.title}</div>
              <div>{d.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/:secret">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
