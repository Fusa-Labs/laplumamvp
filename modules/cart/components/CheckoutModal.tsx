"use client";

import React, { useState } from "react";
import { useCart } from "../context/CartContext";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [success, setSuccess] = useState(false);

  // Datos del cliente simulados
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    deliveryMethod: "dac", // dac | cadeteria
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      alert("Por favor completa los campos requeridos.");
      return;
    }
    setSuccess(true);
  };

  const handleFinish = () => {
    clearCart();
    setSuccess(false);
    onClose();
  };

  const receiptId = `LP-${Math.floor(100000 + Math.random() * 900000)}`;
  const currentDate = new Date().toLocaleDateString("es-UY", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-4 font-sans select-none">
      {/* Backdrop */}
      <div
        onClick={success ? undefined : onClose}
        className="absolute inset-0 bg-foreground/45 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      {/* Modal Box */}
      <div className="relative bg-card border border-border rounded-lg max-w-lg w-full shadow-2xl p-6 md:p-8 overflow-hidden z-10 max-h-[90vh] flex flex-col">
        {!success ? (
          <>
            {/* Formulario de Checkout */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-serif font-bold text-foreground">
                Completar Pedido (Simulado)
              </h2>
              <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground text-sm font-mono p-2"
              >
                [×]
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 flex-1 overflow-y-auto pr-1">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Nombre Completo *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Paula Rodríguez"
                  className="w-full bg-background border border-border rounded-md px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="paula@correo.com"
                  className="w-full bg-background border border-border rounded-md px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Dirección de Envío / Retiro *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Ej: Av. Italia 1234, Apto 502, Montevideo"
                  className="w-full bg-background border border-border rounded-md px-3.5 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-muted-foreground/50 resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono text-muted-foreground uppercase tracking-wider">
                  Método de Envío (Simulado)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-pointer select-none">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === "dac"}
                      onChange={() => setFormData({ ...formData, deliveryMethod: "dac" })}
                      className="accent-primary"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-foreground">DAC Agencia</span>
                      <span className="text-[10px] text-muted-foreground">Interior / Agencias</span>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 rounded-md border border-border bg-background cursor-pointer select-none">
                    <input
                      type="radio"
                      name="deliveryMethod"
                      checked={formData.deliveryMethod === "cadeteria"}
                      onChange={() => setFormData({ ...formData, deliveryMethod: "cadeteria" })}
                      className="accent-primary"
                    />
                    <div className="flex flex-col">
                      <span className="text-xs font-mono font-bold text-foreground">Cadetería</span>
                      <span className="text-[10px] text-muted-foreground">Montevideo (48 hs)</span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="pt-4 border-t border-border mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Total a Confirmar:
                  </span>
                  <span className="text-lg font-mono font-bold text-primary">
                    ${cartTotal},00 UYU
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-3.5 px-4 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md"
                >
                  Confirmar Simulación de Compra
                </button>
              </div>
            </form>
          </>
        ) : (
          /* Recibo Interactivo de Éxito */
          <div className="flex flex-col h-full space-y-6">
            <div className="text-center py-4 space-y-2 border-b border-border bg-secondary/15 rounded-t-lg -mx-6 md:-mx-8 -mt-6 md:-mt-8">
              <span className="text-4xl">🎉</span>
              <h3 className="text-lg font-serif font-bold text-foreground">
                ¡Pedido Realizado con Éxito!
              </h3>
              <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                simulado en el frontend
              </p>
            </div>

            {/* Ticket de Recibo */}
            <div className="flex-1 overflow-y-auto border border-border rounded-md p-5 bg-secondary/5 font-mono text-xs space-y-4 shadow-inner">
              <div className="text-center border-b border-dashed border-border pb-4 space-y-1">
                <span className="text-sm font-serif font-bold tracking-tight text-foreground block">
                  LA PLUMA
                </span>
                <span className="text-[10px] text-muted-foreground uppercase">
                  Papelería Artesanal
                </span>
                <div className="text-[10px] text-muted-foreground pt-2">
                  Montevideo, Uruguay
                </div>
              </div>

              <div className="space-y-1.5 border-b border-dashed border-border pb-4 text-[10px] text-muted-foreground">
                <div className="flex justify-between">
                  <span>RECIBO ID:</span>
                  <span className="font-bold text-foreground">{receiptId}</span>
                </div>
                <div className="flex justify-between">
                  <span>FECHA:</span>
                  <span className="text-foreground">{currentDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>CLIENTE:</span>
                  <span className="text-foreground uppercase">{formData.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>EMAIL:</span>
                  <span className="text-foreground">{formData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span>DIRECCIÓN:</span>
                  <span className="text-foreground text-right line-clamp-1">{formData.address}</span>
                </div>
                <div className="flex justify-between">
                  <span>ENVÍO:</span>
                  <span className="text-foreground uppercase">{formData.deliveryMethod === "dac" ? "DAC" : "CADETERÍA"}</span>
                </div>
              </div>

              {/* Lista de Ítems */}
              <div className="space-y-3 py-2 border-b border-dashed border-border">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex justify-between items-start text-[11px]">
                    <div className="space-y-0.5">
                      <span className="font-bold text-foreground block">{item.product.name}</span>
                      <span className="text-[9px] text-muted-foreground uppercase">{item.product.fabric.split(" ")[0]} x{item.quantity}</span>
                    </div>
                    <span className="text-foreground pl-4 whitespace-nowrap">${item.product.price * item.quantity},00</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-baseline pt-2 text-sm font-bold">
                <span>TOTAL:</span>
                <span className="text-primary font-bold text-base">${cartTotal},00 UYU</span>
              </div>
            </div>

            <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 text-[10px] leading-relaxed text-muted-foreground/90 font-mono text-center">
              💡 **Aviso del Prototipo (MVP):** Tu compra ha sido completamente simulada en el cliente. No se realizarán cobros reales ni envíos de productos. Este diseño le sirve a Paula para validar la experiencia de usuario y el recibo impreso.
            </div>

            <button
              onClick={handleFinish}
              className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-3.5 px-4 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md"
            >
              Entendido, Volver a la Tienda
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
