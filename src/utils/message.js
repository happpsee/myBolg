import message from "@/views/message/message.handlebars";

export default class Message {
  constructor(wrap = "body") {
    this.wrap = $(wrap);
    this.durTime = 3000;
  }
  render(type, msg) {
    let msgEle = $(message({
      type,
      msg,
      isEnter: true
    }));
    setTimeout(() => {
      msgEle.children().addClass("animate__bounceOutUp");

      setTimeout(() => {
        msgEle.remove();
      }, 3000);

    }, this.durTime)
    this.wrap.append(msgEle);
  }

  success (msg) {
    this.render("success", msg);
  }

  info(msg) {
    this.render("info", msg);
  }

  danger(msg) {
    this.render("danger", msg);
  }
}