"use client";

import React from "react";
import { useCart } from "../context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, onCheckout }) => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    duplicateItem,
    cartTotal,
    cartCount,
  } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-sans select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-foreground/30 backdrop-blur-xs transition-opacity duration-300"
      ></div>

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        {/* Drawer Panel */}
        <div className="w-screen max-w-md bg-card border-l border-border flex flex-col shadow-2xl h-full transform transition-all duration-300">
          
          {/* Header */}
          <div className="p-6 border-b border-border flex justify-between items-center bg-secondary/20">
            <div className="flex items-center gap-2">
              {/* Custom Tote Bag (Toad Bar Style) Shopping Icon */}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                strokeWidth={1.5} 
                stroke="currentColor" 
                className="w-6 h-6 text-[#a07040] dark:text-[#fef3c7] transition-colors duration-200"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 8V6a4 4 0 1 1 8 0v2" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 8h16l-1.5 12.5a2 2 0 0 1-2 1.5h-9a2 2 0 0 1-2-1.5L4 8z" />
              </svg>
              <h2 className="text-lg font-serif font-bold text-foreground">
                Tu Carrito
              </h2>
              {cartCount > 0 && (
                <span className="bg-primary text-primary-foreground text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground text-sm font-mono uppercase tracking-wider p-2"
            >
              Cerrar [×]
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center text-center h-full py-12 space-y-4">
                <span className="text-5xl opacity-40">📔</span>
                <p className="text-base font-serif text-foreground font-bold">
                  Tu carrito está vacío
                </p>
                <p className="text-xs text-muted-foreground/80 max-w-xs leading-relaxed">
                  ¿Todavía no elegiste tu próximo cuaderno? Todos nuestros modelos son forrados y cosidos a mano con materiales ecológicos.
                </p>
                <button
                  onClick={onClose}
                  className="bg-primary text-primary-foreground hover:bg-primary/95 text-xs font-mono py-2 px-4 rounded-md uppercase tracking-wider font-bold shadow-xs mt-2"
                >
                  Seguir Comprando
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-4 rounded-lg border border-border bg-card hover:shadow-xs transition-shadow duration-200"
                >
                  {/* Mini-cover representation */}
                  <div className="w-16 h-16 bg-gradient-to-tr from-accent/20 to-muted/30 rounded-md border border-border flex items-center justify-center text-2xl flex-shrink-0">
                    📔
                  </div>

                  {/* Detail Panel */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-sm font-serif font-bold text-foreground line-clamp-1">
                          {item.product.name}
                        </span>
                        <span className="text-sm font-mono font-bold text-primary whitespace-nowrap pl-2">
                          ${item.product.price * item.quantity}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wide block mb-2">
                        {item.product.fabric.split(" ")[0]}
                      </span>
                    </div>

                    {/* Actions Panel */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/50">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-border rounded-md overflow-hidden bg-background">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2.5 py-1 text-xs hover:bg-secondary font-mono text-muted-foreground hover:text-foreground"
                        >
                          -
                        </button>
                        <span className="px-3 text-xs font-mono font-bold text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2.5 py-1 text-xs hover:bg-secondary font-mono text-muted-foreground hover:text-foreground"
                        >
                          +
                        </button>
                      </div>

                      {/* Duplicate & Delete Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => duplicateItem(item.product.id)}
                          title="Duplicar ítem"
                          className="text-[10px] font-mono uppercase tracking-wider py-1 px-2 rounded-md hover:bg-accent/40 text-primary border border-border"
                        >
                          Duplicar
                        </button>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-[10px] font-mono uppercase tracking-wider py-1 px-2 rounded-md text-destructive hover:bg-destructive/10 border border-destructive/20"
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Panel */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-border bg-secondary/10 space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                    Cantidad total:
                  </span>
                  <span className="text-sm font-mono font-bold text-foreground">
                    {cartCount} {cartCount === 1 ? "cuaderno" : "cuadernos"}
                  </span>
                </div>
                <div className="flex justify-between items-baseline pt-2 border-t border-border/50">
                  <span className="text-sm font-mono text-foreground font-bold uppercase tracking-wider">
                    Subtotal:
                  </span>
                  <span className="text-xl font-mono font-bold text-primary">
                    ${cartTotal},00 UYU
                  </span>
                </div>
              </div>

              <button
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-primary/95 text-primary-foreground text-xs font-mono py-3.5 px-4 rounded-md transition-all duration-200 uppercase tracking-widest font-bold shadow-md"
              >
                Finalizar Pedido
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
