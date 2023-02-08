'use strict';
const userNameInput = document.getElementById('user-name');
const assessmentButton = document.getElementById('assessment');
const resultDivided = document.getElementById('result-area');
const tweetDivided = document.getElementById('tweet-area');

userNameInput.onkeydown = event => {
    if (event.key === 'Enter') {
      assessmentButton.onclick();
    }
  };

assessmentButton.onclick = () => {
  const userName = userNameInput.value;
  if (userName.length === 0) {
    return;
  }
  

  // 診断結果表示エリアの作成
  resultDivided.innerText = "";
  const header = document.createElement('h3');
  header.innerText = '診断結果';
  resultDivided.appendChild(header);

  const paragraph = document.createElement('p');
  const result = assessment(userName);
  paragraph.innerText = result;
  resultDivided.appendChild(paragraph);

// ツイートエリアの作成
tweetDivided.innerText = "";
const anchor = document.createElement('a');
const hrefValue =
  'https://twitter.com/intent/tweet?button_hashtag=' +
  encodeURIComponent('あなたの推しになるデビュー死キャラ') +
  '&ref_src=twsrc%5Etfw';
anchor.setAttribute('href', hrefValue);
anchor.className = 'twitter-hashtag-button';
anchor.setAttribute('data-text', result);
anchor.innerText = 'Tweet #あなたの推しになるデビュー死キャラ';
tweetDivided.appendChild(anchor);

// widgets.js の設定
const script = document.createElement('script');
script.setAttribute('src', 'https://platform.twitter.com/widgets.js');
tweetDivided.appendChild(script);

};

const answers = [
    '{userName}の推しはパク・ムンデです。{userName}の冷静に見えて実は他人にはかわいく見えるところがムンデと似ています。',
    '{userName}の推しはベク・セジンです。{userName}の正義に従い、いつもこの世を良い方向に変化させようと努力し集中するところがセジンと似ています。',
    '{userName}の推しはリュ・チョンウです。{userName}の平正心を維持し、現在の目標だけを見てみんなを導く姿がチョンウに似ています。',
    '{userName}の推しはソン・アヒョンです。{userName}の高潔な心で、根性を持ち、他人のせいにしない姿がアヒョンに似ています。',
    '{userName}の推しはイ・セジンです。{userName}の陽キャ的ふるまいと、現状に満足せず推進力をもって物事を進めさせるところがセジンに似ています。。',
    '{userName}の推しはチャ・ユジンです。{userName}の自由で自信ありげな姿とブラックホールの如く周りの注目を集める姿がユジンに似ています。」。',
    '{userName}の推しはキム・レビンです。{userName}の小さなきっかけからインスピレーションを得て作品を作り出す姿がレビンに似ています。',
];

/**
 * 名前の文字列を渡すと診断結果を返す関数
 * @param {string} userName ユーザーの名前
 * @return {string} 診断結果
 */
function assessment(userName) {
  // 全文字のコード番号を取得してそれを足し合わせる
  let sumOfCharCode = 0;
  for (let i = 0; i < userName.length; i++) {
    sumOfCharCode = sumOfCharCode + userName.charCodeAt(i);
  }

  // 文字のコード番号の合計を回答の数で割って添字の数値を求める
  const index = sumOfCharCode % answers.length;
  let result = answers[index];

  result = result.replaceAll('{userName}', userName);
  return result;
  }
  