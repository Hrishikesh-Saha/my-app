import { NextResponse } from "next/server";

const DEFAULT_MODEL = "gemini-2.5-flash-lite";
const FALLBACK_MODELS = ["gemini-2.5-flash-lite", "gemini-2.5-flash", "gemini-flash-latest"];
const QUOTA_MESSAGE =
  "Gemini এখন আপনার API key/project-এর quota থেকে উত্তর দিচ্ছে না। তাই আপাতত সাধারণ সহায়তা দেখানো হচ্ছে: ";
const DEFAULT_QUESTIONS = [
  "মাসিকের সময় পেটে ব্যথা কমাবো কীভাবে?",
  "PMOS-এর লক্ষণ কী কী?",
  "গর্ভাবস্থায় কোন খাবার উপকারী?",
  "মানসিক চাপ কমানোর উপায়?",
];

function modelQueue(preferredModel: string) {
  return Array.from(new Set([preferredModel, ...FALLBACK_MODELS]));
}

function isDefaultQuestion(question: string) {
  return DEFAULT_QUESTIONS.some((item) => item === question.trim());
}

function fallbackAnswer(question: string) {
  const q = question.toLowerCase();

  if (q.includes("pcos") || q.includes("pcod")) {
    return "PMOS/PCOD হলে মাসিক অনিয়মিত হওয়া, ব্রণ, ওজন পরিবর্তন বা অতিরিক্ত লোম দেখা দিতে পারে। নিয়মিত খাবার, ঘুম, ব্যায়াম এবং গাইনি বিশেষজ্ঞের পরামর্শ নেওয়া ভালো।";
  }

  if (q.includes("ব্যথা") || q.includes("cramp") || q.includes("মাসিক")) {
    return "মাসিকের ব্যথায় গরম সেঁক, পর্যাপ্ত পানি, হালকা স্ট্রেচিং এবং বিশ্রাম সাহায্য করতে পারে। ব্যথা খুব বেশি হলে, জ্বর থাকলে বা রক্তপাত অস্বাভাবিক হলে চিকিৎসকের সাথে কথা বলুন।";
  }

  if (q.includes("গর্ভ") || q.includes("preg")) {
    return "গর্ভাবস্থায় আয়রন, ক্যালসিয়াম, প্রোটিন ও ফলিক অ্যাসিডসমৃদ্ধ খাবার রাখা ভালো। কাঁচা বা অস্বাস্থ্যকর খাবার এড়িয়ে চলুন এবং নিয়মিত প্রসবপূর্ব চেকআপ করুন।";
  }

  if (q.includes("মন") || q.includes("stress") || q.includes("চাপ")) {
    return "চাপ কমাতে ধীরে শ্বাস নেওয়া, ঘুমের রুটিন ঠিক রাখা, কাছের মানুষের সাথে কথা বলা এবং স্ক্রিন টাইম কমানো সাহায্য করতে পারে। দীর্ঘদিন মন খারাপ থাকলে কাউন্সেলর বা চিকিৎসকের সহায়তা নিন।";
  }

  return "আপনার প্রশ্নটি গুরুত্বপূর্ণ। লক্ষণ, সময়কাল, ব্যথার মাত্রা এবং সাম্প্রতিক পরিবর্তন লিখে রাখুন। উপসর্গ তীব্র, দীর্ঘস্থায়ী বা অস্বাভাবিক হলে চিকিৎসকের পরামর্শ নিন।";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { question?: unknown };
    const question = typeof body.question === "string" ? body.question.trim() : "";

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    if (isDefaultQuestion(question)) {
      return NextResponse.json({
        answer: fallbackAnswer(question),
        source: "default",
      });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    const preferredModel = process.env.GEMINI_MODEL || DEFAULT_MODEL;

    if (!apiKey) {
      return NextResponse.json({
        answer: fallbackAnswer(question),
        source: "fallback",
      });
    }

    const failedModels: string[] = [];

    for (const model of modelQueue(preferredModel)) {
      const geminiResponse = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            systemInstruction: {
              parts: [
                {
                  text:
                    "You are Shakti's Bengali women's health assistant. Reply in simple Bengali. Keep answers short, practical, and kind. Do not diagnose or prescribe medicine. For emergencies, severe pain, heavy bleeding, pregnancy danger signs, self-harm, or worsening symptoms, tell the user to contact a doctor or emergency service immediately.",
                },
              ],
            },
            contents: [
              {
                role: "user",
                parts: [{ text: question }],
              },
            ],
            generationConfig: {
              temperature: 0.3,
              maxOutputTokens: 320,
            },
          }),
        },
      );

      if (!geminiResponse.ok) {
        failedModels.push(`${model}:${geminiResponse.status}`);
        continue;
      }

      const data = await geminiResponse.json();
      const answer = data.candidates?.[0]?.content?.parts
        ?.map((part: { text?: string }) => part.text || "")
        .join("")
        .trim();

      if (answer) {
        return NextResponse.json({
          answer,
          model,
          source: "gemini",
        });
      }

      failedModels.push(`${model}:empty`);
    }

    return NextResponse.json({
      answer: `${QUOTA_MESSAGE}${fallbackAnswer(question)}`,
      details: failedModels,
      source: "quota-fallback",
    });

  } catch {
    return NextResponse.json(
      { answer: "দুঃখিত, এখন উত্তর তৈরি করা যাচ্ছে না। একটু পরে আবার চেষ্টা করুন।" },
      { status: 500 },
    );
  }
}
