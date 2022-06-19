//変数の初期化
let untyped = '';
let typed = '';
let score = 0;

//必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap');
const start = document.getElementById('start');
const count = document.getElementById('count');

//複数のテキストを格納する配列
const textLists = [
   'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
    ];

//ランダムなテキストを表示
const createText = () => {
    //正タイプした文字列をクリア
    typed = '';
    typedfield.textContent = typed;
    //配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);
    untyped = textLists[random];
    untypedfield.textContent = untyped;
};


//キー入力の判定
 const keyPress = e => {
     //誤タイプの場合
     if(e.key !== untyped.substring(0,1)){
         wrap.classList.add('mistyped');
         //100ms後に赤背景を消す
         setTimeout(()=>{
             wrap.classList.remove('mistyped');
         },100);
         
         return;
     }
     
     //正タイプの場合
     //スコアのインクリメント
     score++;
     wrap.classList.remove('mistyped');
     typed += untyped.substring(0,1);
     untyped = untyped.substring(1);
     typedfield.textContent = typed;
     untypedfield.textContent = untyped;
     
     //テキストがなくなったら新しいテキストを表示
     if(untyped === ''){
         createText();
     }
 };

//タイピングスキルのランクを判定
const rankCheck = score => {
    let text = '';
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100-score}文字です。`;
        }else if(score <200 ){
            text = `あなたのランクはです。\nランクまであと${score}文字です。`
        }else if(score <300 ){
            text = `あなたのランクはです。\nランクまであと${score}文字です。`
        }else if(score >=300 ){
            text = `あなたのランクはです。\nランクまであと${score}文字です。`
        }
        return `${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
    };

//ゲーム終了
const gameOver = id => {
    clearInterval(id);
    const result = confirm(rankCheck(score));
    if (result == true){window.location.reload()};
};

//カウントダウンタイマー
const timer = () => {
    let time = 60;
    
    const id = setInterval(() => {
        if(time<=0){
            gameOver(id);
        }
    count.textContent = time--;
    },1000);
};

//ゲームスタート時の処理
start.addEventListener('click',()=>{
    timer();
    createText();
    //キーボードの処理
    document.addEventListener('keypress', keyPress);
    //スタートボタンを非表示にする
    start.style.display = 'none';
});

//スタートしていないときの画面
untypedfield.textContent = 'スタートボタンで開始';