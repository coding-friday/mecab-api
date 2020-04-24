const express = require('express');
const app = express();

const PORT = process.env.PORT;

const MeCab = new require('mecab-async');
const mecab = new MeCab();
mecab.command = `mecab -d ${process.env.DICT_DIR}`;

app.get('/health-check', (req, res) => {
  res.sendStatus(200);
});

app.get('/', (req, res) => {
  const { text } = req.query;
  if (text) {
    mecab.parse(text, (err, result) => {
      if (err) throw err;
      const outputs = result.map((morph) => {
        const [
          surface,
          feature1,
          feature2,
          feature3,
          feature4,
          inflection1,
          inflection2,
          baseform,
          read,
          pronounciation,
        ] = morph;
        return {
          surface,
          feature1,
          feature2,
          feature3,
          feature4,
          inflection1,
          inflection2,
          baseform,
          read,
          pronounciation,
        };
      });
      res.json({ outputs });
    });
  } else {
    res.sendStatus(404);
  }
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
