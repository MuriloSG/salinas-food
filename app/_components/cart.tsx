import { useContext } from "react";
import { CartContext } from "../_context/Cart";
import CartItem from "./cart-item";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "../_helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {
  const { products, subTotalPrice, totalDiscount, totalPrice } =
    useContext(CartContext);
  return (
    <div className="flex h-full flex-col py-5">
      {products.length > 0 ? (
        <>
          <div className="flex-auto space-y-2">
            {products.map((product) => (
              <CartItem key={product.id} cartProducts={product} />
            ))}
          </div>
          <div className="mt-6">
            <Card>
              <CardContent className="space-y-2 p-5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span>{formatCurrency(subTotalPrice)}</span>
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Descontos:</span>
                  <span>- {formatCurrency(totalDiscount)}</span>
                </div>

                <Separator className="h-[0.5px]" />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Entrega:</span>
                  {Number(products[0]?.restaurant.deliveryFee) === 0 ? (
                    <span className="uppercase text-primary ">Grátis</span>
                  ) : (
                    formatCurrency(Number(products[0]?.restaurant.deliveryFee))
                  )}
                </div>

                <Separator />

                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-muted-foreground">Total:</span>
                  <span>{formatCurrency(totalPrice)}</span>
                </div>
              </CardContent>
            </Card>

            <div className="mt-6">
              <Button className="mt-4 w-full">Finalizar pedido</Button>
            </div>
          </div>
        </>
      ) : (
        <h2 className="text-center font-medium">Sua sacola está vazia.</h2>
      )}
    </div>
  );
};

export default Cart;
