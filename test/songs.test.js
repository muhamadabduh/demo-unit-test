/**
 * @author Dimitri Wahyudiputra <dimitri.wahyudiputra@gmail.com>
 * @description Song endpoints tests (Create, Read, Update and Delete)
 */

const chai = require("chai");
const chaiHttp = require("chai-http");

const expect = chai.expect;

// Uncomment this line if you've created app.js
const app = require("../app");
const clearSongsCollection = require("../helpers/clearSongsCollection");
const clearUsersCollection = require("../helpers/clearUsersCollection");

chai.use(chaiHttp);

// Global access token for testing
let accessToken;

// Global song id for testing Update functionality
let songId;

describe('Song endpoints tests', function () {
  before(async function () {
    await clearSongsCollection();

    const user = { email: 'dimitri@mail.com', password: 'secret' };

    await chai
            .request(app)
            .post('/register')
            .send(user);

    const response = await chai
                            .request(app)
                            .post('/login')
                            .send(user);

    accessToken = response.body.accessToken;
  });

  after(async function () {
    await clearSongsCollection();
    await clearUsersCollection();
  });

  describe('GET /songs', function () {
    it('should send an array and a 200 status code', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs")
                              .set('Access-Token', accessToken)

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
    });

    it('should send an error object with a message and a 400 status code (no token)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs")

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
    });

    it('should send an error object with a message and a 400 status code (invalid token)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs")
                              .set('Access-Token', 'dimitri')

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Invalid access token');
    });
  });

  describe('POST /songs', function () {
    it('should send a newly created song with lyrics and a 201 status code', async function () {
      this.timeout(5000);

      const correctLyrics = "Go!\r\nStapled shut, inside an outside world and I'm\r\n\nSealed in tight, bizarre but right at home\r\nClaustrophobic, closing in and I'm\r\nCatastrophic, not again\n\nI'm smeared across the page, and doused in gasoline\n\nI wear you like a stain, yet I'm the one who's obscene\n\nCatch me up on all your sordid little insurrections,\n\nI've got no time to lose, and I'm just caught up in all the cattle\n\n\n\nFray the strings\n\nThrow the shapes\n\nHold your breath\n\nListen!\n\n\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBefore I forget that\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBefore I forget that\n\n\n\nI'm ripped across the ditch, and settled in the dirt and I'm\n\nI wear you like a stitch, yet I'm the one who's hurt\n\nPay attention to your twisted little indiscretions\n\nI've got no right to win, I'm just caught up in all the battles\n\n\n\nLocked in clutch\n\nPushed in place\n\nHold your breath\n\nListen!\n\n\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBefore I forget that\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBefore I forget that\n\n\n\nMy end\n\nIt justifies my means\n\nAll I ever do is delay\n\nMy every attempt to evade\n\nThe end of the road and my end\n\nIt justifies my means\n\nAll I ever do is delay\n\nMy every attempt to evade\n\nTHE END OF THE ROAD!\n\n\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBEFORE I FORGET THAT!\n\n\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBEFORE I FORGET THAT!\n\n\n\nI am a world before I am a man\n\nI was a creature before I could stand\n\nI will remember before I forget\n\nBEFORE I FORGET THAT!\n\n\n\nYeah, yeah, yeah, yeah\n\nYeah, yeah, yeah, OH!";

      const song = { artist: 'Slipknot', title: 'Before I Forget' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(201);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('artist');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('lyrics');
      expect(response.body.artist).to.equal(song.artist);
      expect(response.body.title).to.equal(song.title);
      expect(response.body.lyrics).to.equal(correctLyrics);

      songId = response.body._id;
    });

    it("should send an error object with a message and a 400 status code (no token)", async function () {
      const song = { artist: 'Slipknot', title: 'Before I Forget' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
    });

    it('should send an error object with a message and a 400 status code (invalid token)', async function () {
      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', 'dimitri')

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Invalid access token');
    });

    it('should send an error object with a message and a 400 status code (no title key)', async function () {
      const song = { artist: 'Slipknot' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('title');
      expect(response.body.errors.title.message).to.equal('Title is required');
    });

    it("should send an error object with a message and a 400 status code (title === '')", async function () {
      const song = { title: '', arist: 'Slipknot' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('title');
      expect(response.body.errors.title.message).to.equal('Title is required');
    });

    it("should send an error object with a message and a 400 status code (no artist key)", async function () {
      const song = { title: 'Before I Forget' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (artist === '')", async function () {
      const song = { title: 'Before I Forget', artist: '' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (no title and artist keys)", async function () {
      const song = {};

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("title");
      expect(response.body.errors.title.message).to.equal("Title is required");
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (title === '' and artist === '')", async function () {
      const song = { title: '', artist: '' };

      const response = await chai
                              .request(app)
                              .post("/songs")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("title");
      expect(response.body.errors.title.message).to.equal("Title is required");
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });
  });

  describe('GET /songs/:id', function () {
    it('should send an object and a 200 status code', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs/" + songId)
                              .set('Access-Token', accessToken)

      expect(response).to.have.status(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('title');
      expect(response.body).to.have.property('artist');
      expect(response.body).to.have.property('lyrics');
    });

    it('should send an error object with a message and a 400 status code (no token)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs/" + songId)

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
    });

    it('should send an error object with a message and a 400 status code (invalid token)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs/" + songId)
                              .set('Access-Token', 'dimitri')

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Invalid access token');
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs/5bea58362e5fcc6dae24a3f1")
                              .set('Access-Token', accessToken);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const response = await chai
                              .request(app)
                              .get("/songs/foobar")
                              .set('Access-Token', accessToken);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });
  });

  describe('PUT /songs', function () {
    it('should send an updated song with lyrics and a 200 status code', async function () {
      this.timeout(5000);

      const correctLyrics = "(Oh Yea) I did my time, and I want out\r\nSo effusive\r\nFade\r\n\nIt doesn't cut,\r\nThe soul is not so vibrant\r\nThe reckoning, the sickening\n\nPackaging subversion\n\nPseudo-sacrosanct perversion\n\nGo drill your deserts,\n\nGo dig your graves\n\nThen fill your mouth\n\nWith all the money you will save\n\nSinking in, getting smaller again\n\nIm done, it has begun\n\nI'm not the only one\n\n\n\nAnd the rain will kill us all,\n\nThrow ourselves against the wall\n\nBut no one else can see,\n\nThe preservation of the martyr in me\n\n\n\nPsychosocial, psychosocial, psychosocial\n\nPsychosocial, psychosocial, psychosocial\n\n\n\nOh, there are cracks, in the road we laid\n\nBut where the temple fell,\n\nThe secrets have gone mad!\n\nThis is nothing new,\n\nBut when we kill it all,\n\nThe hate was all we had!\n\nWho needs another mess?\n\nWe could start over!\n\nJust look me in the eyes\n\nAnd say I'm wrong\n\nNow there's only emptiness...\n\nVenomous, insipid!\n\nI think we're done\n\nI'm not the only one!\n\n\n\nAnd the rain will kill us all,\n\nThrow ourselves against the wall\n\nBut no one else can see,\n\nThe preservation of the martyr in me\n\n\n\nPsychosocial, psychosocial, psychosocial\n\nPsychosocial, psychosocial, psychosocial\n\n\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!\n\n\n\nFake Anti-Fascist Lie,\n\n(Psychosocial),\n\nI tried to tell you,\n\n(Psychosocial),\n\nBut your purple hearts are giving out,\n\n(Psychosocial),\n\nCan't stop the killing idea,\n\n(Psychosocial),\n\nIf it's hunting season,\n\n(Psychosocial),\n\nIs this what you want?,\n\n(Psychosocial),\n\nI'm not the only one!\n\n\n\nAnd the rain will kill us all,\n\nThrow ourselves against the wall\n\nBut no one else can see,\n\nThe preservation of the martyr in me\n\n\n\nAnd the rain will kill us all,\n\nThrow ourselves against the wall\n\nBut no one else can see,\n\nThe preservation of the martyr in me.\n\n\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!\n\nTHE LIMITS OF THE DEAD!";

      const song = { title: "Psychosocial", artist: "Slipknot" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('_id');
      expect(response.body).to.have.property('artist');
      expect(response.body).to.have.property('title');
      expect(response.body.artist).to.equal(song.artist);
      expect(response.body.title).to.equal(song.title);
    });

    it("should send an error object with a message and a 400 status code (no token)", async function () {
      const song = { artist: 'Foo', title: 'Bar' };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Please provide your access token');
    });

    it('should send an error object with a message and a 400 status code (invalid token)', async function () {
      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', 'dimitri')

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Invalid access token');
    });

    it('should send an error object with a message and a 400 status code (no title key)', async function () {
      const song = { artist: "Foo" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('title');
      expect(response.body.errors.title.message).to.equal('Title is required');
    });

    it("should send an error object with a message and a 400 status code (title === '')", async function () {
      const song = { title: '', artist: "Foo" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('title');
      expect(response.body.errors.title.message).to.equal('Title is required');
    });

    it("should send an error object with a message and a 400 status code (no artist key)", async function () {
      const song = { title: "Bar" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (artist === '')", async function () {
      const song = { artist: '', title: "Bar" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (no title and artist keys)", async function () {
      const song = {};

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("title");
      expect(response.body.errors.title.message).to.equal("Title is required");
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it("should send an error object with a message and a 400 status code (title === '' and artist === '')", async function () {
      const song = { title: "", artist: "" };

      const response = await chai
                              .request(app)
                              .put("/songs/" + songId)
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("title");
      expect(response.body.errors.title.message).to.equal("Title is required");
      expect(response.body.errors).to.have.property('artist');
      expect(response.body.errors.artist.message).to.equal('Artist is required');
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const song = { title: "Foo", artist: "Bar" };

      const response = await chai
                              .request(app)
                              .put("/songs/5bea58362e5fcc6dae24a3f1")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const song = { title: "Foo", description: "Bar" };

      const response = await chai
                              .request(app)
                              .put("/songs/foobar")
                              .set('Access-Token', accessToken)
                              .send(song);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });
  });

  describe('DELETE /songs', function () {
    it('should send a deleted song and a 200 status code', async function () {
      const response = await chai
                              .request(app)
                              .delete("/songs/" + songId)
                              .set('Access-Token', accessToken);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("_id");
    });

    it('should send an error object with a message and a 400 status code (no token)', async function () {
      const response = await chai
                              .request(app)
                              .delete("/songs/" + songId);

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property("errors");
      expect(response.body.errors).to.have.property("token");
      expect(response.body.errors.token.message).to.equal("Please provide your access token");
    });

    it('should send an error object with a message and a 400 status code (invalid token)', async function () {
      const response = await chai
                              .request(app)
                              .delete("/songs/" + songId)
                              .set('Access-Token', 'dimitri');

      expect(response).to.have.status(400);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors');
      expect(response.body.errors).to.have.property('token');
      expect(response.body.errors.token.message).to.equal('Invalid access token');
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const response = await chai
                              .request(app)
                              .delete("/songs/5bea58362e5fcc6dae24a3f1")
                              .set('Access-Token', accessToken);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });

    it('should send an error object with a message and a 404 status code (song not found)', async function () {
      const response = await chai
                              .request(app)
                              .delete("/songs/foobar")
                              .set('Access-Token', accessToken);

      expect(response).to.have.status(404);
      expect(response.body).to.be.an("object");
      expect(response.body).to.have.property('errors')
      expect(response.body.errors).to.have.property("song");
      expect(response.body.errors.song.message).to.equal("Song not found");
    });
  });
});
