import { Message } from '@/pages';

/* The POST method adds a new entry in the mongodb database. */
export const postData = async (form: Message) => {
  try {
    const res = await fetch(`/api/messages`, {
      method: `POST`,
      headers: {
        Accept: `application/json`,
        'Content-Type': `application/json`,
      },
      body: JSON.stringify(form),
    });

    // Throw error with status code in case Fetch API req failed
    if (!res.ok) {
      throw new Error(res.status.toString());
    }
  } catch (error) {
    console.log(`failed to update message`);
  }
};
