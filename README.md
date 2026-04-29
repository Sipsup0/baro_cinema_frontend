# 🎬 BARO Cinema frontend dokumentáció

A **BARO Cinema** egy React + Vite alapú mozi webalkalmazás frontend része. A projekt célja, hogy a felhasználók egyszerűen böngészhessék az aktuálisan vetített filmeket, be tudjanak jelentkezni, majd egy kiválasztott filmhez helyet tudjanak foglalni. A rendszerhez admin felület is tartozik, ahol a megfelelő jogosultságú felhasználó kezelni tudja a filmeket.

---

## 🔗 Projekt célja

A weboldal egy mozi foglaló rendszer felhasználói felületét valósítja meg. A frontend nem statikus adatokból dolgozik, hanem backend végpontokon keresztül tölti be a filmeket, a felhasználói adatokat és a foglaláshoz szükséges információkat.

A projekt főbb részei:

- publikus főoldal filmekkel,
- regisztráció és bejelentkezés,
- bejelentkezett felhasználói nézet,
- admin panel,
- filmek kezelése,
- 5x5-ös székválasztós foglalási oldal,
- reszponzív navbar hamburger menüvel.

---

## 🛠️ Használt technológiák

### Frontend

- React
- Vite
- React Router DOM
- JavaScript
- CSS
- Bootstrap / React Bootstrap

### Backend kapcsolat

A frontend proxy-n keresztül kommunikál a backenddel. A Vite konfigurációban a következő útvonalak vannak továbbítva:

```js
/user
/movies
```

A foglalási rendszerhez a backendben szerepelnek `/seats` végpontok is.

---

## 📁 Frontend projekt felépítése

```txt
src/
├── components/
│   ├── Button.jsx
│   ├── InputField.jsx
│   ├── Movie.jsx
│   └── NavBar.jsx
│
├── pages/
│   ├── Admin.jsx
│   ├── Admin.css
│   ├── Home.jsx
│   ├── Home.css
│   ├── Login.jsx
│   ├── Login.css
│   ├── Movie.css
│   ├── NavBar.css
│   ├── Registration.jsx
│   ├── Registration.css
│   ├── Seats.jsx
│   └── Seats.css
│
├── users.js
├── main.jsx
└── index.css
```

---

## 🧭 Oldalak és funkciók

## 🏠 `Home.jsx` – Főoldal

A főoldalon jelennek meg az aktuális filmek. A filmek nem kézzel vannak beírva, hanem backendből töltődnek be a következő végponton keresztül:

```txt
GET /movies/all
```

A főoldal tartalmaz:

- mozi stílusú fejlécet,
- film carousel nézetet,
- reszponzív film megjelenítést,
- kattintható filmkártyákat,
- navigációt a foglalási oldalra.

Filmre kattintva a felhasználó a foglalási oldalra kerül:

```txt
/seats/:id
```

---

## 👤 `Login.jsx` – Bejelentkezés

A bejelentkezési oldal lehetőséget ad a már regisztrált felhasználóknak, hogy belépjenek a rendszerbe.

A belépéshez használt backend végpont:

```txt
POST /user/login
```

Sikeres bejelentkezés után a navbar átvált bejelentkezett állapotra.

---

## 📝 `Registration.jsx` – Regisztráció

A regisztrációs oldalon új felhasználók tudnak fiókot létrehozni.

A regisztrációhoz használt végpont:

```txt
POST /user/register
```

A regisztráció során a felhasználó megadja az adatait, majd a rendszer tovább tudja kezelni őt bejelentkezett felhasználóként.

---

## 🧩 `NavBar.jsx` – Navigáció

A navbar többféle állapotban működik.

### Kijelentkezett állapotban:

- logó,
- Debrecen helyszín,
- Bejelentkezés,
- Regisztráció.

### Bejelentkezett állapotban:

- logó,
- Debrecen helyszín,
- Fiókom,
- Admin panel, ha a felhasználó admin,
- Kijelentkezés gomb.

A navbar mobilnézetben hamburger menüre vált, hogy kisebb kijelzőn is használható legyen.

---

## 🎟️ `Seats.jsx` – Foglalási nézet

A foglalási oldal egy adott filmhez tartozik. A film azonosítója az URL-ből érkezik:

```txt
/seats/:id
```

A foglalási oldalon jelenleg egy 5x5-ös terem jelenik meg, tehát összesen 25 székkel.

A nézet tartalmaz:

- film címének megjelenítését,
- vászon jelölést,
- kattintható székeket,
- kiválasztott helyek számát,
- végösszeg kiszámítását,
- foglalás gombot.

A film címe a backendből töltődik be a filmek listájából, az URL-ben kapott `movieId` alapján.

---

## 🛠️ `Admin.jsx` – Admin panel

Az admin panel a filmek kezelésére szolgál. Ezt csak olyan felhasználó láthatja, akinek megfelelő jogosultsága van.

Az admin nézetben elérhető funkciók:

- filmek listázása,
- film törlése,
- film szerkesztése,
- film adatainak módosítása,
- kép URL mező kezelése.

A filmek betöltése:

```txt
GET /movies/all
```

Film törlése:

```txt
DELETE /movies/delete/:movieId
```

Film hozzáadása:

```txt
POST /movies/addmovie
```

> Megjegyzés: a végleges film módosításhoz backend oldalon érdemes külön update végpontot használni, például:

```txt
PUT /movies/update/:movieId
```

Így biztosítható, hogy szerkesztéskor csak a kiválasztott film módosuljon.

---

## 🔐 Felhasználó kezelés

A felhasználóval kapcsolatos kérések a `src/users.js` fájlban vannak összegyűjtve.

Elérhető funkciók:

- `register()`
- `login()`
- `whoami()`
- `logout()`
- `admin()`

A `whoami()` felel azért, hogy az oldal frissítés után is tudja, be van-e jelentkezve a felhasználó.

---

## 🌐 Backend végpontok

### Felhasználók

```txt
POST /user/register
POST /user/login
GET  /user/whoami
POST /user/logout
GET  /user/admin/allUser
DELETE /user/admin/deleteUser/:userId
PUT  /user/resetpsw
```

### Filmek

```txt
GET    /movies/all
POST   /movies/addmovie
DELETE /movies/delete/:movieId
POST   /movies/movieimage/:movieID
```

### Székek / foglalás

```txt
GET    /seats/getseats
POST   /seats/picked
POST   /seats/reserved
DELETE /seats/cancelseats/:seat_id
```

---

## ⚙️ Telepítés és futtatás

### 1. Projekt letöltése

```bash
git clone <repository-url>
cd baro_cinema_frontend
```

### 2. Függőségek telepítése

```bash
npm install
```

### 3. Fejlesztői szerver indítása

```bash
npm run dev
```

A frontend alapértelmezés szerint a Vite szerveren indul el.

---

## 🧪 Hasznos parancsok

```bash
npm run dev
```

Fejlesztői mód indítása.

```bash
npm run build
```

Production build készítése.

```bash
npm run preview
```

Build előnézetének futtatása.

```bash
npm run lint
```

Kódellenőrzés futtatása.

---

## 📱 Reszponzív működés

A projekt több kijelzőmérethez is igazodik:

- asztali nézet,
- tablet nézet,
- mobil nézet.

Mobilon a navbar hamburger menüre vált, az admin kártyák egy oszlopban jelennek meg, a foglalási nézetben pedig a székek mérete kisebb lesz, hogy ne lógjanak ki a képernyőről.

---

## 🎨 Kinézet

A weboldal sötét mozi hangulatú felületet használ:

- fekete/szürke háttér,
- narancs-rózsaszín átmenetes elemek,
- kártyás filmmegjelenítés,
- mozi jellegű foglalási nézet,
- reszponzív navbar.

---

## ✅ Jelenlegi állapot

A projektben jelenleg működik:

- filmek backendből való betöltése,
- főoldali filmnézet,
- regisztráció,
- bejelentkezés,
- kijelentkezés,
- bejelentkezett navbar állapot,
- admin panel alapnézet,
- film törlése,
- foglalási oldal megjelenítése,
- 5x5-ös szék választás.

---

## 🚧 További fejlesztési lehetőségek

- valódi foglalás mentése adatbázisba,
- foglalt székek visszatöltése backendből,
- külön film részletező oldal,
- időpont választás,
- jegy generálás,
- admin dashboard,
- film módosítás külön `PUT` végponton keresztül,
- képfeltöltés admin felületen.

---

## 👨‍💻 Készítette

**Tóth Balázs**

---

## 📝 Rövid összegzés

A BARO Cinema frontend egy mozi foglaló webalkalmazás felhasználói felülete. A projektben a felhasználók filmeket nézhetnek meg, bejelentkezhetnek, helyet választhatnak, az admin pedig kezelheti a filmeket. A rendszer React alapokra épül, backenddel kommunikál, és reszponzív kialakítást kapott.
