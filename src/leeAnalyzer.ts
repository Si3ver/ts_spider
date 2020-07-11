import { Analyzer } from "./crawler";

export default class leeAnalyzer implements Analyzer {
  public analyze(html: string, filePath: string) {
    return html;
  }
}
