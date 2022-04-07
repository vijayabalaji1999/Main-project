const Stripe = require("stripe");

exports.createStripeCheckoutSession = async (req, res, next) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: "2020-08-27",
  });
  let line_items = req.body.lineitem;
  let order = req.body.order;
  console.log(line_items);
  // console.log(line_items);
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    success_url: `http://localhost:3000/inventoryreduce/${order}`,
    cancel_url: `http://localhost:3000/usercheckout/${order}`,
  });

  res.status(200).json({
    status: "success",
    session,
  });
};
