const express = require("express");
const dotenv = require("dotenv");
const { GoogleGenAI } = require("@google/genai");

const db = require("./database");

dotenv.config();

const app = express();

const PORT = 3000;


/* =====================================================
   MIDDLEWARE
===================================================== */

app.use(express.json());

app.use((req, res, next) => {

  res.header(
    "Access-Control-Allow-Origin",
    "*"
  );

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();

});


/* =====================================================
   GEMINI
===================================================== */

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});


/* =====================================================
   TEST
===================================================== */

app.get("/test", (req, res) => {

  res.json({
    success: true,
    message: "Aura Skincare backend is running",
    geminiKeyLoaded:
      !!process.env.GEMINI_API_KEY,
    database:
      "SQLite"
  });

});


/* =====================================================
   ORDER LOOKUP
===================================================== */

app.get("/orders/:orderId", (req, res) => {

  try {

    let orderId =
      String(req.params.orderId)
        .toUpperCase()
        .trim();


    // Convert ORD-101 → 101
    orderId =
      orderId
        .replace(/^ORD[-\s]?/, "");


    const order = db
      .prepare(`
        SELECT *
        FROM orders
        WHERE id = ?
      `)
      .get(orderId);


    if (!order) {

      return res.status(404).json({

        success: false,

        error: "ORDER_NOT_FOUND",

        order_id: orderId

      });

    }


    res.json({

      success: true,

      order_id: order.id,

      customer: order.customer,

      product: order.product,

      amount: order.amount,

      status: order.status,

      courier: order.courier,

      tracking_id: order.tracking_id,

      expected_delivery:
        order.expected_delivery,

      delivered:
        order.delivered,

      ordered:
        order.ordered,

      cancellation_eligible:
        Boolean(order.cancellation_eligible)

    });


  } catch (error) {

    console.error(
      "Order lookup error:",
      error
    );

    res.status(500).json({

      success: false,

      error: "DATABASE_ERROR"

    });

  }

});


/* =====================================================
   GEMINI EPHEMERAL TOKEN
===================================================== */

app.get("/gemini-token", async (req, res) => {

  try {

    const expireTime =
      new Date(
        Date.now() + 30 * 60 * 1000
      ).toISOString();


    const newSessionExpireTime =
      new Date(
        Date.now() + 60 * 1000
      );


    const token =
      await ai.authTokens.create({

        config: {

          uses: 1,

          expireTime,

          newSessionExpireTime,

          liveConnectConstraints: {

            model:
              "gemini-3.8-live",

            config: {

              responseModalities:
                ["AUDIO"],

              sessionResumption: {},

              inputAudioTranscription:
                {},

              outputAudioTranscription:
                {}

            }

          }

        }

      });


    console.log(
      "Gemini ephemeral token created"
    );


    res.json({

      success: true,

      token: token.name

    });


  } catch (error) {

    console.error(
      "Gemini token error:",
      error
    );


    res.status(500).json({

      success: false,

      error:
        "Failed to create Gemini Live token",

      details:
        error.message

    });

  }

});


/* =====================================================
   START SERVER
===================================================== */

app.listen(
  PORT,
  () => {

    console.log(
      `Aura backend running at http://localhost:${PORT}`
    );

    console.log(
      "SQLite database connected"
    );

  }
);