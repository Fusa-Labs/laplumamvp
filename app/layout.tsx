import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/modules/cart/context/CartContext";
import { WhatsAppBubble } from "@/modules/shared/components/layout/WhatsAppBubble";

export const metadata: Metadata = {
  title: "La Pluma | Papelería Artesanal",
  description: "Encuadernación y papelería hecha a mano en Uruguay - Cuadernos clásicos cosidos a mano y papel ecológico.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans" suppressHydrationWarning>
        <CartProvider>
          {children}
          <WhatsAppBubble />
        </CartProvider>
      </body>
    </html>
  );
}
