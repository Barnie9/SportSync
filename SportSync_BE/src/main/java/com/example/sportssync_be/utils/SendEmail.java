package com.example.sportssync_be.utils;

import java.util.Properties;

import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

public class SendEmail {

    private static final String senderEmailAddress = "bran.alexandru.2002@gmail.com";
    private static final String password = "vnxhixksalmeqlzt";
    private static final String host = "smtp.gmail.com";
    private static final String port = "465";

    private static Session getSession() {
        Properties properties = new Properties();

        properties.put("mail.smtp.host", host);
        properties.put("mail.smtp.port", port);
        properties.put("mail.smtp.ssl.enable", "true");
        properties.put("mail.smtp.auth", "true");

        return Session.getInstance(properties, new javax.mail.Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(senderEmailAddress, password);
            }
        });
    }

    public static boolean sendConfirmationEmail(String recipientEmailAddress, String token) {
        try {
            Message message = new MimeMessage(getSession());

            message.setFrom(new InternetAddress(senderEmailAddress));

            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(recipientEmailAddress));

            message.setSubject("SportsSync - Confirm your email address");

            message.setText("Hello,\n\n" +
                    "Please confirm your email address by clicking the link below:\n\n" +
                    "http://localhost:3000/confirm-email/" + token + "\n\n" +
                    "Thank you,\n" +
                    "SportsSync Team");

            Transport.send(message);

            return true;
        } catch (MessagingException e) {
            e.printStackTrace();

            return false;
        }
    }
}
