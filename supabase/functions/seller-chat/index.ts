import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ChatRequest {
  messages: { role: "user" | "assistant"; content: string }[];
  sellerName: string;
  sellerDescription: string;
  sellerLocation: string;
  products: { name: string; price: number; description: string }[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, sellerName, sellerDescription, sellerLocation, products } = await req.json() as ChatRequest;
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const productList = products.map(p => `- ${p.name}: ${p.price} FCFA - ${p.description}`).join("\n");

    const systemPrompt = `Tu es l'assistant virtuel de la boutique "${sellerName}", spécialisée dans les jus naturels et smoothies au Cameroun.

Informations sur la boutique:
- Nom: ${sellerName}
- Description: ${sellerDescription}
- Localisation: ${sellerLocation}

Produits disponibles:
${productList}

Tu dois:
1. Répondre de manière chaleureuse, professionnelle et humaine (comme un vrai représentant commercial)
2. Aider les clients avec leurs questions sur les produits, les prix, la livraison
3. Recommander des produits selon les préférences des clients
4. Donner des informations sur les horaires d'ouverture (Lundi-Samedi, 8h-18h)
5. Rassurer sur la qualité des produits (100% naturels, sans conservateurs)
6. Mentionner que la livraison est disponible dans toute la ville
7. Être enthousiaste et passionné par les produits naturels du Cameroun
8. Si le client veut passer commande, lui demander de cliquer sur le produit pour l'ajouter au panier

Réponds toujours en français et de manière concise (max 3-4 phrases). Sois naturel comme un humain, pas comme un robot.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required, please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("seller-chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
