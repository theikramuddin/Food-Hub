const Order = require('../../../models/order'); // Ensure it's uppercase 'O'

function orderController() {
    return {
        async index(req, res) {
            try {
                const orders = await Order.find({ status: { $ne: 'completed' } }) // Use 'Order' not 'order'
                    .sort({ createdAt: -1 })
                    .populate('customerId', '-password'); // No exec() needed

                if (req.xhr) { // If it's an AJAX request, return JSON
                    return res.json(orders);
                }

                return res.render('admin/orders', { orders }); // Pass orders to the view
            } catch (err) {
                console.error("Error fetching orders:", err);
                return res.status(500).send("Something went wrong");
            }
        }
    };
}

module.exports = orderController;
