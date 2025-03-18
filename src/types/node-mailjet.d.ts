declare module 'node-mailjet' {
  interface MailjetConfig {
    apiKey: string;
    apiSecret: string;
  }

  interface MailjetMessage {
    From: {
      Email: string;
      Name: string;
    };
    To: Array<{
      Email: string;
      Name: string;
    }>;
    Subject: string;
    TextPart: string;
    HTMLPart: string;
  }

  interface MailjetRequest {
    Messages: MailjetMessage[];
  }

  interface MailjetResponse {
    body: any;
  }

  class Mailjet {
    constructor(config: MailjetConfig);
    post(endpoint: string, options: { version: string }): {
      request: (data: MailjetRequest) => Promise<MailjetResponse>;
    };
  }

  export = Mailjet;
} 