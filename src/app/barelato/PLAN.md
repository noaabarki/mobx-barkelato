Planning for ice-cream shop

Flows:

1. Display all flavours
2. Give customer ice-cream
3. Accept payment => receipt

ViewModel

interface {
cart: IShoppingCart
flavours IFlavour[]

requestIceCream(options: { amount: number, type: 'cup' | 'scone' })
addFlavourToCart(flavour: IFlavour)
acceptPayment(payment double): Promise<IReceipt>

}

private getFlavours(vendorId): Promise<IFlavour[]>
