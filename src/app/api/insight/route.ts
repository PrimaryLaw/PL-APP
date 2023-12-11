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


    const pdf_test = "SERVICE PROVIDER AGREEMENT\
    D.I. Medical Inc.\
    12 Main Street\
    Greenfield, Manitoba\
    V2L4D7\
    Canada\
    Re: Cleaning Services Agreement\
    Subject to the terms and conditions set forth herein, this Cleaning Services Agreement\
    (\"Agreement\") is entered into between D.I. Medical Inc. (\"Client\") and Dusting Duos (\"Service\
    Provider\") effective as of June 11, 2023 (the \"Effective Date\").\
    1. Scope of Services\
    The Service Provider agrees to provide the following cleaning services (\"Services\") to the\
    premises of the Client, located at 12 Main Street, Greenfield, Manitoba, Canada (\"Premises\"):\
    a. Mopping of all tile floors;\
    b. Vacuuming of all carpeted areas;\
    c. Cleaning of all surfaces with disinfectants;\
    d. Removal of garbage;\
    e. Removal of all paper and plastic recyclables;\
    f. Providing all cleaning supplies.\
    2. Service Schedule\
    The Service Provider will attend at the Premises Monday through Saturday between the hours\
    of 8:00 pm and 12:00 am to perform the cleaning services. The Client agrees to provide the\
    Service Provider with a key or access code to the Premises to facilitate access for cleaning\
    purposes.\
    3. Compensation\
    The Client agrees to pay the Service Provider a monthly service charge of $1500 for the Services\
    rendered. Payment shall be made by E-transfer on a monthly basis, with the first payment due\
    on June 11, 2023.\
    4. Term and Termination\
    This Agreement shall commence on the Effective Date and continue until either party provides\
    prior written notice to the other party. Either party may terminate this Agreement upon the\
    specified notice period.\
    5. Compliance with Applicable Laws and Regulations\
    The Service Provider shall comply with all applicable laws, regulations, and licensing\
    requirements relating to the provision of the Services, including any specific requirements\
    applicable to cleaning services in medical practices.\
    6. Confidentiality\
    The Service Provider acknowledges that during the course of providing the Services, they may\
    have access to certain confidential and proprietary information of the Client. The Service \
    Provider agrees to maintain the confidentiality of such information and shall not disclose or use\
    it for any purpose other than performing the Services under this Agreement.\
    7. Indemnification\
    The Service Provider shall indemnify, defend, and hold harmless the Client, its officers,\
    directors, employees, and agents from and against any and all claims, damages, liabilities, costs,\
    and expenses arising out of or in connection with the provision of the Services, except to the\
    extent caused by the negligence or willful misconduct of the Client.\
    8. Insurance\
    The Service Provider shall maintain adequate general liability insurance coverage throughout\
    the term of this Agreement, with limits no less than $1,000,000. Upon request, the Service\
    Provider shall provide proof of insurance to the Client.\
    9. Workers and Replacement of Workers\
    The Service Provider warrants that all workers are well-trained, fully capable, and fully\
    competent to perform the Services. The Service Provider shall be responsible and liable for the\
    workers, similar to how they are vicariously responsible and liable for their own employees and\
    their services. The Client has the right to require the Service Provider to replace any worker that\
    the Client deems unsuitable for any reason, with another person of equal or superior skill upon\
    written notice.\
    10. Subcontracting\
    The Service Provider shall not subcontract any part of the Services to any third party without\
    the prior written consent of the Client.\
    11. Delay\
    In the event of any delay in the provision of the Services due to reasons within the control of\
    the Service Provider, the Service Provider shall promptly notify the Client and make reasonable\
    efforts to minimize the impact of the delay on the Client\'s operations.\
    12. Modification\
    This Agreement may only be amended by a written agreement signed by both parties.\
    13. Severability\
    If any provision of this Agreement is held to be invalid, illegal, or unenforceable, the validity,\
    legality, and enforceability of the remaining provisions shall not be affected or impaired.\
    This Agreement shall be governed by and construed in accordance with the laws of the\
    province of Manitoba, Canada. Any disputes arising under or in connection with this Agreement\
    shall be resolved by the courts located in Winnipeg, Manitoba.\
    Ella Porter\
    Partner\
    Dusting Duos (Service Provider)\
    Mattias Greenhill\
    Partner\
    Dusting Duos (Service Provider)\
    Darcy Ivany\
    CEO\
    D.I. Medical Inc. (Client)"


    // Prepare the prompt for OpenAI API
    const prompt = {
      role: "system",
      content: `As a legal expert, your primary function is to meticulously review and analyze legal this contract ${pdf_test}.
      Based on the following insights: ${insight} 
      AI assistant will not invent anything that is not drawn directly from the context.
     AI assistant will give always with all response in blocks of Html, formatted with bold (for the titles or main words) and in list style.
  AI assistant will provide all responses in distinct HTML blocks, some examples of formatting are, <b>bold</b>,<ul><li>1. Definitions</li></ul> or <h2>headings</h2>, but always with HTML blocks.
      AI assistant will not provide more than 125 words. 
      You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points.
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
