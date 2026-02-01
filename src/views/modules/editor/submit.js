import { Modal } from "../modal/modal.js";
import { http } from "@/utils/index.js";
import { routerjs } from "@/router/index.js";
import * as submitClass from "./styl/submit.styl";
import submitTemplate from "./hbs/submit.hbs";
import { Message } from "../message/message.js";


class EditorSubmit {
  constructor() {
  }

  async init({ articleContent, articleTitle }) {
    await this.render();
    this.eventAgency();
    this.form = Object.assign({ fieldIds: {} }, { content: articleContent, title: articleTitle });
  }

  async render() {
    const { data: tags } = await http.send("column");
    const customContent = submitTemplate({ tags, class:submitClass });
    const { open, close, kill, isLive, isShow } = Modal.modalFactory({ isCustom: true, customContent });
    this.open = open;
    this.close = close;
    this.kill = kill;
    this.isLive = isLive;
    this.isShow = isShow;
    this.open();
  }

  eventAgency() {

    $(".js-article-submit-btns--cancel").on("click", () => {
      this.close();
    });
    $(".js-article-sub-file").on("change", async (e) => {

      let reader = new FileReader();

      reader.addEventListener("loadend", () => {
        console.log(reader.result, "Result");
        this.uploadFile = e.target.files[0];
        $(".js-article-select-img")
          .prop({ "src": reader.result })
          .removeAttr("hidden");
        $(".js-input-file-mask").remove();
      });
      reader.readAsDataURL(e.target.files[0]);
    });
    $(".js-article-sub-column").on("click", ".js-article-sub-column-item", (e) => {
      $(e.target)
        .addClass("js-article-column-item--select")
        .siblings()
        .removeClass("js-article-column-item--select");

      this.form.fieldIds.column = $(e.target).data("id");
    });

    $(".js-article-sub-abstract").on("input", (e) => {
      this.form.abstract = $(e.target).text();
      console.log(this.form.abstract);
    });

    $(".js-article-sub-confirm").on("click", async () => {

      console.log(this.form, "this.form");

      if (this.uploadFile) {
        const formdata = new FormData();
        console.log(this.uploadFile, "uploadFie");
        formdata.append("file", this.uploadFile);
        const {fileUrl}= await http.send("upload", formdata, {
              headers: {
                "Content-Type": "multipart/form-data"
              }
            });
            this.form.cover = fileUrl;
      }
      const {_id} = await http.send("publishArticle", this.form)
      this.destroy();
      (new Message).success("文章新增成功");
      routerjs.navigate(`/article/${_id}`);
      this.close();
    });
    $(".js-article-sub-close").on("click", () => {
      this.close();
    });

  }

  destroy() {

  }

}

export default EditorSubmit;