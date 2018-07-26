
_arr = [];
_body = $('.mv');
_cnt = 0;
_angle = 0;

// 初期設定
init();
function init() {
  update();
}

// 毎フレーム実行
window.requestAnimationFrame(update);
function update() {

  if(++_cnt % 8 == 0) {
    addItem();

    if(_arr.length >= 500) {
      disposeItems();
    }
  }

  window.requestAnimationFrame(update);
}


function addItem() {

  var sw = window.innerWidth;
  var sh = window.innerHeight;

  var key = _arr.length;

  _body.append('<div class="item" id="item' + key + '""><div class="inner"></div></div>');
  var item = $('#item' + key);

  var w = random(sw * 0.01, sw * 0.05) * 1.5;
  // var w = sw * 0.1;


  var h = random(sh * 0.1, sh * 0.8);

  if(hit(10)) {
    w *= 10;
    h *= 0.5;
  }

  w *= 0.1;
  h *= 0.1;

  var angle = 90 + range(60);
  // _angle += Math.abs(range(20));
  // var angle = 90 + _angle;

  // var color = chroma.mix(0xf1bd67, 0xcd7a66, map(angle, 0, 1, 50, 130)).css();
  var color = chroma.random().css();

  TweenMax.set(item.find('.inner'), {
    width:w,
    height:h * 1.1,
    top:-h * 1,
    left:-w * 0.5,
    backgroundColor:color
  })

  var prev = _arr[key - 1];
  var x = 0;
  var y = 0;
  var offsetX = x;
  var offsetY = y;
  if(prev != null) {
    var r = prev.height;
    if(prev.angle < 0) {
      x = prev.x + r * Math.cos(radian(prev.angle));
    } else {
      x = prev.x - r * Math.cos(radian(prev.angle));
    }
    y = prev.y - Math.abs(r * Math.sin(radian(prev.angle)));
    offsetX = x;
    // offsetY -= Math.abs(r * Math.sin(radian(prev.angle))) * 0.5;
  } else {
    x = range(window.innerWidth * 0.3);
    y = range(window.innerHeight * 0.3);
  }

  TweenMax.set(item, {
    rotationZ:(angle - 90) + 'deg',
    x:x,
    y:y
  })

  TweenMax.set(_body, {
    x:window.innerWidth * 0.5 - offsetX,
    y:window.innerHeight * 0.5 - y + h - sh * 0.3
  })

  _arr.push({
    item:item,
    x:x,
    y:y,
    angle:angle,
    width:w,
    height:h
  });

}


function disposeItems() {

  _body.empty();
  _arr.length = 0;
  _angle = 0;

}





// ########################################
// ユーティリティ系 ↓
// ########################################

// ----------------------------------------
// minからmaxまでランダム
// ----------------------------------------
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// ----------------------------------------
// minからmaxまでランダム int
// ----------------------------------------
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ----------------------------------------
// minからmaxまでランダム 半分の確率で-をつける
// ----------------------------------------
function random2(min, max) {
  var val = Math.random() * (max - min) + min;
  if(Math.random() > 0.5) {
    val *= -1;
  }
  return val;
}

// ----------------------------------------
// -valからvalまでランダム
// ----------------------------------------
function range(val) {
  return random(-val, val);
}

// ----------------------------------------
// 配列の中ランダム
// ----------------------------------------
function randomArr(arr) {
  return arr[randomInt(0, arr.length - 1)]
}

// 1 / rangeの確率でtrueを取得
// -----------------------------------
// @range : 2以上の分母(int)
// return : true or false(boolean)
// -----------------------------------
function hit(range) {
  return (randomInt(0, range - 1) == 0)
}

// ----------------------------------------
// 度からラジアンに変換
// @val : 度
// ----------------------------------------
function radian(val) {
  return val * Math.PI / 180;
}

// ----------------------------------------
// ラジアンから度に変換
// @val : ラジアン
// ----------------------------------------
function degree(val) {
  return val * 180 / Math.PI;
}


// ----------------------------------------
// 範囲変換
// @val     : 変換したい値
// @toMin   : 変換後の最小値
// @toMax   : 変換後の最大値
// @fromMin : 変換前の最小値
// @fromMax : 変換前の最大値
// ----------------------------------------
function map(val, toMin, toMax, fromMin, fromMax) {
  if(val <= fromMin) {
    return toMin;
  }
  if(val >= fromMax) {
    return toMax;
  }
  p = (toMax - toMin) / (fromMax - fromMin);
  return ((val - fromMin) * p) + toMin;
}
