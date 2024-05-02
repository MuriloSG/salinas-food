import Image from "next/image";
import { CardProduct, CartContext } from "../_context/Cart";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
  cartProducts: CardProduct;
}

const CartItem = ({ cartProducts }: CartItemProps) => {
  const {
    decreaseProductQuantity,
    increaseProductQuantity,
    removeProductsFromCart,
  } = useContext(CartContext);

  const handleDecreaseQuantityClick = () =>
    decreaseProductQuantity(cartProducts.id);

  const handleIncreaseQuantityClick = () =>
    increaseProductQuantity(cartProducts.id);

  const handleRemoveProductFromCartClick = () =>
    removeProductsFromCart(cartProducts.id);

  return (
    <div className="flex items-center justify-between">
      <div className="flex  items-center gap-4">
        {/*IMAGEM E INFO*/}
        <div className="relative h-20 w-20">
          <Image
            src={cartProducts.imageUrl}
            alt={cartProducts.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        <div className="space-y-1">
          <h3 className="text-xs">{cartProducts.name}</h3>
          <div className="flex items-center gap-1">
            <h4 className="text-sm font-semibold">
              {formatCurrency(
                calculateProductTotalPrice(cartProducts) *
                  cartProducts.quantity,
              )}
            </h4>
            {Number(cartProducts.discountPercentage) > 0 && (
              <span className="text-xs text-muted-foreground line-through">
                {formatCurrency(
                  Number(cartProducts.price) * cartProducts.quantity,
                )}
              </span>
            )}
          </div>

          {/* QUANTIDADE */}
          <div className="flex items-center gap-3 text-center">
            <Button
              onClick={handleDecreaseQuantityClick}
              size="icon"
              variant="ghost"
              className="h-7 w-7 border border-solid border-muted-foreground"
            >
              <ChevronLeftIcon size={16} />
            </Button>
            <span className="block w-3 text-xs">{cartProducts.quantity}</span>
            <Button
              size="icon"
              className="h-7 w-7"
              onClick={handleIncreaseQuantityClick}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/*BOTAO DE DELETAR*/}
      <Button
        onClick={handleRemoveProductFromCartClick}
        variant="ghost"
        size="icon"
        className="h-8 w-8 border border-solid border-muted-foreground"
      >
        <TrashIcon size={16} />
      </Button>
    </div>
  );
};

export default CartItem;
