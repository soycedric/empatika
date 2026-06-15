/**
 * OrderContext: Provee estado compartido del carrito entre ProductsSection,
 * OrderCalculator y FloatingCart.
 */

import { createContext, useContext, useState, useMemo, useCallback, useEffect, type ReactNode } from 'react';
import type { OrderItem, ValidationResult } from '@/types/order';
import { OrderValidationService } from '@/services/order-validation.service';
import { getAllProducts, getProductById } from '@/data/products';

type DeliveryZone = 'puebla' | 'cdmx';
type DeliveryMethod = 'delivery' | 'pickup';

export interface OrderItemWithId extends OrderItem {
    id: string;
}

interface OrderContextValue {
    items: OrderItemWithId[];
    products: ReturnType<typeof getAllProducts>;
    totalVolume: number;
    validation: ValidationResult;
    subtotal: number;
    shippingCost: number;
    totalWithShipping: number;
    minimumOrderAmount: number;
    freeShippingThreshold: number;
    deliveryZone: DeliveryZone;
    deliveryMethod: DeliveryMethod;
    customerName: string;
    customerPhone: string;
    pickupPoint: string;
    deliveryDate: string;
    deliveryLocationLink: string;
    isCartOpen: boolean;
    setDeliveryZone: (zone: DeliveryZone) => void;
    setDeliveryMethod: (method: DeliveryMethod) => void;
    setCustomerName: (name: string) => void;
    setCustomerPhone: (phone: string) => void;
    setPickupPoint: (point: string) => void;
    setDeliveryDate: (date: string) => void;
    setDeliveryLocationLink: (location: string) => void;
    setCartOpen: (open: boolean) => void;
    addItem: (productId: string, quantity?: number) => void;
    updateItemQuantity: (itemId: string, quantity: number) => void;
    removeItem: (itemId: string) => void;
    clearOrder: () => void;
}

const OrderContext = createContext<OrderContextValue | null>(null);

export const useOrderContext = () => {
    const ctx = useContext(OrderContext);
    if (!ctx) throw new Error('useOrderContext must be used within OrderProvider');
    return ctx;
};

export const OrderProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState<OrderItemWithId[]>([]);
    const [deliveryZone, setDeliveryZone] = useState<DeliveryZone>('puebla');
    const [deliveryMethod, setDeliveryMethodState] = useState<DeliveryMethod>('delivery');
    const [customerName, setCustomerName] = useState<string>('');
    const [customerPhone, setCustomerPhone] = useState<string>('');
    const [pickupPoint, setPickupPoint] = useState<string>('');
    const [deliveryDate, setDeliveryDate] = useState<string>('');
    const [deliveryLocationLink, setDeliveryLocationLink] = useState<string>('');
    const [isCartOpen, setCartOpen] = useState(false);
    const [hasAutoOpenedCart, setHasAutoOpenedCart] = useState(false);

    const products = useMemo(() => getAllProducts(), []);

    const addItem = useCallback((productId: string, quantity: number = 1) => {
        const product = getProductById(productId);
        if (!product || quantity <= 0) return;

        setItems(current => {
            const existingIndex = current.findIndex(item => item.product.id === productId);
            if (existingIndex >= 0) {
                const updated = [...current];
                updated[existingIndex] = {
                    ...updated[existingIndex],
                    quantity: updated[existingIndex].quantity + quantity
                };
                return updated;
            }
            return [...current, { id: `${productId}-${Date.now()}`, product, quantity }];
        });
    }, []);

    const updateItemQuantity = useCallback((itemId: string, quantity: number) => {
        if (quantity <= 0) {
            setItems(current => current.filter(item => item.id !== itemId));
            return;
        }
        setItems(current => current.map(item => item.id === itemId ? { ...item, quantity } : item));
    }, []);

    const removeItem = useCallback((itemId: string) => {
        setItems(current => current.filter(item => item.id !== itemId));
    }, []);

    const clearOrder = useCallback(() => setItems([]), []);

    const totalVolume = useMemo(() => OrderValidationService.calculateTotalVolume(items), [items]);
    const validation = useMemo(
        () => OrderValidationService.validateOrder(items, deliveryZone, deliveryMethod),
        [items, deliveryZone, deliveryMethod]
    );
    const subtotal = useMemo(() => OrderValidationService.calculateSubtotal(items), [items]);

    useEffect(() => {
        if (items.length === 0) {
            setCartOpen(false);
            return;
        }

        if (!hasAutoOpenedCart) {
            setCartOpen(true);
            setHasAutoOpenedCart(true);
        }
    }, [items.length, hasAutoOpenedCart]);

    const handleSetDeliveryZone = useCallback((zone: DeliveryZone) => {
        setDeliveryZone(zone);
        if (zone === 'cdmx') {
            setDeliveryMethodState('pickup');
        }
        setPickupPoint('');
        setDeliveryDate(''); // Resetear fecha al cambiar zona (los días habilitados cambian)
    }, []);

    const handleSetDeliveryMethod = useCallback((method: DeliveryMethod) => {
        if (deliveryZone === 'cdmx') {
            setDeliveryMethodState('pickup');
            return;
        }
        setDeliveryMethodState(method);
        if (method === 'delivery') {
            setPickupPoint('');
        } else {
            setDeliveryLocationLink('');
        }
    }, [deliveryZone]);

    const value: OrderContextValue = {
        items,
        products,
        totalVolume,
        validation,
        subtotal,
        shippingCost: validation.shippingCost,
        totalWithShipping: validation.totalWithShipping,
        minimumOrderAmount: validation.minimumOrderAmount,
        freeShippingThreshold: validation.freeShippingThreshold,
        deliveryZone,
        deliveryMethod,
        customerName,
        customerPhone,
        pickupPoint,
        deliveryDate,
        deliveryLocationLink,
        isCartOpen,
        setDeliveryZone: handleSetDeliveryZone,
        setDeliveryMethod: handleSetDeliveryMethod,
        setCustomerName,
        setCustomerPhone,
        setPickupPoint,
        setDeliveryDate,
        setDeliveryLocationLink,
        setCartOpen,
        addItem,
        updateItemQuantity,
        removeItem,
        clearOrder,
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
