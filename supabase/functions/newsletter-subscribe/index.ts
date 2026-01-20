import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NewsletterRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: NewsletterRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Email invalide" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    
    if (resendApiKey) {
      // Dynamic import for Resend
      const { Resend } = await import("https://esm.sh/resend@2.0.0");
      const resend = new Resend(resendApiKey);
      
      // Send notification to admin
      await resend.emails.send({
        from: "VitaDrinks <onboarding@resend.dev>",
        to: ["ynnoassistant@gmail.com"],
        subject: "Nouvel abonne a la newsletter VitaDrinks!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #22c55e, #f97316); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">VitaDrinks</h1>
            </div>
            <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
              <h2 style="color: #22c55e;">Nouvel abonne a la newsletter!</h2>
              <p>Un nouveau client vient de s'abonner a la newsletter VitaDrinks.</p>
              <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Email:</strong> ${email}</p>
                <p style="margin: 10px 0 0;"><strong>Date:</strong> ${new Date().toLocaleString('fr-FR')}</p>
              </div>
              <p>Continuez a faire grandir la communaute VitaDrinks!</p>
            </div>
          </div>
        `,
      });

      // Send confirmation to subscriber
      await resend.emails.send({
        from: "VitaDrinks <onboarding@resend.dev>",
        to: [email],
        subject: "Bienvenue dans la communaute VitaDrinks!",
        html: `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
            <div style="background: linear-gradient(135deg, #22c55e, #f97316); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0;">VitaDrinks</h1>
            </div>
            <div style="background: #fff; padding: 30px; border: 1px solid #e5e7eb; border-radius: 0 0 10px 10px;">
              <h2 style="color: #22c55e;">Bienvenue dans notre communaute!</h2>
              <p>Merci de vous etre abonne a la newsletter VitaDrinks!</p>
              <p>Vous recevrez desormais nos offres exclusives, nos nouveautes et nos conseils sante directement dans votre boite mail.</p>
              <div style="background: linear-gradient(135deg, #22c55e, #f97316); padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0;">
                <a href="https://vitadrinks.cm" style="color: white; text-decoration: none; font-weight: bold;">Decouvrir nos produits</a>
              </div>
              <p style="color: #6b7280; font-size: 12px;">A tres bientot sur VitaDrinks!</p>
            </div>
          </div>
        `,
      });
    }

    console.log(`Newsletter subscription: ${email}`);

    return new Response(
      JSON.stringify({ success: true, message: "Abonnement reussi!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: unknown) {
    console.error("Newsletter error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
