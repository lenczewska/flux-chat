import Chat from "../models/Chat.js";
import axios from "axios";
import imagekit from "../configs/imageKit.js";
import openai from "../configs/openAi.js"; 

export const textMessageController = async (req, res) => {
  // params → (req, res)
  try {
    const userId = req.user._id; // resizeBy → req
    const { chatId, prompt } = req.body;

    console.log("userId:", userId);
    console.log("chatId:", chatId);
    console.log("prompt:", prompt);

    const chat = await Chat.findOne({ userId, _id: chatId });
    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });


    const { choices } = await openai.chat.completions.create({
      model: "gemini-1.5-flash",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const reply = {
      ...choices[0].message, // choises → choices
      timestamp: Date.now(),
      isImage: false,
    };

    chat.messages.push(reply);
    await chat.save(); // сохраняем ДО отправки ответа

    res.json({ success: true, reply });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const imageMessageController = async (req, res) => {
  try {
    const userId = req.user._id;
    const { chatId, prompt } = req.body; // добавлено — не было объявлено

    const chat = await Chat.findOne({ userId, _id: chatId });

    chat.messages.push({
      role: "user",
      content: prompt,
      timestamp: Date.now(),
      isImage: false,
    });

    const encodedPrompt = encodeURIComponent(prompt); // encodeURLComponent → encodeURIComponent

    const generatedImageUrl = `${process.env.IMAGEKIT_URL_ENDPOINT}/ik-genimg-prompt-${encodedPrompt}/flux/${Date.now()}.png?tr=w-800,h-800`; // убран перенос строки и пробел

    const aiImageResponse = await axios.get(generatedImageUrl, {
      responseType: "arraybuffer",
    });

    const base64Image = `data:image/png;base64,${Buffer.from(
      aiImageResponse.data,
      "binary",
    ).toString("base64")}`;

    const uploadResponse = await imagekit.upload({
      file: base64Image,
      fileName: `${Date.now()}.png`,
      folder: "flux",
    });

    const reply = {
      role: "assistant",
      content: uploadResponse.url,
      timestamp: Date.now(),
      isImage: true,
      // isPublished убран — не был объявлен
    };

    chat.messages.push(reply);
    await chat.save(); // сохраняем ДО отправки ответа

    res.json({ success: true, reply });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
