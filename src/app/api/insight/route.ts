import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function POST(req: Request) {
  try {
    const { messages, chatId, insight } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    // Only select the pdfUrl column since that's all we need
    const currPdf = _chats[0].pdfUrl;
    if (_chats.length != 1) {
      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }


    const test = "Prenup Questionnaire \
Partner Information\
Full Name of Partner 1: John Tree\
Full Name of Partner 2: Marie Lawrence\
Date of Birth (Partner 1): 23/04/1985\
Date of Birth (Partner 2): 29/05/1989\
Current Address (Joint or Individual): Street xyz Toronto Canada\
Province of Residence: Manitoba\
Marital Status and Intentions\
Intended Date of Marriage: 03/09/2024\
Have either of you been previously married? Yes\
Financial Information (for Each Partner)\
Annual Income (Partner 1): [200k\
Annual Income (Partner 2): 127k\
Description of Assets (Partner 1): [Short Textbox w/add remove row]\
Description of Assets (Partner 2): [Short Textbox w/add remove row]\
Description of Liabilities (Partner 1): [Short Textbox w/add remove row]\
Description of Liabilities (Partner 2): [Short Textbox w/add remove row]\
Property and Asset Division\
Jointly Owned Properties and Assets: [Short Textbox w/add remove row]\
Preferred Division of Property in Case of Separation (Joint Response): [Long Textbox]\
Children and Dependents\
Details of Children/Dependents from Current or Previous Relationships (Column titles: Name, Age, Guardianship): [Short Textbox w/add remove row]\
Spousal Support and Other Terms\
Agreements on Spousal Support Terms: [Long Textbox]\
Other Specific Terms or Agreements (e.g., inheritance, business ownership): [Long Textbox]\
Legal Consultation\
Would you like to have this agreement reviewed by a lawyer? [Yes/No Toggle]\
If yes: Paywall, Calendly \
If no: next page\
Consent and Acknowledgment\
Digital Consent to Terms and Conditions: [Checkbox for each partner]\
OR Electronic Signatures: [Signature Pad for each partner]\
Next Steps\
Explanation: Print out document, both parties sign, must be witnessed by two \
Acknowledgement: You understand that this agreement is not valid unless signed by both parties and witnessed by two separate parties? [Yes/No Toggle]\
Download \
Amendments\
"

{/* 
    // Prepare the prompt for OpenAI API
    const prompt = {
      role: "system",
      content: `As a legal expert, your primary function is to meticulously review and analyze legal this contract ${currPdf}.
      Based on the following insights: ${insight} 
      AI assistant will not invent anything that is not drawn directly from the context.
     AI assistant will give always with all response in blocks of Html, formatted with bold (for the titles or main words) and in list style.
  AI assistant will provide all responses in distinct HTML blocks, some examples of formatting are, <b>bold</b>,<ul><li>1. Definitions</li></ul> or <h2>headings</h2>, but always with HTML blocks.
      AI assistant will not provide more than 125 words. 
      You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.
      `,
    }; 
  */}

      // Prepare the prompt for OpenAI API
      const prompt = {
        role: "system",
        content: `
        As a legal expert with specialized knowledge in Manitoba marital laws, your task is to draft a prenuptial agreement. This task requires precise attention to detail and adherence to legal standards. You will receive input through a variable named ${test}, containing key details about the spouses. Use this information to tailor the prenuptial agreement to their specific situation.\
        Ensure that your responses:\
        - Are based solely on the provided ${test} data, without inventing any additional information.\
        - Follow a structured and professional format, utilizing HTML for clarity.\
        - Include necessary legal sections such as Definitions, Terms and Conditions, Financial Disclosures, Property Division, and any other relevant clauses.\
        - Are concise and focused, avoiding unnecessary details or tangential information.\
        Format the document using HTML tags, with emphasis on readability and professionalism. Use <b> for key terms, <ul> and <li> for lists, and <h2> for section headings. This format should be conducive to converting the document into a PDF for official use.\
        Remember, your role is to provide a clear, legally sound, and personalized prenuptial agreement based on the specific information provided, adhering to the legal framework of Manitoba, Canada.\
        Do not give any other advisor regarding "contact a lawywer or "this is just a template"... 
        `,
      }; 

    // Use the more performant model if it meets your needs
    const modelName = "gpt-4"; // Chat gpt-4 to read the contract

    // Create a chat completion request
    const response = await openai.createChatCompletion({
      model: modelName,
      messages: [
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });

    // Use the streaming response to send back data as it's received
    const stream = OpenAIStream(response);

    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error('route - insight', error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
