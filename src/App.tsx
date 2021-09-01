import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { guests } from "./data_encrypted.json";
import we from "./we.png";
import "wired-elements";
import history from "./history";
import { SHA256, AES, enc } from "crypto-js";
import "wired-elements";
import dc1 from "./dc1.jpg";
import dc2 from "./dc2.jpg";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wired-image": any;
      "wired-card": any;
    }
  }
}

const DC_OK = [dc1, dc2, dc2, dc2, dc1, dc1, dc1, dc1];

const SCHEDULE = [
  { time: "12.00", text: "Сбор у автобуса" },
  { time: "12.00", text: "Сбор у автобуса" },
  { time: "12.00", text: "Сбор у автобуса" },
  { time: "12.00", text: "Сбор у автобуса" },
  { time: "12.00", text: "Сбор у автобуса" }
];

const DEFAULT_GUEST = {
  name: "Привет друг! Если ты получал персональную ссылку, то",
  text:
    "Ну, а если ты не получал именную персональную ссылку, то просто закрой сайт",
  single: true,
  isIT: true
};

function Home() {
  // const [showHint, setShowHint] = React.useState(false);
  let { secret } = useParams<{ secret: string }>();
  const encryptedGuest = guests.find(d => d.id === SHA256(secret).toString());
  const guest = encryptedGuest
    ? JSON.parse(AES.decrypt(encryptedGuest.data, secret).toString(enc.Utf8))
    : DEFAULT_GUEST;

  return (
    <div className="container max-w-screen-md	 mx-auto py-32 px-4 overflow-hidden">
      <div className="flex flex-col items-center text-center">
        <div className="text-5xl">{guest.name}</div>
        <div className="text-2xl max-w-xs mt-16">
          Приглашаем {guest.single ? "тебя" : "вас"} на нашу свадьбу 17 сентября
          (пятница)
        </div>
        <div className="text-lg mt-8">Интересно к кому?</div>
        <img
          alt=""
          src={we}
          className="w-60"
          style={{ mixBlendMode: "multiply" }}
        />
        <div className="text-lg flex gap-4 max-w-xs mt-8">
          <div>Диме Кузнецову</div>
          <div>Даше Елисеевой</div>
        </div>
        <div className="text-lg mt-16 max-w-s">
          <div>Отмечать будем в Forest Symphony</div>
        </div>
        <div className="text-lg mt-4 max-w-s">
          <div>ЛО 30 км Новоприозерского шоссе</div>
        </div>
        {guest.text ? (
          <div className="text-lg mt-16 max-w-s">{guest.text}</div>
        ) : null}
      </div>

      <div className="flex flex-col items-center mt-24">
        <div className="text-5xl">История отношений</div>
        {history.map((d, i) => (
          <div
            className={`flex flex-col lg:flex-row gap-8 mt-8 ${
              i % 2 ? "lg:flex-row-reverse" : ""
            }`}
          >
            <img alt="" src={d.image} className="lg:w-2/5" />
            <div className="flex flex-col justify-center">
              <div>{d.title}</div>
              <div className="mt-4">{d.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mt-24">
        <div className="text-5xl">Дресс-код</div>
        <div className="text-lg mt-8">
          Текст, который составит Даша о том как можно одеваться, а за ним
          картинки примеров как можно одеваться мужчин и дам и не дам
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {DC_OK.map(src => (
            <wired-image
              style={{ height: 300 }}
              elevation="2"
              src={src}
            ></wired-image>
          ))}
        </div>
      </div>

      <div className="flex flex-col mt-24">
        <wired-card elevation="2">
          <div className="p-8">
            <div className="text-5xl">Расписание мероприятий</div>
            {SCHEDULE.map(d => (
              <div className="mt-6">
                <div style={{ color: "#22A116" }}>{d.time}</div>
                <div>{d.text}</div>
              </div>
            ))}
          </div>
        </wired-card>
      </div>

      {guest.IT ? (
        <a href="https://github.com/saywhaat/wedding">
          <svg
            className="absolute top-4 right-4 w-10 h-10 rounded-full"
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
