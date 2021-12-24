// check if assistance is onxw
auto.waitFor();
sleep(1000);

//set screen matrix
setScreenMetrics(1080, 2160);

//Auto start app
// var startAppNama = '明日方舟';
// launchApp(startAppNama);
// sleep(1000);

//变量初始化

//width=259, height=53
var blueStartPath = '/storage/emulated/0/Pictures/Screenshots/blueStart.jpg';
// 287 * 62
var blueStartPathTwo =
  '/storage/emulated/0/Pictures/Screenshots/blueStartTwo.jpg';

// 218 x 84
var failContinuePath =
  '/storage/emulated/0/Pictures/Screenshots/failContinue.jpg';

// 267 x 73
var purchaseTickPath =
  '/storage/emulated/0/Pictures/Screenshots/purchaseTick.jpg';

// 174 x 367
var redStartPath = '/storage/emulated/0/Pictures/Screenshots/redStart.jpg';

// 207 x 83
var battlePath = '/storage/emulated/0/Pictures/Screenshots/battle.jpg';

// 309 x 95
var battleEndPath = '/storage/emulated/0/Pictures/Screenshots/battleEnd.jpg';

// 226 * 82
var levelUpPath = '/storage/emulated/0/Pictures/Screenshots/levelUp.jpg';

// 每日更新图片
// 922 * 427
var updateConfirmPath =
  '/storage/emulated/0/Pictures/Screenshots/updateConfirm.jpg';
// 104 * 92
var confirmCloseOnePath =
  '/storage/emulated/0/Pictures/Screenshots/confirmCloseOne.jpg';
// 96 * 90
var confirmCloseTwoPath =
  '/storage/emulated/0/Pictures/Screenshots/confirmCloseTwo.jpg';
// 585 * 289
var supplyPath = '/storage/emulated/0/Pictures/Screenshots/supply.jpg';
// 234 * 131
var startPath = '/storage/emulated/0/Pictures/Screenshots/start.jpg';
// 158 * 46
var lastBattlePath = '/storage/emulated/0/Pictures/Screenshots/lastBattle.jpg';
// 298 * 88
var checkAutoPath = '/storage/emulated/0/Pictures/Screenshots/checkAuto.jpg';

var floatWidth = 430;
var floatHeight = 220;
var floatStatus = 1;

var totalLoop = 1;

var loopThread;

var deviceHeight = device.height;
var deviceWidth = device.width;
var curr_time = new Date();
var now_D = curr_time.getDay();
log(
  '\n设备宽：' +
    deviceWidth +
    '\n' +
    '设备高：' +
    deviceHeight +
    '\n' +
    '手机型号：' +
    device.model +
    '\n安卓版本：' +
    device.release
);

// ask for permissions
if (!requestScreenCapture()) {
  toast('请求截图失败');
  exit();
} else {
  toast('请求截图成功');
}

// var imgScreen = captureScreen(); //请求截取当前屏幕
// var logOcr = Baidu_ocr(imgScreen);
// log(logOcr);
// var wordResult = logOcr.words_result;
// var count = 0;
// wordResult.forEach((element) => {
//   count++;
//   log(count + ':' + element.words);
// });
//调用百度文字识别ocr得到当前手机截屏文字
// function Baidu_ocr(imgFile) {
//   log('调用百度ocr开始识图');
//   //var imag64 = images.toBase64(imgFile);//转换截屏图片
//   var imag64 = images.toBase64(imgFile, 'png', 100); //转换截屏图片
//   //log(imag64.string());
//   //该APIKey和Secret为"ALLEN"所有
//   var API_Key = 'SaCHDcXjC2B8UbGyEF7xUKX5';
//   var Secret_Key = 'qXnrNihfE8HiHzXNgExrQ3whc0zgAOiy';
//   //access_token获取地址。
//   var getTokenUrl = 'https://aip.baidubce.com/oauth/2.0/token';
//   var token_Res = http.post(getTokenUrl, {
//     grant_type: 'client_credentials',
//     client_id: API_Key,
//     client_secret: Secret_Key,
//   });
//   var access_token = token_Res.body.json().access_token;
//   //通用文字识别，50000次/天免费
//   var ocrUrl = 'https://aip.baidubce.com/rest/2.0/ocr/v1/accurate_basic';
//   var ocr_Res = http.post(ocrUrl, {
//     headers: {
//       'Content - Type': 'application/x-www-form-urlencoded',
//     },
//     access_token: access_token,
//     image: imag64,
//     language_type: 'CHN_ENG',
//   });
//   var json = ocr_Res.body.json();
//   //log(json);
//   return json;
// }

// var imgReadPath = images.read(blueStartPath);
// findImage = images.findImage(captureScreen(), imgReadPath, { threshold: 0.7 });
// imgReadPath.recycle();
// 开始行动 位置：{1824.0, 956.0}

var showFloatThread = threads.start(function () {
  showFloat();
});
showFloatThread.waitFor();

function showFloat() {
  //float header UI
  floatHeader = floaty.rawWindow(
    <horizontal
      bg='#000000'
      alpha='0.65'
      gravity='center_horizontal|center_vertical'
    >
      <text
        id='header'
        w='385'
        text='当前没有操作'
        textSize='14sp'
        textColor='#ffffff'
        gravity='center_horizontal|center_vertical'
      />
    </horizontal>
  );
  floatHeader.setTouchable(true);
  floatHeader.setPosition(0, 180);
  floatHeader.setSize(floatWidth, 60);

  floatHeader.header.click(() => {
    setFloatStatus((floatStatus + 1) % 2);
  });

  //float body UI
  floatyBody = floaty.rawWindow(
    <vertical
      gravity='center_horizontal|center_vertical'
      bg='#696969'
      alpha='0.75'
    >
      {/* <horizontal gravity='center_horizontal|center_vertical'>
        <text
          id='loopTitle'
          w='70'
          h='35'
          text='循环次数: '
          textSize='14sp'
          textColor='#ffffff'
          gravity='center_horizontal|center_vertical'
        />
        <text
          id='loopNum'
          w='50'
          h='35'
          text={totalLoop}
          textSize='14sp'
          textColor='#ffffff'
          gravity='center_horizontal|center_vertical'
        />
      </horizontal> */}
      <horizontal gravity='center_horizontal|center_vertical'>
        <vertical gravity='center_horizontal|center_vertical' w='78'>
          <button
            id='startBtn'
            h='35'
            text='START'
            textSize='13sp'
            gravity='center_horizontal|center_vertical'
          />
        </vertical>
        <vertical gravity='center_horizontal|center_vertical' w='78'>
          <button
            id='stopBtn'
            h='35'
            text='STOP'
            textSize='13sp'
            gravity='center_horizontal|center_vertical'
          />
        </vertical>
      </horizontal>
    </vertical>
  );
  floatyBody.setTouchable(true);
  floatyBody.setPosition(0, floatHeader.getY() + 60);
  floatyBody.setSize(floatWidth, floatHeight);

  //float stops when thread stops without this
  setInterval(() => {}, 2000);
  // while (true) {}

  floatyBody.startBtn.click(() => {
    handleStartBtn();
  });

  floatyBody.stopBtn.click(() => {
    handleStopBtn();
  });
}

function setFloatStatus(status) {
  // Hide: 0
  // Show: 1
  floatStatus = status;
  floatyBody.setSize(status * floatWidth, floatHeight);
}

function handleStartBtn() {
  // start new thread to loop
  threads.start(function () {
    startLoop();
  });
}

function startLoop() {
  setFloatStatus(0);
  // var currentLoop = totalLoop;

  loopThread = threads.start(function () {
    startBattle();
  });
  loopThread.waitFor();

  // setInterval(() => {
  //   //如果500秒不变数字 重置thread
  //   if (currentLoop === totalLoop) {
  //     battleThread.interrupt();

  //     battleThread = threads.start(function () {
  //       startBattle();
  //     });
  //   }
  // }, 50000);
}

function startBattle() {
  while (true) {
    sleep(300);

    floatHeader.header.setText('检查开始行动');
    var blueStart = images.read(blueStartPath);
    var blueStartMatched = images.findImage(captureScreen(), blueStart, {
      threshold: 0.75,
    });
    var blueStartTwo = images.read(blueStartPathTwo);
    var blueStartTwoMatched = images.findImage(captureScreen(), blueStartTwo, {
      threshold: 0.75,
    });
    blueStart.recycle();
    blueStartTwo.recycle();
    sleep(300);
    if (blueStartMatched) {
      sleep(300);
      // 开始行动 位置：{1824.0, 956.0}
      click(
        blueStartMatched.x + random(20, 100),
        blueStartMatched.y + random(20, 40)
      );
      sleep(1000);
    }
    if (blueStartTwoMatched) {
      sleep(300);
      // 开始行动 位置：{1824.0, 956.0}
      click(
        blueStartTwoMatched.x + random(20, 100),
        blueStartTwoMatched.y + random(20, 40)
      );
      sleep(1000);
    }

    floatHeader.header.setText('检查理智');
    var purchaseTick = images.read(purchaseTickPath);
    var purchaseTickMatched = images.findImage(captureScreen(), purchaseTick, {
      threshold: 0.75,
    });
    purchaseTick.recycle();
    sleep(500);
    if (purchaseTickMatched) {
      click(
        purchaseTickMatched.x + random(55, 125),
        purchaseTickMatched.y + random(10, 30)
      );
      sleep(2000);

      floatHeader.header.setText('再次检查开始行动');
      var blueStart = images.read(blueStartPath);
      var blueStartMatched = images.findImage(captureScreen(), blueStart, {
        threshold: 0.75,
      });
      blueStart.recycle();
      sleep(300);
      if (blueStartMatched) {
        sleep(300);
        // 开始行动 位置：{1824.0, 956.0}
        click(
          blueStartMatched.x + random(20, 100),
          blueStartMatched.y + random(20, 40)
        );
        sleep(1000);
      }

      var blueStartTwo = images.read(blueStartPathTwo);
      var blueStartTwoMatched = images.findImage(
        captureScreen(),
        blueStartTwo,
        {
          threshold: 0.75,
        }
      );
      blueStartTwo.recycle();
      sleep(300);
      if (blueStartTwoMatched) {
        sleep(300);
        // 开始行动 位置：{1824.0, 956.0}
        click(
          blueStartTwoMatched.x + random(20, 100),
          blueStartTwoMatched.y + random(20, 40)
        );
        sleep(1000);
      }
    }

    floatHeader.header.setText('检查红色行动');
    sleep(500);
    var redStartTick = images.read(redStartPath);
    var redStartTickMatched = images.findImage(captureScreen(), redStartTick, {
      threshold: 0.75,
    });
    redStartTick.recycle();
    sleep(300);
    if (redStartTickMatched) {
      click(
        redStartTickMatched.x + random(55, 125),
        redStartTickMatched.y + random(10, 30)
      );
      sleep(500);

      floatHeader.header.setText('当前第 ' + totalLoop.toString() + ' 次代理');
    }

    var updateConfirm = images.read(updateConfirmPath);
    var updateConfirmMatched = images.findImage(
      captureScreen(),
      updateConfirm,
      {
        threshold: 0.75,
      }
    );
    updateConfirm.recycle();
    sleep(1000);
    if (updateConfirmMatched) {
      floatHeader.header.setText('检测到需要更新');
      click(
        updateConfirmMatched.x + random(400, 500),
        updateConfirmMatched.y + random(385, 420)
      );
      sleep(1000);

      var confirmCloseOne = images.read(confirmCloseOnePath);
      var confirmCloseOneMatched = images.findImage(
        captureScreen(),
        confirmCloseOne,
        {
          threshold: 0.65,
        }
      );
      confirmCloseOne.recycle();
      if (confirmCloseOneMatched) {
        floatHeader.header.setText('更新中');
        click(
          updateConfirmMatched.x + random(50, 70),
          updateConfirmMatched.y + random(50, 60)
        );
        sleep(1000);
      }

      var confirmCloseTwo = images.read(confirmCloseTwoPath);
      var confirmCloseTwoMatched = images.findImage(
        captureScreen(),
        confirmCloseTwo,
        {
          threshold: 0.65,
        }
      );
      confirmCloseTwo.recycle();
      if (confirmCloseTwoMatched) {
        floatHeader.header.setText('更新中');
        click(
          updateConfirmMatched.x + random(50, 60),
          updateConfirmMatched.y + random(50, 60)
        );
        sleep(1000);
      }

      var supply = images.read(supplyPath);
      var supplyMatched = images.findImage(captureScreen(), supply, {
        threshold: 0.65,
      });
      supply.recycle();
      if (supplyMatched) {
        floatHeader.header.setText('更新中');
        click(
          updateConfirmMatched.x + random(250, 350),
          updateConfirmMatched.y + random(130, 170)
        );
        sleep(1000);
      }

      var start = images.read(startPath);
      var startMatched = images.findImage(captureScreen(), start, {
        threshold: 0.75,
      });
      start.recycle();
      if (startMatched) {
        floatHeader.header.setText('更新中');
        click(
          updateConfirmMatched.x + random(100, 150),
          updateConfirmMatched.y + random(65, 85)
        );
        sleep(1000);
      }

      var lastBattle = images.read(lastBattlePath);
      var lastBattleMatched = images.findImage(captureScreen(), lastBattle, {
        threshold: 0.7,
      });
      lastBattle.recycle();
      if (lastBattleMatched) {
        floatHeader.header.setText('更新后');
        click(
          updateConfirmMatched.x + random(60, 80),
          updateConfirmMatched.y + random(20, 30)
        );
        sleep(1000);
      }

      var checkAuto = images.read(checkAutoPath);
      var checkAutoMatched = images.findImage(captureScreen(), checkAuto, {
        threshold: 0.75,
      });
      checkAuto.recycle();
      if (checkAutoMatched) {
        floatHeader.header.setText('选择代理');
        click(
          updateConfirmMatched.x + random(120, 200),
          updateConfirmMatched.y + random(40, 60)
        );
        sleep(1000);
      }
    }

    sleep(10000);

    //检查是否在战斗中
    while (true) {
      var battle = images.read(battlePath);
      var battleMatched = images.findImage(captureScreen(), battle, {
        threshold: 0.75,
      });
      battle.recycle();
      sleep(500);
      if (battleMatched) {
        floatHeader.header.setText('战斗中');
        sleep(3000);
        continue;
      }

      //TODO 处理 战斗 托管 异常

      sleep(3000);

      var levelUp = images.read(levelUpPath);
      var levelUpMatched = images.findImage(captureScreen(), levelUp, {
        threshold: 0.65,
      });
      levelUp.recycle();
      sleep(200);
      if (levelUpMatched) {
        floatHeader.header.setText('升级中');
        click(
          levelUpMatched.x + random(55, 125),
          levelUpMatched.y + random(20, 50)
        );
        sleep(2000);
      }

      var battleFail = images.read(failContinuePath);
      var battleFailMatched = images.findImage(captureScreen(), battleFail, {
        threshold: 0.7,
      });
      battleFail.recycle();
      sleep(200);
      if (battleFailMatched) {
        floatHeader.header.setText('战斗失误选择继续结算');
        click(
          battleFailMatched.x + random(55, 125),
          battleFailMatched.y + random(20, 50)
        );
        sleep(2000);
      }

      var battleEnd = images.read(battleEndPath);
      var battleEndMatched = images.findImage(captureScreen(), battleEnd, {
        threshold: 0.75,
      });
      battleEnd.recycle();
      sleep(500);
      if (battleEndMatched) {
        floatHeader.header.setText('战斗结算页面');
        click(
          battleEndMatched.x + random(55, 125),
          battleEndMatched.y + random(20, 70)
        );
        sleep(2000);
      }

      if (!battleMatched && !battleEndMatched) {
        sleep(1000);
        totalLoop++;
        break;
      }
    }
  }
}

function handleStopBtn() {
  endLoop();
}

function endLoop() {
  floatHeader.header.setText('已停止');

  if (loopThread !== null) {
    loopThread.interrupt();
  }
}
