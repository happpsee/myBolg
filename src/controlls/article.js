import { http } from "../utils/http.js";
import { formatTime } from "../utils/index.js";


class articleControler {
  constructor() {

  }

  eventListener() {}


  transformRes(data) {
    return data.reduce((acc, { title, content, date, likeNums, commentNums }) => {
      acc.push({
        articleTitle: title,
        articleDes: content.slice(0, 100),
        createdDate: formatTime(date),
        likeNums,
        commentNums,
      });
      return acc;
    }, []);
  }

  async getArticles() {
    let { data } = await http.send("articles");
    return this.transformRes(data);
  }

}

export default articleControler;