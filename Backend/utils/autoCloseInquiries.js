import cron from 'node-cron';
import Inquiry from '../models/Inquiry.js';
import dayjs from 'dayjs';

// Auto-close inquiries after 7 days
const AUTO_CLOSE_DAYS = 1;

const autoCloseOldInquiries = async () => {
  try {
    const cutOffDate = dayjs().subtract(AUTO_CLOSE_DAYS, 'day').toDate();

    const inquiriesToClose = await Inquiry.find({
      status: "Pending",
      createdAt: { $lte: cutOffDate }
    });

    if (inquiriesToClose.length > 0) {
      for (const inquiry of inquiriesToClose) {
        inquiry.status = "Closed";
        await inquiry.save();
        console.log(`✅ Inquiry ID ${inquiry._id} auto-closed.`);
      }
    } else {
      console.log("✅ No pending inquiries to auto-close.");
    }
  } catch (error) {
    console.error(" Auto-close task failed:", error.message);
  }
};

export const scheduleAutoCloseInquiries = () => {
  // Run once every day at 2 AM server time
  cron.schedule('0 2 * * *', autoCloseOldInquiries);
  console.log('🕒 Auto-close inquiry job scheduled (Daily at 2AM)');
};
