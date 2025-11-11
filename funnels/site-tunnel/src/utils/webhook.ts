// Webhook utilities for RabaisLocal

interface WebhookData {
  email: string;
  nom: string;
  timestamp?: string;
  source?: string;
}

export async function sendWebhook(url: string, data: WebhookData): Promise<any> {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Webhook failed: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Webhook error:', error);
    throw error;
  }
}

export function formatWebhookData(formData: { email: string; nom: string }): WebhookData {
  return {
    email: formData.email,
    nom: formData.nom,
    timestamp: new Date().toISOString(),
    source: 'site-tunnel',
  };
}

export async function sendToMake(data: any) {
  const webhookURL = "https://hook.us2.make.com/ton_webhook"; // remplace par ton URL Make
  const response = await fetch(webhookURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.ok;
}
