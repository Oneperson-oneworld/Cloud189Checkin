/* eslint-disable no-await-in-loop */
require("dotenv").config();
const log4js = require("log4js");
const recording = require("log4js/lib/appenders/recording");
log4js.configure({
  appenders: {
     录像机 : {
       类型 : "recording" ,
     } ,
     在外面 : {
       类型 : "console" ,
     } ,
   } ,
   类别 : {  违约 : {  附加物 : [ "vcr" , "out" ] , 水平的 : "info"  }  } ,
 } ) ;

 康斯特  伐木工人 = log4js. 盖特鲁格 ( ) ;
// process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'
 康斯特  超级代理人 = 要求 ( "superagent" ) ;
 康斯特  {  云客户  } = 要求 ( "cloud189-sdk" ) ;
 康斯特  塞弗查恩 = 要求 ( "./push/serverChan" ) ;
 康斯特  电报机器人 = 要求 ( "./push/telegramBot" ) ;
 康斯特  维康波特 = 要求 ( "./push/wecomBot" ) ;
 康斯特  Wx31- = 要求 ( "./push/wxPusher" ) ;
 康斯特  帐目 = 要求 ( "../accounts" ) ;

 康斯特  面具 = ( s , 开始 , 结束 ) => s. 分裂 ( "" ) . 使充满 ( "*" ,开始,结束 ) . 加入 ( "" ) ;

 康斯特  建设性的 = ( 重要的 , 结果 ) => {
   康斯特  索引 = result. 长度 ;
   如果  ( 特别报告员 错误代码 === "User_Not_Chance" )  {
    结果。    推动    (    `第 ${ 索引 } 次抽奖失败,次数不足`    ) ;
      }  其他的     {
    结果。 推动    (    `第 ${ 索引 } 次抽奖成功,抽奖获得 ${ 特别报告员 第一名 } `    ) ;
  }
    } ;

 康斯特  拖延 = (    小姐    ) => 新的 保证    (    (    分解    ) => 规定超时时间   ( 决议,会员国 )  ) ;

// 任务 1.签到 2.天天抽红包 3.自动备份抽红包
 康斯特  多塔克斯 = 同步的     ( 云客户 ) => {
   康斯特  结果 = [    ] ;
   康斯特  重新定位1 = 等待 云客户。 用户标志    (    ) ;
  结果。 推动    (
        ` ${ 决议1. 军旗 ? "已经签到过了，" : ""    } 签到获得 ${ 决议1. 网络奖金    } M空间`
      ) ;
   等待     拖延    (   5000  ) ; // 延迟5秒

   康斯特  重新设计2 = 等待 云客户。 任务符号   (   ) ;
     建设性的   (   2 ,结果 ) ;

   等待    拖延   (   5000   ) ; // 延迟5秒
   康斯特  雷斯3 = 等待 云客户。 任务图片   (   ) ;
     建设性的   (   3 ,结果 ) ;

   返回的 结果;
   } ;

 康斯特  家务劳动 = 同步的    ( 云客户) => {
   康斯特   {  家庭预测   } = 等待 云客户。 获得家庭名单者  (  ) ;
   康斯特  结果 = [  ] ;
    如果   ( 家庭预测 )   {
     为了  ( 出租  索引 = 0 索引;家庭预测。 长度 ; index += 1 )  {
       康斯特  {  家族的  } =家庭预测 [ 索引 ] ;
      等待云客。const 766819761 ;res = 等待 云客户。 家族符号 ( 766819761 )
      结果。 推动 (
         "家庭任务" +
           ` ${ 特别报告员 信号状态 ? "已经签到过了，" : "" } 签到获得 ${
            特别报告员 奖金空间
           } M空间`
      );
    }
  }
  return result;
};

const pushServerChan = (title, desp) => {
  if (!serverChan.sendKey) {
    return;
  }
  const data = {
    title,
    desp,
  };
  superagent
    .post(`https://sctapi.ftqq.com/${serverChan.sendKey}.send`)
    .type("form")
    .send(data)
    .end((err, res) => {
      if (err) {
        logger.error(`ServerChan推送失败:${JSON.stringify(err)}`);
        return;
      }
      const json = JSON.parse(res.text);
      if (json.code !== 0) {
        logger.error(`ServerChan推送失败:${JSON.stringify(json)}`);
      } else {
        logger.info("ServerChan推送成功");
      }
    });
};

const pushTelegramBot = (title, desp) => {
  if (!(telegramBot.botToken && telegramBot.chatId)) {
    return;
  }
  const data = {
    chat_id: telegramBot.chatId,
    text: `${title}\n\n${desp}`,
  };
  superagent
    .post(`https://api.telegram.org/bot${telegramBot.botToken}/sendMessage`)
    .type("form")
    .send(data)
    .end((err, res) => {
      if (err) {
        logger.error(`TelegramBot推送失败:${JSON.stringify(err)}`);
        return;
      }
      const json = JSON.parse(res.text);
      if (!json.ok) {
        logger.error(`TelegramBot推送失败:${JSON.stringify(json)}`);
      } else {
        logger.info("TelegramBot推送成功");
      }
    });
};

const pushWecomBot = (title, desp) => {
  if (!(wecomBot.key && wecomBot.telphone)) {
    return;
  }
  const data = {
    msgtype: "text",
    text: {
      content: `${title}\n\n${desp}`,
      mentioned_mobile_list: [wecomBot.telphone],
    },
  };
  superagent
    .post(
      `https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=${wecomBot.key}`
    )
    .send(data)
    .end((err, res) => {
      if (err) {
        logger.error(`wecomBot推送失败:${JSON.stringify(err)}`);
        return;
      }
      const json = JSON.parse(res.text);
      if (json.errcode) {
        logger.error(`wecomBot推送失败:${JSON.stringify(json)}`);
      } else {
        logger.info("wecomBot推送成功");
      }
    });
};

const pushWxPusher = (title, desp) => {
  if (!(wxpush.appToken && wxpush.uid)) {
    return;
  }
  const data = {
    appToken: wxpush.appToken,
    contentType: 1,
    summary: title,
    content: desp,
    uids: [wxpush.uid],
  };
  superagent
    .post("https://wxpusher.zjiecode.com/api/send/message")
    .send(data)
    .end((err, res) => {
      if (err) {
        logger.error(`wxPusher推送失败:${JSON.stringify(err)}`);
        return;
      }
      const json = JSON.parse(res.text);
      if (json.data[0].code !== 1000) {
        logger.error(`wxPusher推送失败:${JSON.stringify(json)}`);
      } else {
        logger.info("wxPusher推送成功");
      }
    });
};

const push = (title, desp) => {
  pushServerChan(title, desp);
  pushTelegramBot(title, desp);
  pushWecomBot(title, desp);
  pushWxPusher(title, desp);
};

// 开始执行程序
async function main() {
  for (let index = 0; index < accounts.length; index += 1) {
    const account = accounts[index];
    const { userName, password } = account;
    if (userName && password) {
      const userNameInfo = mask(userName, 3, 7);
      try {
        logger.log(`账户 ${userNameInfo}开始执行`);
        const cloudClient = new CloudClient(userName, password);
        await cloudClient.login();
        const result = await doTask(cloudClient);
        result.forEach((r) => logger.log(r));
        const familyResult = await doFamilyTask(cloudClient);
        familyResult.forEach((r) => logger.log(r));
        logger.log("任务执行完毕");
        const { cloudCapacityInfo, familyCapacityInfo } =
          await cloudClient.getUserSizeInfo();
        logger.log(
          `个人总容量：${(
            cloudCapacityInfo.totalSize /
            1024 /
            1024 /
            1024
          ).toFixed(2)}G,家庭总容量：${(
            familyCapacityInfo.totalSize /
            1024 /
            1024 /
            1024
          ).toFixed(2)}G`
        );
      } catch (e) {
        logger.error(e);
        if (e.code === "ETIMEDOUT") {
          throw e;
        }
      } finally {
        logger.log(`账户 ${userNameInfo}执行完毕`);
      }
    }
  }
}

(async () => {
  try {
    await main();
  } finally {
    const events = recording.replay();
    const content = events.map((e) => `${e.data.join("")}`).join("  \n");
    push("天翼云盘自动签到任务", content);
    recording.erase();
  }
})();
