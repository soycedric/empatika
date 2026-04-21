/**
 * OrderContext: Provee estado compartido del carrito entre ProductsSection,
 * OrderCalculator y FloatingCart.
 */

import { createContext, useContext, useState, useMemo, useCallback, type ReactNode } from 'react';
import type { OrderItem, ValidationResult } from '@/types/order';
import { OrderValidationService } from '@/services/order-validation.service';
import { getAllProducts, getProductById } from '@/data/products';

type DeliveryZone = 'puebla' | 'cdmx';

export interface OrderItemWithId extends OrderItem {
    id: string;
}

interface OrderContextValue {
    items: OrderItemWithId[];
    products: ReturnType<typeof getAllProducts>;
    totalVolume: number;
    validation: ValidationResult;
    remainingVolume: number;
    minimumVolume: number;
    deliveryZone: DeliveryZone;
    setDeliveryZone: (zone: DeliveryZone) => void;
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
    const validation = useMemo(() => OrderValidationService.validateOrder(items, deliveryZone), [items, deliveryZone]);
    const remainingVolume = useMemo(() => OrderValidationService.getRemainingVolume(totalVolume), [totalVolume]);
    const minimumVolume = useMemo(() => OrderValidationService.getMinimumVolume(), []);

    const value: OrderContextValue = {
        items, products, totalVolume, validation, remainingVolume, minimumVolume,
        deliveryZone, setDeliveryZone,
        addItem, updateItemQuantity, removeItem, clearOrder
    };

    return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};
