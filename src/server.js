const express = require('express');
const app = express();

const PORT = process.env.PORT;

const MeCab = new require('mecab-async');
const mecab = new MeCab();
mecab.command = `mecab -d ${process.env.DICT_DIR}`;

app.get('/', (req, res) => {
  const { word } = req.query;
  mecab.parse(word, (err, result) => {
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
    res.send({ outputs });
  });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
