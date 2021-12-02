## Summary

Tujuan dari aplikasi ini adalah untuk menyimpan *songlist* milik user (`artist` dan `title` dari `Song` yang mau disimpan). Dan ketika user memasukkan data, otomatis terisi `lyrics` yang didapat dari 3rd party API ([https://lyricsovh.docs.apiary.io/#](https://lyricsovh.docs.apiary.io/#)).

## Specification

### Error handlers
- Untuk menangani *bad request*, ikuti aturan ini:
  ```json
  {
    "errors": {
      "email": {
        "message": "Email is required"
      },
      "password": {
        "message": "Password is required"
      }
    }
  }
  ```
  Lebih detailnya silakan cek `*.test.js`

### Authentication

- **Register** (10 points)
  - URL:
    - `POST /register`
  - Body:
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "_id": "...",
        "email": "...",
        "password": "<HashedPassword>"
      }
    ```
  - Notes:
    - Handle juga error untuk email duplikat dan input tidak valid seperti email/password tidak diisi (status: `400`).

- **Login** (15 points)
  - URL:
    - `POST /login`
  - Body:
    - `email`: `String`, required
    - `password`: `String`, required
  - Expected response (status: `200`):
    ```json
      {
        "accessToken": "<accessToken>"
      }
    ```
  - Notes:
    - Handle juga error untuk input tidak valid (email/password tidak diisi atau salah).

### Songs


- **Song list and Search** (10 points)
  - URL:
    - `GET /songs`
  - Header(s):
    - `Access-Token`: `String`
  - Expected response (status: `200`):
    ```json
      [
        {
          "_id": "...",
          "artist": "...",
          "title": "..."
        }
      ]
    ```
  - Notes:
    - Handle error untuk header tidak valid seperti `Invalid access token` (status: `400`).
    - Saat menampilkan data di `client`, tampilkan **title**-nya saja!
    - Membuat fitur search harus mengimplementasikan `emit`/`props` (Lihat gambar referensi)

- **Get song by ID** (15 points)
  - URL:
    - `GET /songs/:id`
  - Header(s):
    - `Access-Token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "_id": "...",
        "artist": "...",
        "title": "..."
      }
    ```
  - Notes:
    - Handle error untuk header tidak valid seperti `Invalid access token` (status: `400`).
    - Handle error untuk status `404` ketika ID yang dicari tidak ada.
    - Gunakan endpoint ini untuk menampilkan detail di `client`.
    - Tampilkan semua key yang dimiliki oleh `Song` di `client`.

- **Create a song** (15 points)
  - URL:
    - `POST /songs`
  - Header(s):
    - `Access-Token`: `String`
  - Body:
    - `artist`: `String`, required
    - `title`: `String`, required
  - Expected response (status: `201`):
    ```json
      {
        "_id": "...",
        "artist": "...",
        "title": "...",
        "lyrics": "..."
      }
    ```

- **Delete a song** (15 points)
  - URL:
    - `DELETE /songs/:id`
  - Header(s):
    - `Access-Token`: `String`
  - Expected response (status: `200`):
    ```json
      {
        "_id": "<DeletedId>",
      }
    ```
  - Notes:
    - Handle error untuk header tidak valid seperti `Invalid access token` (status: `400`).
    - Handle error untuk status `404` ketika ID yang dicari tidak ada.
    - Tampilan di `client` harus langsung ter-update ketika data berhasil dihapus (data hilang) dan tidak boleh *refresh*/*reload*.

- **Update a song** (20 points) 🚀
  - URL:
    - `PUT /songs/:id`
  - Header(s):
    - `Access-Token`: `String`
  - Body:
    - `artist`: `String`, required
    - `title`: `String`, required
  - Expected response (status: `200`):
    ```json
      {
        "_id": "...",
        "artist": "...",
        "title": "...",
        "lyrics": "..."
      }
    ```