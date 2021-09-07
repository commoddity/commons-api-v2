import { parseString } from "xml2js";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

export class FormatUtils {
  // Returns the parsed array of bills/events from the source XML (with redundant tags removed)
  static async formatXml<T>(xml: string): Promise<T[]> {
    try {
      return await new Promise((resolve, reject) => {
        parseString(xml, (error: Error, response: string) => {
          if (!error) {
            const xmlObject: {
              rss: { channel: { item: [] }[] };
            } = JSON.parse(JSON.stringify(response));

            const fetchedArray: any[] = xmlObject.rss.channel[0].item;

            if (!fetchedArray.length) {
              resolve([]);
            } else {
              const destructuredArray: T[] = fetchedArray.map<T>((item) => {
                const destructuredItem = {};
                Object.entries(item).forEach((item) => {
                  const [key, [value]] = item as any;
                  destructuredItem[key] = value;
                });
                return destructuredItem as T;
              });

              resolve(destructuredArray);
            }
          } else if (error) {
            reject(error);
          }
        });
      });
    } catch (error) {
      throw new Error(`[FORMAT XML ERROR]: ${error}`);
    }
  }

  // Formats the fetched dates to a consistent format
  static formatDate = (date: string): string | undefined => {
    if (dayjs(date).isValid()) {
      return dayjs(date).utcOffset(-4).format();
    } else {
      return undefined;
    }
  };

  // Returns a bill's code from the 'description' field
  static formatCode = (description: string): string =>
    description.toString().substr(0, description.indexOf(","));

  // Returns the title of a bill or event from the 'description' or 'title' field
  static formatTitle = (title: string): string =>
    title.toString().split(/, (.+)/)[1];
}
