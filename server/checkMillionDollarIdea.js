const checkMillionDollarIdea = (req, res, next) => {
    let numWeeks = req.body.numWeeks;
    let weeklyRevenue = req.body.weeklyRevenue;
    if (numWeeks || weeklyRevenue) {
        let value = numWeeks * weeklyRevenue;
        value >= 1000000 ? next() : res.status(400).send('Not a million dollar idea!');
    } else {
        res.status(400).send('Please enter correct weeks and/or revenue parameters.');
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
