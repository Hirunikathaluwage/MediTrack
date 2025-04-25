import cron from "node-cron";
import Inquiry from "../models/Inquiry.js";
import dayjs from "dayjs";
import { sendEmail } from "./emailConfig.js";

// Configurable SLA duration (default: 6 hours)
const SLA_HOURS = process.env.SLA_HOURS ? parseInt(process.env.SLA_HOURS) : 6;

const checkInquirySLA = async () => {
  try {
    const overdueTime = dayjs().subtract(SLA_HOURS, "hour").toDate();

    const overdueInquiries = await Inquiry.find({
      priority: "High",
      status: "Pending",
      createdAt: { $lte: overdueTime },
    });

    if (overdueInquiries.length === 0) {
      console.log(`✅ SLA Checker: No overdue high-priority inquiries`);
      return;
    }

    for (let inquiry of overdueInquiries) {
      await sendEmail({
        to: "awanthaimesh65@gmail.com",
        subject: `⚠️ SLA Alert: High-Priority Inquiry`,
        text: `This high-priority inquiry has not been addressed in ${SLA_HOURS} hours:\n\nSubject: ${inquiry.subject}\nID: ${inquiry._id}`,
      });

      console.log(`📢 SLA Alert sent for inquiry ID: ${inquiry._id}`);
    }
  } catch (err) {
    console.error("❌ SLA Checker failed:", err.message);
  }
};

export const scheduleSLAAlert = () => {
  cron.schedule("*/60 * * * *", checkInquirySLA);
  console.log("🕒 SLA checker scheduled to run every 5 minutes");
};
