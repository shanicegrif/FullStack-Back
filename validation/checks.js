const checkName = (req, res, next) => {

    if(req.body.name){
        console.log("Name passed")
        next()
    } else {
        res.status(400).json({ error: "Name is required!" })
    }
}

const checkCapacityAndFloor = (req, res, next) => {
    if (
      typeof req.body.capacity === "number" && typeof req.body.floor === "number"
    ) {
      console.log("Capacity and Floor passed");
      next();
    } else {
      res.status(400).json({ error: "Capacity should be a number." });
    }
  };

module.exports = {
    checkName,
    checkCapacityAndFloor
}
