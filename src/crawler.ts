// http://www.dell-lee.com/typescript/demo.html?secret=x3b174jsx
import fs from "fs";
import path from "path";
import superaget from "superagent";
import DellAnalyzer from "./dellAnalyzer";
// import leeAnalyzer from "./leeAnalyzer";

export interface Analyzer {
  analyze: (html: string, filePath: string) => string;
}

class Crawler {
  private filePath = path.resolve(__dirname, "../data/course.json");

  constructor(private url: string, private analyzer: Analyzer) {
    this.initCrawlerProcess();
  }

  private async initCrawlerProcess() {
    const html = await this.getRawHtml();
    const fileContent = this.analyzer.analyze(html, this.filePath);
    this.writeFile(fileContent);
  }

  /**
   * 爬取 html
   */
  private async getRawHtml() {
    const result = await superaget.get(this.url);
    return result.text;
  }

  private writeFile(content: string) {
    fs.writeFileSync(this.filePath, content);
  }
}

const secret = "x3b174jsx";
const url = `http://www.dell-lee.com/typescript/demo.html?secret=${secret}`;

const analyzer = DellAnalyzer.getInstance();
const crawler = new Crawler(url, analyzer);
