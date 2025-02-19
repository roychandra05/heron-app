import { encrypt } from "@/lib/session";
import { createClient } from "@/utils/supabase/server";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

export async function POST(req) {
  const formData = await req.json();
  const supabase = await createClient();
  const mailerToken = process.env.MAILER_SEND_API_TOKEN;
  const smtpUsername = process.env.SMTP_USERNAME;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL_DEV;
  const setExp = "30m";
  try {
    const { email, username, user_id } = formData;
    const reset_token = await encrypt({ email, username, user_id }, setExp);
    const expired_at = new Date(Date.now() + 30 * 60 * 1000).toISOString();
    const resetLink = `${baseUrl}/reset-password?token=${reset_token}`;

    const { data, error } = await supabase
      .from("reset_password")
      .insert({
        user_id,
        reset_token,
        expired_at,
      })
      .select();

    if (error) {
      throw new Error(error.message);
    }
    const mailersend = new MailerSend({
      apiKey: mailerToken,
    });

    const sentFrom = new Sender(smtpUsername, "Heron Fitness Bali");

    const recipients = [new Recipient(email, "roychandra")];

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setReplyTo(sentFrom)
      .setSubject("RESET PASSWORD")
      .setHtml(
        `<strong>
        <p>Hello ${username},</p>
        <p>Click link below to reset your password</p>
        <a href=${resetLink}>Reset Password</a>
        </strong>`
      )
      .setText("This is the text content");

    await mailersend.email.send(emailParams);

    return new Response(
      JSON.stringify(
        "email has been sent. please, check your email, this is valid for 30 minutes only"
      ),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(error.message), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
