// http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx
import fs from "fs";
import path from "path";
import superaget from "superagent";
import cheerio from "cheerio";

interface Course {
  title: string;
  count: number;
}

interface CourseResult {
  time: number;
  data: Course[];
}

interface Content {
  [propName: number]: Course[];
}

class Crawler {
  private secret = "x3b174jsx";
  private url = `http://www.dell-lee.com/typescript/demo.html?secret=${this.secret}`;
  private filePath = path.resolve(__dirname, "../data/course.json");

  constructor() {
    this.initCrawlerProcess();
  }

  async initCrawlerProcess() {
    const html = await this.getRawHtml();
    const courseInfo = this.getCourseInfo(html);
    const fileContent = this.generateJsonContent(courseInfo);
    this.writeFile(JSON.stringify(fileContent));
  }

  /**
   * 爬取 html
   */
  async getRawHtml() {
    const result = await superaget.get(this.url);
    return result.text;
  }

  /**
   * 提取课程信息快照
   * @param html 要解析的html结构
   */
  getCourseInfo(html: string): CourseResult {
    const $ = cheerio.load(html);
    const courseItems = $(".course-item");
    const courseInfos: Course[] = [];
    courseItems.map((idx, element) => {
      const descs = $(element).find(".course-desc");
      const title = descs.eq(0).text();
      const count = parseInt(descs.eq(1).text().split("：")[1], 10);
      courseInfos.push({ title, count });
    });
    return {
      time: new Date().getTime(),
      data: courseInfos,
    };
  }

  generateJsonContent(courseInfo: CourseResult) {
    let fileContent: Content = {};
    if (fs.existsSync(this.filePath)) {
      fileContent = JSON.parse(fs.readFileSync(this.filePath, "utf-8"));
    }
    fileContent[courseInfo.time] = courseInfo.data;
    return fileContent;
  }

  writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

const crawler = new Crawler();
