function cartController() {
    return {
        index(req, res) {
            res.render('customers/cart')
        },
        update(req, res) {

            // for the first time creating cart and adding basic object structure
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
                
            }

            let cart = req.session.cart;

            // Debugging logs
            console.log("Received body:", req.body);
            console.log("Cart before update:", cart);
  
                // Check if item does not exist in cart

                 // Validate request body
            if (!req.body._id) {
                return res.status(400).json({ error: "Item ID is required" });
            }

            // Ensure `cart.items` exists
            if (!cart.items) {
                cart.items = {}; // ✅ Fix: Prevents undefined error
            }
            
            // Check if item exists in cart
            if (!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                };
                cart.totalQty += 1;
                cart.totalPrice += req.body.price;
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1;
                cart.totalQty = cart.totalQty + 1;
                cart.totalPrice = cart.totalPrice + req.body.price;
            }


            return res.json({totalQty: req.session.cart.totalQty})
        }
    }
}

module.exports = cartController;