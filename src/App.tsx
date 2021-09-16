import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { guests } from "./data_encrypted.json";
// import we from "./we.png";
import "wired-elements";
import { SHA256, AES, enc } from "crypto-js";
import "wired-elements";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "wired-image": any;
      "wired-card": any;
      "wired-tabs": any;
      "wired-tab": any;
    }
  }
}

const SCHEDULE = [
  { time: "13-20", text: "Сбор у автобуса на юге города" },
  { time: "14-00", text: "Сбор у автобуса на северо-востоке города" },
  { time: "15-30", text: "Вэлком и коктейли" },
  { time: "16-00", text: "Церемония" },
  { time: "17-00", text: "Уютный ужин и вечеринка" },
  { time: "23-00", text: "Окончание вечера" },
];

const DEFAULT_GUEST = {
  name: "Привет друг! Если ты получал персональную ссылку, то",
  text: "Ну, а если ты не получал именную персональную ссылку, то просто закрой сайт",
  single: true,
  isIT: true,
};

function Home() {
  // const [showHint, setShowHint] = React.useState(false);
  let { secret } = useParams<{ secret: string }>();
  const encryptedGuest = guests.find((d) => d.id === SHA256(secret).toString());
  const guest = encryptedGuest
    ? JSON.parse(AES.decrypt(encryptedGuest.data, secret).toString(enc.Utf8))
    : DEFAULT_GUEST;

  return (
    <div className="container max-w-screen-md	 mx-auto py-32 px-4 overflow-hidden">
      <wired-card class="w-full">
        <div className="p-2">
          <div className="text-2xl">Контакты организаторов</div>
          <div className="text-xl mt-8">Юля +7 960 254-07-14</div>
          <div className="text-xl mt-2">Лиза +7 911 265-75-21</div>
        </div>
      </wired-card>
      <wired-tabs class="mt-16">
        <wired-tab name="Расписание">
          <div className="p-2">
            <div className="text-5xl mt-16">Расписание мероприятий</div>
            {SCHEDULE.map((d) => (
              <div className="mt-6">
                <div style={{ color: "#22A116" }}>{d.time}</div>
                <div>{d.text}</div>
              </div>
            ))}
          </div>
        </wired-tab>
        <wired-tab name="Трансфер">
          <div className="p-2">
            <div className="text-5xl mt-16">Трансфер</div>

            <div className="text-2xl mt-16">
              Автобус будет собирать гостей в следующих локациях:
            </div>
            <div className="mt-6">
              <div style={{ color: "#22A116" }}>13:20</div>
              <div>Московский пр.212 демонстрационный проезд</div>
            </div>
            <div className="mt-6">
              <div style={{ color: "#22A116" }}>14:00</div>
              <div>Заневский пр.13</div>
            </div>
            <div className="text-xl mt-16">
              С праздника автобус повезет гостей тем же маршрутом. Прибытие в
              СПБ ориентировочно в полночь
            </div>
          </div>
        </wired-tab>
      </wired-tabs>

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
