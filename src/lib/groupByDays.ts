import { IMessage } from '@/pages';
import moment from 'moment';

export const groupByDays = (messages: IMessage[]): any => {
  return messages.reduce((acc: any, el: IMessage) => {
    const messageDay: string = moment(el.createdAt).format(`YYYY-MM-DD`);
    if (acc[messageDay]) {
      return { ...acc, [messageDay]: acc[messageDay].concat([el]) };
    }
    return { ...acc, [messageDay]: [el] };
  }, {});
};

const generatedItems = (messages: IMessage[]): any[] => {
  const days = groupByDays(messages);
  const sortedDays: string[] = Object.keys(days).sort(
    (x, y) => moment(y, `YYYY-MM-DD`).unix() + moment(x, `YYYY-MM-DD`).unix(),
  );
  const items = sortedDays.reduce((acc: any, date: any) => {
    const sortedMessages = days[date].sort(
      (x: any, y: any) => x.createdAt - y.createdAt,
    );
    return acc.concat([{ type: `day`, date, id: date }, ...sortedMessages]);
  }, []);
  return items;
};

export default generatedItems;
