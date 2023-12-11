import { Configuration, OpenAIApi } from "openai-edge";
import { Message, OpenAIStream, StreamingTextResponse } from "ai";
import { getContext } from "@/lib/context";
import { db } from "@/lib/db";
import { chats, messages as _messages } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { extractPdfText } from '@/lib/pdftotext'; // Adjust the import path as needed





export const runtime = "edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);


export async function POST(req: Request) {
  try {
    console.log('######atualmente aqui ######')
    const { messages, chatId, userId } = await req.json();

    const _chats = await db.select().from(chats).where(eq(chats.id, chatId));
    console.log('chats: '+_chats)
    // Only select the pdfUrl column since that's all we need
    const currPdf = _chats[0].pdfUrl;
    console.log('LINK PARA O PDF: '+currPdf)
    if (_chats.length != 1) {

      return NextResponse.json({ error: "chat not found" }, { status: 404 });
    }
    const fileKey = _chats[0].fileKey;
    const lastMessage = messages[messages.length - 1];

    //call function extractPdfText em /lib/pdftotext.ts
    const pdfText = await extractPdfText(currPdf);
   // const pdfText = await extractPdfText('https://globalforgivenessinitiative.com/user/pages/download/Quatro-Passos-para-o-Perdao-William-Fergus-Martin.pdf');
   // https://chatpdf-primary-law.s3.eu-north-1.amazonaws.com/uploads/1702253023701contract_test.pdf

    const context = await getContext(lastMessage.content, fileKey);


    console.log('HERE IS THE PDFTEXT: '+pdfText)
    console.log('HERE IS THE CONTEXT: '+context)

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

    const prompt = {
      role: "system",
      content: `Based on the content of this uploaded contract: ${pdf_test}.
      As a legal expert, your primary function is to meticulously review and analyze it.
      Your role is to remain observant and wait for specific user instructions or questions before you provide insights.
      When interacting with users, you will employ your extensive knowledge of contractual language, obligations, rights, and legal principles to provide detailed analyses of the contracts submitted for review.
      Maintain a professional tone befitting of a lawyer-client consultation, addressing the users' inquiries with the precision and clear, actionable advice that would be expected from an experienced legal counsel.
      Your guidance should clarify terms, identify potential risks, and ensure that contractual agreements align with the user's interests and legal requirements.
     Await user initiation for any contractual discussion or analysis.
     START CONTEXT BLOCK
      ${context} 
     END OF CONTEXT BLOCK
     AI assistant will take into account any CONTEXT BLOCK that is provided in a conversation.        
     If the context does not provide the answer to question, the AI assistant will say, "I'm sorry, but I don't know the answer to that question, you can contact one of our lawyers to an more detailed assistance".
     AI assistant will not apologize for previous responses, but instead will indicated new information was gained.
     AI assistant will not invent anything that is not drawn directly from the context.
      `,
    };


     // Use the more performant model if it meets your needs
     const modelName = "gpt-4"; // Chat gpt-4 to read the contract
     console.log('ta aqui')
     console.log(prompt)
    const response = await openai.createChatCompletion({
      model: modelName,
      messages: [
        
        prompt,
        ...messages.filter((message: Message) => message.role === "user"),
      ],
      stream: true,
    });
    const stream = OpenAIStream(response, {
      onStart: async () => {
        // save user message into db
        await db.insert(_messages).values({
          chatId,
          content: lastMessage.content,
          role: "user",
          userId
        });
      },
      onCompletion: async (completion) => {
        // save ai message into db
        await db.insert(_messages).values({
          chatId,
          content: completion,
          role: "system",
          userId
        });
      },
    });
    return new StreamingTextResponse(stream);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
